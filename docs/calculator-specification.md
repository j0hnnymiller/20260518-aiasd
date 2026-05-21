---
ai_generated: true
model: "openai/gpt-5.3-codex@unknown"
operator: "johnmillerATcodemag-com"
chat_id: "1458b547-37c2-4434-9660-55aceb561034"
prompt: |
  create specification for the calculator
started: "2026-05-20T19:07:14Z"
ended: "2026-05-20T19:12:30Z"
task_durations:
  - task: "behavior analysis"
    duration: "00:02:30"
  - task: "specification authoring"
    duration: "00:02:46"
total_duration: "00:05:16"
ai_log: "ai-logs/2026/05/20/1458b547-37c2-4434-9660-55aceb561034/conversation.md"
source: "GitHub Copilot Chat"
---

# Calculator Specification

## Overview

This document defines the functional requirements for the browser calculator in this repository.

**Audience**: Developers and reviewers implementing or validating calculator behavior.

## Scope

In scope:

- Arithmetic expression entry and evaluation
- Percentage behavior
- Circle area shortcut
- Trigonometric behavior with angle mode
- Memory behavior
- Keyboard parity with button interactions
- Runtime feature-flag behavior

Out of scope:

- Backend or API behavior
- Build pipelines or deployment automation

## Functional Requirements

### FR-1 Expression Input

1. The calculator must accept digits `0-9` and decimal separator `.`.
2. The calculator must prevent duplicate decimals in a single numeric segment.
3. The calculator must support operators `+`, `-`, `*`, `/`.
4. Entering a second trailing operator must replace the previous trailing operator.
5. A leading operator must be rejected except `-`.

### FR-2 Evaluation

1. `=` and `Enter` must evaluate the active expression.
2. Successful evaluation must display history as `<expression> =`.
3. Result formatting must be:
   - Integer text for integers
   - Decimal rounded to up to 10 fractional digits for non-integers
4. Invalid evaluation must produce `Error` and clear the active expression.

### FR-3 Percentage

1. For binary expression `left op right`, `%` must transform `right` as:
   - `+` or `-`: `left * right / 100`
   - `*` or `/`: `right / 100`
2. For standalone value, `%` must compute `value / 100`.
3. History must display source expression suffixed with `%`.
4. Invalid conversion must display `Error`.

### FR-4 Clear And Edit

1. `AC` and `Escape` must reset expression, history, and result to `0`.
2. `Backspace` must delete one trailing character from the active expression.
3. If backspace is pressed immediately after evaluation, behavior must match clear.

### FR-5 Circle Area

1. `A(r)` must compute area using $A = \pi r^2$.
2. Radius must be resolved from current calculator value.
3. Negative or invalid radius must display `Error`.
4. History must display `A(<source>) =`.

### FR-6 Trigonometric Functions

1. `sin`, `cos`, and `tan` must evaluate using current value.
2. Angle mode must toggle between `DEG` and `RAD`.
3. In `DEG` mode, input must be converted to radians before trig evaluation.
4. History must display `<fn>(<source> <MODE>) =`.
5. Trig actions must be disabled when trig feature is off.

### FR-7 Memory

1. `MS` stores current numeric value.
2. `MR` recalls stored value into expression/result.
3. `MC` clears stored value.
4. `M+` adds current value to memory (`0` when memory empty).
5. `M-` subtracts current value from memory (`0` when memory empty).
6. If no valid current value exists, memory action must no-op.
7. Memory actions must be disabled when memory feature is off.

### FR-8 Keyboard Behavior

1. Keyboard digits/operators must map to equivalent button actions.
2. `Enter` must trigger evaluation.
3. `Escape` must trigger all-clear.
4. `Backspace` must trigger delete behavior.
5. `a` must trigger circle-area when enabled.

### FR-9 Error Recovery

1. Division-by-zero and invalid expressions must show `Error`.
2. After clear, calculator must return to a valid state.
3. A valid expression after clear must evaluate normally.

## Runtime Feature Flags

Supported flags:

- `ff_trig` (`trig`)
- `ff_memory` (`memory`)
- `ff_circle_area` (`circleArea`)

Accepted values: `1`, `0`, `true`, `false`, `on`, `off`, `yes`, `no`

Configuration sources:

1. Query parameters
2. `localStorage` key `calculator.featureFlags`

Precedence: query parameters override localStorage.

## Engine API Contract

Factory: `createCalculatorEngine(options?)`

Exposed methods:

- `appendValue(value)`
- `calculatePercentage()`
- `clearAll()`
- `backspace()`
- `calculateCircleArea()`
- `applyTrigFunction(name)`
- `toggleAngleMode()`
- `storeMemory()`
- `recallMemory()`
- `clearMemory()`
- `adjustMemory(delta)`
- `evaluate()`
- `getCurrentValue()`
- `getSnapshot()`

Snapshot shape:

- `expression: string`
- `displayExpression: string`
- `lastResult: string`
- `memoryValue: number | null`
- `angleMode: "deg" | "rad"`
- `featureFlags: { trig: boolean, memory: boolean, circleArea: boolean }`

## Acceptance Scenarios

1. `2 + 3 =` returns `5` and history `2+3 =`.
2. `5 + * 2 =` returns `10` (operator replacement).
3. `1 . . 2` produces `1.2`.
4. `200 + 10 % =` returns `220`.
5. `2 A(r)` returns `12.5663706144`.
6. `sin(90 DEG)` returns `1`; toggled RAD returns about `0.84`.
7. `7 MS AC MR` returns `7` and memory indicator active.
8. Keyboard `12 + 3 Enter` returns `15`; `Escape` resets to `0`.
9. `5 / 0 =` returns `Error`; `AC`; `6 / 2 =` returns `3`.
10. Disabled flags hide or disable corresponding control groups.

## Traceability

Implementation references:

- `calculator-engine.js`
- `calculator.html`
- `tests/calculator.spec.js`

Related documentation:

- [README](../README.md)
- [Developer Guide](developer-guide.md)
