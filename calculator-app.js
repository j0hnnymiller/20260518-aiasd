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

    const historyEl = root.querySelector('[data-role="history"]');
    const resultEl = root.querySelector('[data-role="result"]');
    const memoryIndicatorEl = root.querySelector('[data-role="memory-indicator"]');
    const angleModeButtonEl = root.querySelector('[data-role="angle-mode"]');
    const memorySectionEl = root.querySelector('[data-role="memory-section"]');
    const trigSectionEl = root.querySelector('[data-role="trig-section"]');
    const circleAreaButtonEl = root.querySelector('[data-action="circle-area"]');
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

    function dispatchAction(action, value) {
      if (action === "clear") engine.clearAll();
      else if (action === "backspace") engine.backspace();
      else if (action === "circle-area") engine.calculateCircleArea();
      else if (action === "percent") engine.calculatePercentage();
      else if (action === "trig-sin") engine.applyTrigFunction("sin");
      else if (action === "trig-cos") engine.applyTrigFunction("cos");
      else if (action === "trig-tan") engine.applyTrigFunction("tan");
      else if (action === "toggle-angle-mode") engine.toggleAngleMode();
      else if (action === "memory-clear") engine.clearMemory();
      else if (action === "memory-recall") engine.recallMemory();
      else if (action === "memory-add")
        engine.adjustMemory(engine.getCurrentValue() ?? 0);
      else if (action === "memory-subtract")
        engine.adjustMemory(-(engine.getCurrentValue() ?? 0));
      else if (action === "memory-store") engine.storeMemory();
      else if (action === "equals") engine.evaluate();
      else if (value) engine.appendValue(value);
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

  function autoInitializeCalculator() {
    if (!globalScope.document) return;
    const root = globalScope.document.querySelector('[data-role="calculator"]');
    if (!root || typeof globalScope.createCalculatorEngine !== "function") return;
    globalScope.calculatorApp = createCalculatorApp({ root }).init();
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
      readStoredFeatureFlags,
      resolveCalculatorFeatureFlags,
      createCalculatorApp,
      autoInitializeCalculator,
      bootCalculatorApp,
    };
  }

  globalScope.parseBooleanFlag = parseBooleanFlag;
  globalScope.resolveCalculatorFeatureFlags = resolveCalculatorFeatureFlags;
  globalScope.createCalculatorApp = createCalculatorApp;

  if (typeof window !== "undefined") {
    bootCalculatorApp({ window });
  }
})(typeof window !== "undefined" ? window : globalThis);
