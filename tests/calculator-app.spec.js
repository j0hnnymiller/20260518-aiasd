const { test, expect } = require("@playwright/test");

const {
  parseBooleanFlag,
  resolveCalculatorFeatureFlags,
  createCalculatorApp,
  bootCalculatorApp,
} = require("../calculator-app.js");

test.describe("calculator app module", () => {
  test("exports a calculator app factory", () => {
    expect(typeof createCalculatorApp).toBe("function");
  });

  test("resolves feature flags with query params overriding stored flags", () => {
    expect(parseBooleanFlag("yes")).toBe(true);
    expect(parseBooleanFlag("off")).toBe(false);
    expect(parseBooleanFlag("maybe")).toBeNull();

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
