---
ai_generated: true
model: "openai/gpt-5.4@unknown"
operator: "johnmillerATcodemag-com"
chat_id: "acaf6075-7dde-4cc7-b293-0829934f7cc3"
prompt: |
  create a read me file for this project

  try again

  create an instruction file for evergreen software development

  create a list of technologies, frameworks, and tools used in this project

  go ahead

  try again

  create instructions for the the core technologies. use subagents for each technology
started: "2026-05-18T11:31:03.6990264-07:00"
ended: "2026-05-18T12:38:21.3274921-07:00"
task_durations:
  - task: "project review"
    duration: "00:02:00"
  - task: "readme drafting"
    duration: "00:03:00"
  - task: "instruction file creation"
    duration: "00:08:00"
  - task: "tech stack identification"
    duration: "00:05:00"
  - task: "readme update"
    duration: "00:03:00"
  - task: "technology subagent research"
    duration: "00:04:00"
  - task: "technology instruction authoring"
    duration: "00:06:00"
  - task: "provenance logging"
    duration: "00:05:21"
total_duration: "00:36:21"
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

- `README.md`: Project overview and usage notes. AI log: `ai-logs/2026/05/18/acaf6075-7dde-4cc7-b293-0829934f7cc3/conversation.md`
- `.github/instructions/evergreen-software-development.instructions.md`: Evergreen engineering guidance for maintainable software changes. AI log: `ai-logs/2026/05/18/acaf6075-7dde-4cc7-b293-0829934f7cc3/conversation.md`
- `.github/instructions/html.instructions.md`: HTML authoring guidance for semantic, accessible browser markup. AI log: `ai-logs/2026/05/18/acaf6075-7dde-4cc7-b293-0829934f7cc3/conversation.md`
- `.github/instructions/css.instructions.md`: CSS authoring guidance for maintainable styling and responsive layout. AI log: `ai-logs/2026/05/18/acaf6075-7dde-4cc7-b293-0829934f7cc3/conversation.md`
- `.github/instructions/javascript.instructions.md`: JavaScript authoring guidance for explicit state, rendering, and event handling. AI log: `ai-logs/2026/05/18/acaf6075-7dde-4cc7-b293-0829934f7cc3/conversation.md`

## Instructions

This repository includes detailed instructions for core technologies:

- [HTML Instructions](.github/instructions/html.instructions.md): Guidelines for semantic, accessible, and maintainable HTML.
- [CSS Instructions](.github/instructions/css.instructions.md): Best practices for writing scalable and maintainable CSS.
- [JavaScript Instructions](.github/instructions/javascript.instructions.md): Rules for modern, modular, and testable JavaScript.

Refer to these documents to ensure code quality and consistency across the project.
