---
ai_generated: true
model: "openai/gpt-5.3-codex@unknown"
operator: "johnmillerATcodemag-com"
chat_id: "ff1412ec-1440-4c21-a97e-d7f21445cab9"
prompt: |
  create developers guide for this project
started: "2026-05-19T00:00:00Z"
ended: "2026-05-19T00:00:00Z"
task_durations:
  - task: "repository analysis"
    duration: "00:00:00"
  - task: "developer guide authoring"
    duration: "00:00:00"
total_duration: "00:00:00"
ai_log: "ai-logs/2026/05/19/ff1412ec-1440-4c21-a97e-d7f21445cab9/conversation.md"
source: "GitHub Copilot Chat"
---

# Developer Guide

## Overview

This guide explains how to run, validate, and extend the calculator project in this repository.

**Audience**: Developers and reviewers contributing to the calculator user interface and behavior.

## Prerequisites

- A modern browser (Edge, Chrome, or Firefox)
- A local clone of this repository
- Basic familiarity with HTML, CSS, and JavaScript

## Project Structure

- [calculator.html](../calculator.html): Standalone app containing markup, styling, and behavior
- [README.md](../README.md): Project overview and contributor-facing documentation
- [.github/instructions](../.github/instructions): Repository policies and authoring instructions
- [ai-logs](../ai-logs): AI conversation and summary logs used for provenance tracking

## Development Workflow

1. Add or update a focused automated test that specifies the behavior or seam you are changing.
2. Run the narrowest relevant test command and confirm the new or updated test fails for the intended reason.
3. Make the smallest production change needed to make that test pass.
4. Re-run the same narrow test command, then run `npm test`.
5. Re-test core flows manually using both mouse and keyboard input when the change affects browser interactions.
6. Update [README.md](../README.md) when contributor-facing behavior or project structure changes.

## Runtime Feature Flags

The calculator supports runtime feature flags for local validation and controlled behavior checks.

### Query Parameter Flags

- `ff_trig`: Enables or disables trigonometric controls (`sin`, `cos`, `tan`, and angle mode toggle)
- `ff_memory`: Enables or disables memory controls (`MC`, `MR`, `M+`, `M-`, `MS`)
- `ff_circle_area`: Enables or disables the `A(r)` circle area shortcut

Accepted values: `1`, `0`, `true`, `false`, `on`, `off`, `yes`, `no`

Examples:

- `calculator.html?ff_trig=0`
- `calculator.html?ff_memory=0&ff_circle_area=0`

### localStorage Flags

You can define persistent defaults with local storage key `calculator.featureFlags`.

Example value:

```json
{ "trig": true, "memory": false, "circleArea": true }
```

Query parameters take precedence over localStorage values.

## Coding Guidelines

- Keep rendering logic centralized to avoid inconsistent UI state.
- Preserve keyboard and button behavior parity for every interactive feature.
- Prefer explicit logic and validation over implicit runtime behavior.
- Keep changes focused and avoid mixing unrelated refactors with functional edits.
- Follow the repository instruction files for HTML, CSS, JavaScript, and evergreen maintainability.
- Treat Red -> Green -> Refactor as mandatory for behavior changes and structural refactors.
- When extracting calculator logic from UI code, add a failing characterization test for the new seam before moving the implementation.

## Validation Checklist

- [ ] A new or updated automated test failed before the first production edit.
- [ ] The same narrow test passed after the minimal production change.
- [ ] `npm test` passes.
- [ ] Basic arithmetic operations evaluate correctly
- [ ] Percentage behavior works for standalone and binary expressions
- [ ] Circle area shortcut computes expected values
- [ ] Trigonometric functions honor DEG and RAD mode selection
- [ ] Memory controls (MC, MR, M+, M-, MS) behave correctly
- [ ] Keyboard shortcuts mirror button behavior
- [ ] Error states render clearly and recover correctly

## Troubleshooting

- If UI actions do not respond, reload the page and verify browser JavaScript is enabled.
- If keyboard shortcuts fail, click anywhere in the page to restore focus and test again.
- If results appear invalid, inspect the expression for malformed operator or decimal input.

## Related Instructions

- [AI-Assisted Output Instructions](../.github/instructions/ai-assisted-output.instructions.md)
- [Evergreen Software Development](../.github/instructions/evergreen-software-development.instructions.md)
- [Documentation Authoring Instructions](../.github/instructions/documentation.instructions.md)
- [HTML Development Instructions](../.github/instructions/html.instructions.md)
- [CSS3 Development Instructions](../.github/instructions/css.instructions.md)
- [JavaScript Development Instructions](../.github/instructions/javascript.instructions.md)
