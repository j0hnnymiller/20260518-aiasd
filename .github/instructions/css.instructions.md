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
applyTo: "**/*.{css,html}"
---

# CSS Authoring Instructions

## Overview

This repository ships a single self-contained calculator in `calculator.html`. Its CSS is intentionally small, token-driven, and centered on a dark glass-style panel with grid-based control groups, explicit interactive states, and one narrow mobile override. Use these instructions to keep styling maintainable, consistent with the existing design language, and aligned with the repository's evergreen rules.

**Target Audience**: Developers and AI assistants editing CSS in this repository

## Scope

These instructions apply to the embedded `<style>` block in `calculator.html` and any future standalone stylesheet files. They cover shared visual tokens, layout, selector design, interactive state styling, and responsive behavior already present in the calculator UI.

## Related Documentation

- [README](../../README.md)
- [Evergreen Software Development](./evergreen-software-development.instructions.md)
- [HTML Authoring Instructions](./html.instructions.md)
- [JavaScript Authoring Instructions](./javascript.instructions.md)
- [Creating New Instruction Files](./instruction-files.instructions.md)

## 1. Keep Shared Visual Tokens In `:root`

- Define reusable colors, surface values, shadows, and other design tokens in `:root` and consume them through `var(...)`.
- Extend the existing token set before introducing raw color, shadow, or panel values in component rules.
- Keep meaning-bearing values such as accent, danger, operator surfaces, panel borders, and shadows centralized instead of scattering them across selectors.
- If a value is reused or represents a UI role, promote it to a custom property.
- Keep `color-scheme: dark` aligned with the actual palette unless the repository intentionally adds a second theme.

## 2. Preserve The Existing Background And Panel System

- Treat the current shell as a repo convention: layered gradients on `body`, a translucent calculator panel, a subtle border, and a heavy shadow.
- When changing the overall look, update tokens first so the visual system stays coherent.
- Keep the page-centered layout model unless the application structure changes materially.
- Add fallbacks for unsupported effects such as `backdrop-filter` explicitly rather than weakening the main styles everywhere.
- Avoid one-off decorative treatments that compete with the existing calculator shell.

## 3. Use Flat, Class-Based Selectors

- Prefer the current selector style: single-class selectors such as `.calculator`, `.header`, `.display`, `.keys`, `.operator`, `.equals`, and `.danger`.
- Keep selectors shallow. If a style starts depending on DOM position, add a class instead of increasing selector specificity.
- Use classes for styling state and roles; do not style from JavaScript IDs.
- Name classes by calculator purpose, not by incidental appearance.
- Reuse helper classes such as `.span-2` for structural variation instead of hardcoding placement on individual elements.

## 4. Keep The Grid Layout Explicit

- Preserve the current layout model of separate grids for memory keys, trigonometric keys, and the main keypad.
- When adding or removing controls, update the relevant grid definition intentionally instead of relying on accidental wrapping.
- Keep spacing and padding decisions aligned across the display, header, and key groups.
- Do not replace grid with manual widths, absolute positioning, or margin hacks.
- Make layout changes in a way that still supports future extraction into standalone CSS without rethinking every selector.

## 5. Treat Focus And State Styles As Product Behavior

- Every interactive control must keep explicit base, `:hover`, `:active`, and `:focus-visible` behavior.
- Never remove visible keyboard focus without replacing it with an equally clear accessible treatment.
- Keep state classes synchronized with behavior, especially `.memory-indicator.active` and `.mode-button.active`.
- When adding a new state, represent it explicitly with a class or similarly clear mechanism rather than overloading unrelated selectors.
- Do not rely on hover alone to communicate interactivity or state.

## 6. Review The Mobile Override With Every Layout Change

- Treat the existing `@media (max-width: 420px)` block as a focused correction layer for the small-screen version of the same calculator.
- When changing base spacing, padding, border radius, or button sizing, review the mobile override in the same edit.
- Keep responsive adjustments narrow and local instead of building multiple breakpoint-specific layouts for a single-panel demo.
- Maintain the one-panel calculator layout on small screens unless the interaction model truly changes.
- Avoid responsive drift where the base layout and mobile override tell different visual stories.

## Common Anti-Patterns

- Adding raw hex colors or shadows directly in component rules when an existing token should be extended
- Styling from IDs or deep ancestry instead of the current class-based role system
- Breaking keypad alignment with manual widths, empty spacer elements, or absolute positioning
- Removing `:focus-visible` because hover styling seems sufficient
- Introducing new button variants without matching hover, active, and focus behavior
- Changing base spacing or button sizing without updating the mobile override
- Leaving stale state classes or unused selectors in a file that already mixes structure, style, and behavior

## Quality Checklist

- [ ] Reusable visual values live in `:root` custom properties
- [ ] The dark background and calculator panel still read as one consistent visual system
- [ ] Selectors stay flat, class-based, and low-specificity
- [ ] Grid-based key groups remain explicit and intentional
- [ ] Interactive controls define base, hover, active, and `:focus-visible` states
- [ ] State classes still map cleanly to JavaScript behavior
- [ ] Small-screen behavior is reviewed alongside any layout or spacing change
- [ ] No layout hacks, ID-based styling, or unnecessary specificity were introduced
- [ ] CSS changes still fit the repository's current single-file calculator architecture
