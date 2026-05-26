const { test, expect } = require("@playwright/test");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

const calculatorUrl = pathToFileURL(
  path.resolve(__dirname, "..", "calculator.html"),
).toString();
const indexUrl = pathToFileURL(
  path.resolve(__dirname, "..", "index.html"),
).toString();

async function openCalculator(page, query = "") {
  await page.goto(query ? `${calculatorUrl}${query}` : calculatorUrl);
}

async function clickMany(page, labels) {
  for (const label of labels) {
    await page.getByRole("button", { name: label, exact: true }).click();
  }
}

async function resultText(page) {
  return page.locator("#result").innerText();
}

test.describe("calculator regression characterization", () => {
  test("redirects from index entrypoint to calculator", async ({ page }) => {
    await page.goto(indexUrl);
    await expect(page).toHaveURL(/calculator\.html$/);
    await expect(page.locator("h1")).toHaveText("Calculator");
    await expect(page.locator("#result")).toHaveText("0");
  });

  test("redirects from index entrypoint when JavaScript is disabled", async ({
    browser,
  }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();

    try {
      await page.goto(indexUrl);
      await expect(page).toHaveURL(/calculator\.html$/);
      await expect(page.locator("#result")).toHaveText("0");
    } finally {
      await context.close();
    }

  test("exposes calculator engine factory on window", async ({ page }) => {
    await openCalculator(page);
    const hasFactory = await page.evaluate(
      () => typeof window.createCalculatorEngine === "function",
    );
    expect(hasFactory).toBe(true);
  });

  test("evaluates basic arithmetic", async ({ page }) => {
    await openCalculator(page);
    await clickMany(page, ["2", "+", "3", "="]);
    await expect(page.locator("#result")).toHaveText("5");
    await expect(page.locator("#history")).toHaveText("2+3 =");
  });

  test("replaces a trailing operator instead of creating invalid expression", async ({
    page,
  }) => {
    await openCalculator(page);
    await clickMany(page, ["5", "+", "×", "2", "="]);
    await expect(page.locator("#result")).toHaveText("10");
  });

  test("prevents duplicate decimal in the same segment", async ({ page }) => {
    await openCalculator(page);
    await clickMany(page, ["1", ".", ".", "2"]);
    await expect(page.locator("#result")).toHaveText("1.2");
  });

  test("uses percent base semantics for addition", async ({ page }) => {
    await openCalculator(page);
    await clickMany(page, ["2", "0", "0", "+", "1", "0", "%", "="]);
    await expect(page.locator("#result")).toHaveText("220");
  });

  test("computes circle area from current input", async ({ page }) => {
    await openCalculator(page);
    await clickMany(page, ["2", "A(r)"]);
    await expect(page.locator("#result")).toHaveText("12.5663706144");
    await expect(page.locator("#history")).toHaveText("A(2) =");
  });

  test("toggles angle mode and affects trig behavior", async ({ page }) => {
    await openCalculator(page);

    await clickMany(page, ["9", "0", "sin"]);
    await expect(page.locator("#result")).toHaveText("1");

    await page.getByRole("button", { name: "DEG", exact: true }).click();
    await expect(page.locator("#angle-mode-button")).toHaveText("RAD");

    await page.getByRole("button", { name: "sin", exact: true }).click();
    const radValue = Number(await resultText(page));
    expect(radValue).toBeGreaterThan(0.84);
    expect(radValue).toBeLessThan(0.85);
  });

  test("supports memory store and recall", async ({ page }) => {
    await openCalculator(page);

    await clickMany(page, ["7", "MS", "AC", "MR"]);
    await expect(page.locator("#result")).toHaveText("7");
    await expect(page.locator("#memory-indicator")).toHaveClass(/active/);
  });

  test("keeps keyboard behavior aligned with button behavior", async ({
    page,
  }) => {
    await openCalculator(page);
    await page.keyboard.type("12");
    await page.keyboard.press("+");
    await page.keyboard.type("3");
    await page.keyboard.press("Enter");
    await expect(page.locator("#result")).toHaveText("15");

    await page.keyboard.press("Escape");
    await expect(page.locator("#result")).toHaveText("0");
  });

  test("recovers from error state after clear", async ({ page }) => {
    await openCalculator(page);

    await clickMany(page, ["5", "÷", "0", "="]);
    await expect(page.locator("#result")).toHaveText("Error");

    await page.getByRole("button", { name: "AC", exact: true }).click();
    await clickMany(page, ["6", "÷", "2", "="]);
    await expect(page.locator("#result")).toHaveText("3");
  });

  test("disables trigonometric controls with ff_trig=0", async ({ page }) => {
    await openCalculator(page, "?ff_trig=0");

    await expect(page.locator(".trig-keys")).toBeHidden();
    await expect(page.locator('[data-action="trig-sin"]')).toBeHidden();
  });

  test("disables memory controls with ff_memory=0", async ({ page }) => {
    await openCalculator(page, "?ff_memory=0");

    await expect(page.locator(".memory-keys")).toBeHidden();
    await expect(page.locator('[data-action="memory-store"]')).toBeHidden();
  });

  test("disables circle area action with ff_circle_area=0", async ({
    page,
  }) => {
    await openCalculator(page, "?ff_circle_area=0");

    await clickMany(page, ["2"]);
    await page.keyboard.press("a");

    await expect(page.locator("#result")).toHaveText("2");
    await expect(page.locator('[data-action="circle-area"]')).toBeHidden();
  });
});
