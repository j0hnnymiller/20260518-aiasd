const { test, expect } = require("@playwright/test");

const {
  parseBooleanFlag,
  resolveCalculatorFeatureFlags,
  createCalculatorApp,
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
});
