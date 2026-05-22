const { test, expect } = require("@playwright/test");

const {
  parseBooleanFlag,
  resolveCalculatorFeatureFlags,
  createCalculatorApp,
  autoInitializeCalculator,
  bootCalculatorApp,
} = require("../calculator-app.js");

test.describe("calculator app module", () => {
  test("exports a calculator app factory", () => {
    expect(typeof createCalculatorApp).toBe("function");
  });

  test("throws a helpful error when required UI nodes are missing", () => {
    expect(() =>
      createCalculatorApp({
        document: {},
        root: {
          querySelector() {
            return null;
          },
        },
        engineFactory: () => ({
          getSnapshot() {
            return {
              displayExpression: "",
              lastResult: "0",
              memoryValue: null,
              angleMode: "deg",
            };
          },
        }),
      }),
    ).toThrow("calculator app requires a history display");
  });

  test("parses supported boolean-like flag values", () => {
    expect(parseBooleanFlag("yes")).toBe(true);
    expect(parseBooleanFlag("off")).toBe(false);
    expect(parseBooleanFlag("maybe")).toBeNull();
  });

  test("resolves feature flags with query params overriding stored flags", () => {
    expect(
      resolveCalculatorFeatureFlags({
        search: "?ff_trig=0&ff_circle_area=1",
        storedFlags: {
          trig: true,
          memory: false,
          circleArea: false,
        },
      }),
    ).toEqual({
      trig: false,
      memory: false,
      circleArea: true,
    });
  });

  test("falls back to defaults when stored flags or query params are unusable", () => {
    expect(
      resolveCalculatorFeatureFlags({
        search: "?ff_trig=maybe",
        storedFlags: null,
      }),
    ).toEqual({
      trig: true,
      memory: true,
      circleArea: true,
    });
  });

  test("boots immediately when the document is already ready", () => {
    const calls = [];
    const document = {
      readyState: "interactive",
    };

    bootCalculatorApp({
      document,
      initialize: () => calls.push("init"),
    });

    expect(calls).toEqual(["init"]);
  });

  test("initializes the calculator app when the DOM root and engine are available", () => {
    const root = {};
    const document = {
      querySelector(selector) {
        return selector === '[data-role="calculator"]' ? root : null;
      },
    };
    const engineFactory = () => ({});
    const calls = [];

    const app = autoInitializeCalculator({
      document,
      engineFactory,
      createApp(options) {
        calls.push(options);
        return {
          init() {
            return { initialized: true };
          },
        };
      },
    });

    expect(app).toEqual({ initialized: true });
    expect(calls).toHaveLength(1);
    expect(calls[0].root).toBe(root);
    expect(calls[0].document).toBe(document);
    expect(calls[0].engineFactory).toBe(engineFactory);
  });

  test("skips initialization when dependencies are missing", () => {
    expect(
      autoInitializeCalculator({
        document: { querySelector: () => null },
        engineFactory: () => ({}),
      }),
    ).toBeNull();

    expect(
      autoInitializeCalculator({
        document: { querySelector: () => ({}) },
      }),
    ).toBeNull();
  });

  test("waits for DOMContentLoaded when the document is still loading", () => {
    const calls = [];
    let registeredEvent = null;
    let registeredHandler = null;
    let registeredOptions = null;

    const document = {
      readyState: "loading",
      addEventListener(eventName, handler, options) {
        registeredEvent = eventName;
        registeredHandler = handler;
        registeredOptions = options;
      },
    };

    bootCalculatorApp({
      document,
      initialize: () => calls.push("init"),
    });

    expect(calls).toEqual([]);
    expect(registeredEvent).toBe("DOMContentLoaded");
    expect(registeredOptions).toEqual({ once: true });

    registeredHandler();
    expect(calls).toEqual(["init"]);
  });
});
