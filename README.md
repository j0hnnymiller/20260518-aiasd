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
---

# AIASD Calculator Demo

A small browser-based calculator demo built as a single self-contained HTML file, with a supporting presentation in the `slides` folder.

## Project Contents

- `calculator.html`: Standalone calculator UI and logic written in plain HTML, CSS, and JavaScript.
- `slides/20260518-aiasd-repos.pptx`: Presentation material associated with the project.

## Features

- Basic arithmetic operations
- Percentage calculations
- Circle area shortcut via `A(r)`
- Trigonometric functions: `sin`, `cos`, `tan`
- Degree and radian mode toggle
- Memory functions: `MC`, `MR`, `M+`, `M-`, `MS`
- Keyboard support for digits, operators, `Enter`, `Backspace`, `Esc`, and `A`

## Running The Project

No build step is required.

1. Open `calculator.html` in a web browser.
2. Use the on-screen controls or keyboard shortcuts.

## Implementation Notes

- The project is intentionally lightweight and has no external dependencies.
- Markup, styles, and behavior currently live in the same file.
- The current expression evaluation path is suitable for a demo, but it should be replaced with an explicit parser if the calculator grows beyond basic functionality.

## Improvement Areas

- Replace the current evaluator with a dedicated expression parser.
- Split structure, styles, and behavior into separate files if the project expands.
- Add automated tests for arithmetic, percentage, trigonometric, and memory behavior.
- Improve the expression model to make future scientific functions easier to add safely.

## Tech Stack

### Core Technologies

- HTML5
- CSS3
- JavaScript (vanilla)

### Browser Platform Features

- DOM APIs for UI updates and event handling
- CSS Grid for layout
- CSS media queries for responsive behavior
- CSS custom properties for theming and styling

### Project Tooling

- GitHub repository instructions in `.github/instructions`
- AI provenance logging in `ai-logs`
- Markdown documentation in `README.md`

### Documentation Assets

- PowerPoint slide deck in `slides/20260518-aiasd-repos.pptx`

### What Is Not Used

- No frontend framework
- No backend framework
- No package manager manifest
- No build system or bundler
- No test framework currently present

## AI-Assisted Artifacts

- `README.md`: Project overview, usage notes, and instruction references. AI log: `ai-logs/2026/05/18/acaf6075-7dde-4cc7-b293-0829934f7cc3/conversation.md`
- `.github/instructions/evergreen-software-development.instructions.md`: Repository-wide evergreen engineering guidance. AI log: `ai-logs/2026/05/18/acaf6075-7dde-4cc7-b293-0829934f7cc3/conversation.md`
- `.github/instructions/html.instructions.md`: Repo-specific HTML guidance for semantic calculator structure, behavior hooks, and accessible output. AI log: `ai-logs/2026/05/18/acaf6075-7dde-4cc7-b293-0829934f7cc3/conversation.md`
- `.github/instructions/css.instructions.md`: Repo-specific CSS guidance for shared tokens, grid layout, state styling, and the mobile override. AI log: `ai-logs/2026/05/18/acaf6075-7dde-4cc7-b293-0829934f7cc3/conversation.md`
- `.github/instructions/javascript.instructions.md`: Repo-specific JavaScript guidance for explicit calculator state, shared rendering, and safe expression handling. AI log: `ai-logs/2026/05/18/acaf6075-7dde-4cc7-b293-0829934f7cc3/conversation.md`

## Instructions

Use the repository instruction files together when making changes:

- [Evergreen Software Development](.github/instructions/evergreen-software-development.instructions.md): Repository-wide guidance for maintainable, explicit, change-friendly implementation.
- [HTML Authoring Instructions](.github/instructions/html.instructions.md): Rules for semantic calculator markup, accessible controls, and stable HTML-to-JavaScript hooks.
- [CSS Authoring Instructions](.github/instructions/css.instructions.md): Rules for token-driven styling, explicit grid layout, focus visibility, and responsive consistency.
- [JavaScript Authoring Instructions](.github/instructions/javascript.instructions.md): Rules for explicit state, shared rendering, safe evaluation boundaries, and synchronized input handling.

Refer to these documents before changing `calculator.html` or adding extracted frontend files.
