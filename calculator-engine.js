(function (globalScope) {
  function createCalculatorEngine(options = {}) {
    const defaults = {
      trig: true,
      memory: true,
      circleArea: true,
    };
    const configuredFlags = options.featureFlags ?? {};
    const featureFlags = {
      trig: configuredFlags.trig ?? defaults.trig,
      memory: configuredFlags.memory ?? defaults.memory,
      circleArea: configuredFlags.circleArea ?? defaults.circleArea,
    };

    let expression = "";
    let displayExpression = "";
    let lastResult = "0";
    let justEvaluated = false;
    let memoryValue = null;
    let angleMode = "deg";

    function isFeatureEnabled(name) {
      return featureFlags[name] !== false;
    }

    function normalizeExpression(value) {
      return value.replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-");
    }

    function formatNumber(value) {
      if (!Number.isFinite(value)) return "Error";
      if (Number.isInteger(value)) return String(value);
      const rounded = Number.parseFloat(value.toFixed(10));
      return String(rounded);
    }

    function safeEvaluate(value) {
      const normalized = normalizeExpression(value);
      if (!/^[0-9+\-*/.()\s]+$/.test(normalized)) {
        throw new Error("Invalid expression");
      }
      return Function(`"use strict"; return (${normalized});`)();
    }

    function resolveExpressionValue() {
      if (!expression) return null;
      return justEvaluated ? Number(expression) : safeEvaluate(expression);
    }

    function getCurrentValue() {
      if (expression) {
        return resolveExpressionValue();
      }

      const parsed = Number(lastResult);
      return Number.isFinite(parsed) ? parsed : null;
    }

    function appendValue(value) {
      if (justEvaluated && /[0-9.]/.test(value)) {
        expression = "";
        displayExpression = "";
      }

      if (value === ".") {
        const lastChunk = expression.split(/[+\-*/]/).pop();
        if (lastChunk.includes(".")) return;
        if (!lastChunk) {
          expression += "0";
        }
      }

      if ("+-*/".includes(value)) {
        const trimmed = expression.trimEnd();
        if (!trimmed && value !== "-") return;
        if (/[+\-*/]$/.test(trimmed)) {
          expression = trimmed.slice(0, -1) + value;
        } else {
          expression = trimmed + value;
        }
      } else {
        expression += value;
      }

      justEvaluated = false;
      displayExpression = "";
      lastResult = expression || "0";
    }

    function calculatePercentage() {
      const source = expression || lastResult;
      if (!source || source === "Error") return;

      try {
        const binaryMatch = expression.match(
          /^(.*?)([+\-*/])(-?(?:\d+\.?\d*|\.\d+))$/,
        );

        if (binaryMatch) {
          const [, leftExpression, operator, operandText] = binaryMatch;
          const baseValue = safeEvaluate(leftExpression);
          const operandValue = Number(operandText);

          if (!Number.isFinite(baseValue) || !Number.isFinite(operandValue)) {
            throw new Error("Invalid percentage");
          }

          const percentValue =
            operator === "+" || operator === "-"
              ? (baseValue * operandValue) / 100
              : operandValue / 100;

          expression = `${leftExpression}${operator}${formatNumber(percentValue)}`;
          displayExpression = `${source}%`;
          lastResult = formatNumber(percentValue);
          justEvaluated = false;
          return;
        }

        const value = expression
          ? resolveExpressionValue()
          : Number(lastResult);
        if (!Number.isFinite(value)) {
          throw new Error("Invalid percentage");
        }

        expression = formatNumber(value / 100);
        displayExpression = `${source}%`;
        lastResult = expression;
        justEvaluated = true;
      } catch {
        displayExpression = `${source}%`;
        lastResult = "Error";
        expression = "";
        justEvaluated = true;
      }
    }

    function clearAll() {
      expression = "";
      displayExpression = "";
      lastResult = "0";
      justEvaluated = false;
    }

    function backspace() {
      if (justEvaluated) {
        clearAll();
        return;
      }

      expression = expression.slice(0, -1);
      displayExpression = "";
      lastResult = expression || "0";
    }

    function calculateCircleArea() {
      if (!isFeatureEnabled("circleArea")) return;
      if (!expression) return;

      try {
        const radius = resolveExpressionValue();
        if (!Number.isFinite(radius) || radius < 0) {
          throw new Error("Invalid radius");
        }

        const source = displayExpression.endsWith(" =")
          ? displayExpression.slice(0, -2)
          : expression;

        displayExpression = `A(${source}) =`;
        lastResult = formatNumber(Math.PI * radius * radius);
        expression = lastResult === "Error" ? "" : lastResult;
        justEvaluated = true;
      } catch {
        displayExpression = `A(${expression}) =`;
        lastResult = "Error";
        expression = "";
        justEvaluated = true;
      }
    }

    function convertToRadians(value) {
      return angleMode === "deg" ? (value * Math.PI) / 180 : value;
    }

    function applyTrigFunction(name) {
      if (!isFeatureEnabled("trig")) return;
      const source = expression || lastResult;
      if (!source || source === "Error") return;

      try {
        const value = getCurrentValue();
        if (!Number.isFinite(value)) {
          throw new Error("Invalid trig input");
        }

        const input = convertToRadians(value);
        const trigFunctions = {
          sin: Math.sin,
          cos: Math.cos,
          tan: Math.tan,
        };

        const result = trigFunctions[name](input);
        displayExpression = `${name}(${source} ${angleMode.toUpperCase()}) =`;
        lastResult = formatNumber(result);
        expression = lastResult === "Error" ? "" : lastResult;
        justEvaluated = true;
      } catch {
        displayExpression = `${name}(${source}) =`;
        lastResult = "Error";
        expression = "";
        justEvaluated = true;
      }
    }

    function toggleAngleMode() {
      if (!isFeatureEnabled("trig")) return;
      angleMode = angleMode === "deg" ? "rad" : "deg";
    }

    function storeMemory() {
      if (!isFeatureEnabled("memory")) return;
      const value = getCurrentValue();
      if (value === null) return;
      memoryValue = value;
    }

    function recallMemory() {
      if (!isFeatureEnabled("memory")) return;
      if (memoryValue === null) return;
      expression = formatNumber(memoryValue);
      displayExpression = "";
      lastResult = expression;
      justEvaluated = true;
    }

    function clearMemory() {
      if (!isFeatureEnabled("memory")) return;
      memoryValue = null;
    }

    function adjustMemory(delta) {
      if (!isFeatureEnabled("memory")) return;
      const value = getCurrentValue();
      if (value === null) return;
      memoryValue = (memoryValue ?? 0) + delta;
    }

    function evaluate() {
      if (!expression) return;
      try {
        const result = safeEvaluate(expression);
        displayExpression = expression + " =";
        lastResult = formatNumber(result);
        expression = lastResult === "Error" ? "" : lastResult;
        justEvaluated = true;
      } catch {
        displayExpression = expression + " =";
        lastResult = "Error";
        expression = "";
        justEvaluated = true;
      }
    }

    function getSnapshot() {
      return {
        expression,
        displayExpression,
        lastResult,
        memoryValue,
        angleMode,
        featureFlags: { ...featureFlags },
      };
    }

    return {
      appendValue,
      calculatePercentage,
      clearAll,
      backspace,
      calculateCircleArea,
      applyTrigFunction,
      toggleAngleMode,
      storeMemory,
      recallMemory,
      clearMemory,
      adjustMemory,
      evaluate,
      getCurrentValue,
      getSnapshot,
    };
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { createCalculatorEngine };
  }

  globalScope.createCalculatorEngine = createCalculatorEngine;
})(typeof window !== "undefined" ? window : globalThis);
