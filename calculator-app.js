(function (globalScope) {
  const DEFAULT_FEATURE_FLAGS = {
    trig: true,
    memory: true,
    circleArea: true,
  };

  function parseBooleanFlag(value) {
    if (value === null || value === undefined) return null;
    const normalized = String(value).trim().toLowerCase();
    if (["1", "true", "on", "yes"].includes(normalized)) return true;
    if (["0", "false", "off", "no"].includes(normalized)) return false;
    return null;
  }

  function readStoredFeatureFlags(storage, key = "calculator.featureFlags") {
    if (!storage || typeof storage.getItem !== "function") return {};

    try {
      const raw = storage.getItem(key);
      if (!raw) return {};

      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch {
      return {};
    }
  }

  function resolveCalculatorFeatureFlags(options = {}) {
    const params =
      options.searchParams instanceof URLSearchParams
        ? options.searchParams
        : new URLSearchParams(options.search ?? "");
    const storedFlags =
      options.storedFlags ?? readStoredFeatureFlags(options.storage, options.storageKey);

    return {
      trig:
        parseBooleanFlag(params.get("ff_trig")) ??
        parseBooleanFlag(storedFlags.trig) ??
        DEFAULT_FEATURE_FLAGS.trig,
      memory:
        parseBooleanFlag(params.get("ff_memory")) ??
        parseBooleanFlag(storedFlags.memory) ??
        DEFAULT_FEATURE_FLAGS.memory,
      circleArea:
        parseBooleanFlag(params.get("ff_circle_area")) ??
        parseBooleanFlag(storedFlags.circleArea) ??
        DEFAULT_FEATURE_FLAGS.circleArea,
    };
  }

  function createCalculatorApp(options = {}) {
    const documentRef = options.document ?? globalScope.document;
    const root =
      options.root ?? documentRef?.querySelector('[data-role="calculator"]');
    const engineFactory =
      options.engineFactory ?? globalScope.createCalculatorEngine;

    if (!documentRef) {
      throw new Error("calculator app requires a document");
    }
    if (!root) {
      throw new Error("calculator root not found");
    }
    if (typeof engineFactory !== "function") {
      throw new Error("calculator engine factory is unavailable");
    }

    const featureFlags =
      options.featureFlags ??
      resolveCalculatorFeatureFlags({
        search: options.search ?? globalScope.location?.search ?? "",
        storage: options.storage ?? globalScope.localStorage,
        storageKey: options.storageKey,
      });

    function requireElement(selector, label) {
      const element = root.querySelector(selector);
      if (!element) {
        throw new Error(`calculator app requires ${label}`);
      }
      return element;
    }

    const historyEl = requireElement('[data-role="history"]', "the history display");
    const resultEl = requireElement('[data-role="result"]', "the result display");
    const memoryIndicatorEl = requireElement(
      '[data-role="memory-indicator"]',
      "the memory indicator",
    );
    const angleModeButtonEl = requireElement(
      '[data-role="angle-mode"]',
      "the angle mode button",
    );
    const memorySectionEl = requireElement(
      '[data-role="memory-section"]',
      "the memory section",
    );
    const trigSectionEl = requireElement(
      '[data-role="trig-section"]',
      "the trigonometric section",
    );
    const circleAreaButtonEl = requireElement(
      '[data-action="circle-area"]',
      "the circle area button",
    );
    const engine = engineFactory({ featureFlags });

    function render() {
      const state = engine.getSnapshot();
      historyEl.textContent = state.displayExpression || "\u00A0";
      resultEl.textContent = state.lastResult;
      memoryIndicatorEl.classList.toggle("active", state.memoryValue !== null);
      memoryIndicatorEl.setAttribute(
        "aria-hidden",
        state.memoryValue === null ? "true" : "false",
      );
      angleModeButtonEl.textContent = state.angleMode.toUpperCase();
      angleModeButtonEl.classList.toggle("active", state.angleMode === "deg");
    }

    function applyFeatureVisibility() {
      memorySectionEl.hidden = !featureFlags.memory;
      trigSectionEl.hidden = !featureFlags.trig;
      circleAreaButtonEl.hidden = !featureFlags.circleArea;
    }

    const actionHandlers = {
      clear: () => engine.clearAll(),
      backspace: () => engine.backspace(),
      "circle-area": () => engine.calculateCircleArea(),
      percent: () => engine.calculatePercentage(),
      "trig-sin": () => engine.applyTrigFunction("sin"),
      "trig-cos": () => engine.applyTrigFunction("cos"),
      "trig-tan": () => engine.applyTrigFunction("tan"),
      "toggle-angle-mode": () => engine.toggleAngleMode(),
      "memory-clear": () => engine.clearMemory(),
      "memory-recall": () => engine.recallMemory(),
      "memory-add": () => engine.adjustMemory(engine.getCurrentValue() ?? 0),
      "memory-subtract": () =>
        engine.adjustMemory(-(engine.getCurrentValue() ?? 0)),
      "memory-store": () => engine.storeMemory(),
      equals: () => engine.evaluate(),
    };

    function dispatchAction(action, value) {
      const handler = action ? actionHandlers[action] : null;
      if (handler) {
        handler();
      } else if (value) {
        engine.appendValue(value);
      }
      render();
    }

    function handleClick(event) {
      const button = event.target.closest("button");
      if (!button || !root.contains(button)) return;
      dispatchAction(button.dataset.action, button.dataset.value);
    }

    function handleKeyDown(event) {
      const { key } = event;

      if (/^[0-9]$/.test(key) || key === ".") {
        engine.appendValue(key);
        render();
        return;
      }

      if (["+", "-", "*", "/"].includes(key)) {
        engine.appendValue(key);
        render();
        return;
      }

      if (key === "%") {
        engine.calculatePercentage();
        render();
        return;
      }

      if (key.toLowerCase() === "a") {
        event.preventDefault();
        engine.calculateCircleArea();
        render();
        return;
      }

      if (key === "Enter" || key === "=") {
        event.preventDefault();
        engine.evaluate();
        render();
        return;
      }

      if (key === "Backspace") {
        event.preventDefault();
        engine.backspace();
        render();
        return;
      }

      if (key === "Escape") {
        engine.clearAll();
        render();
      }
    }

    function init() {
      globalScope.calculatorFeatureFlags = featureFlags;
      applyFeatureVisibility();
      root.addEventListener("click", handleClick);
      documentRef.addEventListener("keydown", handleKeyDown);
      render();
      return api;
    }

    function destroy() {
      root.removeEventListener("click", handleClick);
      documentRef.removeEventListener("keydown", handleKeyDown);
    }

    const api = {
      init,
      destroy,
      render,
      engine,
      featureFlags,
    };

    return api;
  }

  function autoInitializeCalculator(options = {}) {
    const documentRef = options.document ?? globalScope.document;
    const engineFactory =
      options.engineFactory ?? globalScope.createCalculatorEngine;
    const appFactory = options.createApp ?? createCalculatorApp;
    const hasQuerySelector = typeof documentRef?.querySelector === "function";
    const root =
      options.root ??
      (hasQuerySelector
        ? documentRef.querySelector('[data-role="calculator"]')
        : null);

    if (!documentRef || !root || typeof engineFactory !== "function") return null;

    const app = appFactory({
      root,
      document: documentRef,
      engineFactory,
      search: options.search ?? globalScope.location?.search ?? "",
      storage: options.storage ?? globalScope.localStorage,
      storageKey: options.storageKey,
    }).init();

    if (typeof window !== "undefined") {
      globalScope.calculatorApp = app;
    }
    return app;
  }

  function bootCalculatorApp(options = {}) {
    const documentRef =
      options.document ?? options.window?.document ?? globalScope.document;
    const initialize = options.initialize ?? autoInitializeCalculator;

    if (!documentRef) return;

    if (documentRef.readyState === "loading") {
      documentRef.addEventListener("DOMContentLoaded", initialize, { once: true });
      return;
    }

    initialize();
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = {
      parseBooleanFlag,
      resolveCalculatorFeatureFlags,
      createCalculatorApp,
      autoInitializeCalculator,
      bootCalculatorApp,
    };
  }

  if (typeof window !== "undefined") {
    globalScope.parseBooleanFlag = parseBooleanFlag;
    globalScope.resolveCalculatorFeatureFlags = resolveCalculatorFeatureFlags;
    globalScope.createCalculatorApp = createCalculatorApp;

    bootCalculatorApp({ window });
  }
})(typeof window !== "undefined" ? window : globalThis);
