---
ai_generated: true
model: "openai/gpt-5.4@unknown"
operator: "johnmillerATcodemag-com"
chat_id: "acaf6075-7dde-4cc7-b293-0829934f7cc3"
prompt: |
  Create instruction files for each core technology in this project.

  Use one subagent per technology:
  - HTML
  - CSS
  - JavaScript

  For each subagent:
  - inspect the current repository structure and relevant files
  - identify repo-specific conventions and risks
  - draft a complete .instructions.md file, not just recommendations
  - include:
    - Overview
    - Scope
    - Related documentation
    - 5-7 actionable rule sections
    - common anti-patterns
    - a quality checklist
  - keep the guidance aligned with this repo's evergreen software development rules
  - avoid generic framework advice that does not apply to this project

  Then:
  - create or update the instruction files in .github/instructions/
  - make the wording consistent across files
  - add or update provenance metadata
  - update README.md to reference the new instruction files
  - update the ai log files for this chat
  - validate the changed markdown files
started: "2026-05-18T19:58:52.858Z"
ended: "2026-05-18T20:18:52.858Z"
task_durations:
  - task: "repository review"
    duration: "00:04:00"
  - task: "technology subagent research"
    duration: "00:06:00"
  - task: "instruction rewriting"
    duration: "00:06:00"
  - task: "readme and ai-log updates"
    duration: "00:02:00"
  - task: "markdown validation"
    duration: "00:02:00"
total_duration: "00:20:00"
ai_log: "ai-logs/2026/05/18/acaf6075-7dde-4cc7-b293-0829934f7cc3/conversation.md"
source: "GitHub Copilot Chat"
applyTo: "**/*.{js,html}"
---

# JavaScript Authoring Instructions

## Overview

This repository's JavaScript currently powers a single-file browser calculator in `calculator.html`. The script depends on explicit state, a shared `render()` path, a narrow expression evaluator, and matching button and keyboard behavior. Use these instructions to keep calculator logic predictable, extensible, and aligned with the repository's evergreen preference for explicit models over hidden runtime behavior.

**Target Audience**: Developers and AI assistants editing JavaScript in this repository

## Scope

These instructions apply to the embedded script in `calculator.html` and any future extracted `.js` files that preserve the same calculator behavior. They cover state transitions, DOM wiring, expression handling, keyboard support, helper functions, and extension patterns already present in the calculator script.

## Related Documentation

- [README](../../README.md)
- [Evergreen Software Development](./evergreen-software-development.instructions.md)
- [HTML Authoring Instructions](./html.instructions.md)
- [CSS Authoring Instructions](./css.instructions.md)
- [Creating New Instruction Files](./instruction-files.instructions.md)

## 1. Keep Calculator State Explicit

- Treat `expression`, `displayExpression`, `lastResult`, `justEvaluated`, `memoryValue`, and `angleMode` as separate state fields with distinct responsibilities.
- Keep `expression` as the canonical computational input and `displayExpression` as presentation history only.
- Update related state fields together before calling `render()` so visible output and follow-up behavior stay in sync.
- Do not read text back out of the DOM to recover state that should already exist in JavaScript.
- Remove dead state and stale helper branches promptly so the single-file script does not accumulate hidden behavior.

## 2. Centralize DOM Writes Through `render()`

- Cache stable DOM references once at startup, as the current script does for the display, memory indicator, and angle mode button.
- Keep `render()` as the primary place that writes calculator state into the DOM.
- Add new controls through `data-action` or `data-value` attributes and dispatch them from shared listeners.
- Keep event listeners thin: translate user input into named helpers instead of performing calculator logic inline.
- If the script grows, separate DOM wiring from calculator rules before adding more direct DOM writes in feature helpers.

## 3. Keep Expression Handling Narrow And Safe

- Normalize display operators before evaluation so computation runs on a predictable expression format.
- Treat the current `Function`-based evaluator as a narrow demo seam, not a general extension point.
- Do not widen the `safeEvaluate()` whitelist to admit arbitrary JavaScript syntax just to add features.
- If the calculator grows beyond basic arithmetic over a controlled character set, replace runtime evaluation with an explicit parser.
- Invalid or non-finite results must fail closed into the calculator's existing error flow.

## 4. Implement Features In Named Helpers

- Keep derived behaviors such as percentage, circle area, trigonometric functions, memory actions, and formatting in dedicated helper functions.
- Reuse seams such as `getCurrentValue()`, `resolveExpressionValue()`, `formatNumber()`, and `convertToRadians()` instead of duplicating parsing, rounding, or conversion logic.
- When adding a new feature, define its input source, display label, result formatting, and post-action state transition explicitly.
- Keep feature-specific error handling inside the helper that owns the behavior so dispatch code stays simple.
- Prefer small calculators helpers over more branches inside the main event listeners.

## 5. Preserve Action Transition Rules

- Keep the current post-evaluation behavior: numeric input after a completed calculation starts a new expression, while follow-up actions can continue from the last result when appropriate.
- Treat memory recall, percentage, trigonometric actions, and `A(r)` as state transitions rather than simple assignments.
- Keep `displayExpression` and `lastResult` aligned with what the user just did, especially for transformations that are not plain `=` evaluation.
- Route numeric output through `formatNumber()` so arithmetic, trig, memory, and area calculations stay consistent.
- When changing one action flow, review how it affects the next keystroke or button press.

## 6. Keep Keyboard And Button Paths In Lockstep

- Every supported keyboard path must call the same helper used by the matching button action.
- Use `preventDefault()` for handled keys when browser defaults would interfere with calculator behavior.
- When adding, removing, or changing a shortcut, update both the key handler and the visible UI hint in the same change.
- Do not let keyboard-only logic drift from click logic or from the labels shown in the markup.
- Because the repository has no automated JavaScript test harness yet, add focused executable validation when a change raises risk around evaluation, trig behavior, memory state, or shortcut handling.

## Common Anti-Patterns

- Treating DOM text as the source of truth instead of the explicit state variables
- Updating `lastResult` without also considering `displayExpression`, `expression`, and `justEvaluated`
- Duplicating calculator logic separately in click handlers and keyboard handlers
- Widening the `Function` evaluator instead of replacing it with a parser when syntax requirements grow
- Mixing display glyphs and evaluable expressions without a normalization step
- Letting `NaN`, `Infinity`, or invalid memory values leak through instead of converting them into the calculator's error flow
- Growing the single-file script by stacking more ad hoc listener branches instead of introducing clearer seams

## Quality Checklist

- [ ] State responsibilities remain explicit and the DOM is not used as hidden state storage
- [ ] `render()` remains the primary DOM write path for calculator state
- [ ] New UI actions dispatch to named helpers through `data-action` or `data-value`
- [ ] Expressions are normalized and validated before evaluation
- [ ] The `Function`-based evaluator has not been broadened beyond the current narrow arithmetic model without a parser replacement
- [ ] Derived operations update `expression`, `displayExpression`, `lastResult`, and `justEvaluated` coherently
- [ ] Keyboard behavior matches button behavior and handled keys prevent conflicting browser defaults
- [ ] Numeric output is formatted consistently through shared helpers
- [ ] Invalid or non-finite values end in a clear error state rather than leaking through memory or display logic
