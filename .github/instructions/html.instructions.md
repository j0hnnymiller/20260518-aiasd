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
applyTo: "**/*.html"
---

# HTML Authoring Instructions

## Overview

This repository ships a single self-contained calculator in `calculator.html`. The HTML is the UI contract for a button-driven calculator with live display updates, grouped controls, keyboard guidance, and JavaScript hooks through `data-action`, `data-value`, and a few targeted `id` values. Use these instructions to keep markup semantic, accessible, and easy to evolve without drifting away from the current implementation.

**Target Audience**: Developers and AI assistants editing HTML in this repository

## Scope

These instructions apply to `calculator.html` and any future HTML files that follow the same browser-only interaction model. They cover document structure, accessibility, behavior hooks, dynamic output regions, and the markup patterns already established by the calculator UI.

## Related Documentation

- [README](../../README.md)
- [Evergreen Software Development](./evergreen-software-development.instructions.md)
- [CSS Authoring Instructions](./css.instructions.md)
- [JavaScript Authoring Instructions](./javascript.instructions.md)
- [Creating New Instruction Files](./instruction-files.instructions.md)

## 1. Preserve The Semantic Calculator Structure

- Keep the calculator rooted in a semantic landmark such as `<main>`.
- Preserve clear groupings for display output, memory controls, trigonometric controls, and primary keys.
- Use semantic elements when they fit the role, and use `div` only when there is no better structural element.
- Keep the DOM shallow; do not add wrapper elements that exist only to support styling or ad hoc scripting.
- If the file grows beyond the current demo, split repeated or unrelated regions rather than nesting more generic containers into the same tree.

## 2. Treat Markup As A Stable JavaScript Contract

- Use `data-action` for behavior-triggering controls and `data-value` for literal input keys, matching the current calculator pattern.
- Reserve `id` values for unique elements that JavaScript reads or updates directly, such as the history, result, memory indicator, and angle mode toggle.
- Do not move behavior onto class names. Classes are for styling; `data-*` and targeted `id` values are the behavior contract.
- When adding a new control, choose an explicit action name that describes behavior, such as `memory-store` or `toggle-angle-mode`.
- Do not reuse a single `data-action` for unrelated calculator features.

## 3. Use Real, Accessible Button Controls

- Keep every calculator key as a `<button>`, including memory controls, mode toggles, operators, and shortcuts such as `A(r)`.
- Do not replace buttons with clickable `div`, `span`, or anchor elements.
- If a control label is symbolic or abbreviated (`⌫`, `÷`, `×`, `−`, `MC`, `A(r)`), make sure the control still has an accessible name that matches its behavior.
- Keep section-level labels accurate and specific so assistive technology can distinguish memory keys, trigonometric keys, and the main keypad.
- Expose toggle state accessibly when a control changes mode. Do not rely on a CSS class alone to communicate selected state.

## 4. Make Dynamic Output Announce The Right State

- Keep the calculator display explicitly identified as dynamic content and limit live-region behavior to output that should be announced.
- Maintain separate elements for expression history and the current result when they represent different kinds of state.
- Do not expand live-region behavior to large containers that would cause noisy re-announcements of unrelated UI.
- If memory state, angle mode, or error state becomes important to understanding the output, expose that state in readable text or accessibility attributes rather than only through styling.
- Keep empty output states screen-reader friendly; avoid placeholder tricks that produce confusing announcements.

## 5. Keep Visible Guidance In Sync With Actual Behavior

- Any visible instructions in the HTML must stay synchronized with the implemented keyboard shortcuts and supported functions.
- When JavaScript adds, removes, or changes a shortcut, update the visible hint text in the same change.
- Do not advertise unsupported features in button labels, helper copy, or section names.
- Keep instructional text concise and specific to the current calculator behavior.
- Treat drift between visible guidance and implemented behavior as a correctness issue, not a copy-edit issue.

## 6. Extend The UI By Adding Clear Regions

- Add new controls to the most specific existing group, or create a new labeled section when the feature represents a distinct control family.
- Do not bury new features in unlabeled button clusters or attach feature meaning to arbitrary text nodes.
- Keep presentation, behavior hooks, and status content separable so later CSS or JavaScript changes do not require broad HTML rewrites.
- Favor small, explicit additions over turning the main key grid into a catch-all for unrelated controls.
- Keep the document truthful to the current implementation; do not add placeholder markup for features that do not work yet.

## Common Anti-Patterns

- Replacing calculator buttons with non-semantic clickable elements
- Using classes as JavaScript selectors instead of `data-action`, `data-value`, or targeted `id` values
- Adding symbolic controls without checking their accessible name
- Expanding `aria-live` behavior to large containers so every state change is re-announced
- Showing keyboard hints or feature labels that no longer match the implemented behavior
- Hiding important state only through styling such as `active` classes or opacity changes
- Growing the single-file calculator by appending unrelated control clusters without adding clear structure

## Quality Checklist

- [ ] The calculator still uses semantic structure with clearly labeled control groups
- [ ] Every interactive calculator control is a real `<button>`
- [ ] Behavior hooks use `data-action` and `data-value` consistently
- [ ] `id` values are limited to unique elements with direct state or update responsibilities
- [ ] Dynamic output uses appropriately scoped live-region behavior
- [ ] Symbolic or abbreviated controls expose accessible names that match their behavior
- [ ] Toggle or mode controls expose state accessibly, not only through CSS classes
- [ ] Visible instructions match the implemented keyboard and calculator behavior
- [ ] New features extend the markup with clear sections and labels rather than ad hoc wrappers
