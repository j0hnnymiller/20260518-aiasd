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

A browser-based calculator demo built as a single self-contained HTML file, with supporting presentation assets, project prompts, and instruction files.

**Audience**: Contributors and reviewers who need to run, understand, or extend the calculator demo and its repository documentation.

## Project Contents

- [`calculator.html`](calculator.html): Standalone calculator UI and logic written in plain HTML, CSS, and JavaScript.
- [`docs/`](docs/): Contributor-facing project documentation, including the developer guide.
- [`slides/`](slides/): Presentation assets (`20260518-aiasd-repos.pptx`, `aiasd-311-monday.pptx`).
- [`.github/instructions/`](.github/instructions/): Repository instruction files for AI output policy, evergreen development, and language-specific authoring.
- [`.github/prompts/`](.github/prompts/): Reusable prompt files for git commit grouping and technology inventory workflows.
- [`ai-logs/`](ai-logs/): AI conversation and summary logs for documented artifact creation sessions.

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

### Runtime Feature Flags

You can toggle selected features at runtime with query parameters:

- `ff_trig`: toggle trig controls (`sin`, `cos`, `tan`, and DEG/RAD toggle)
- `ff_memory`: toggle memory controls (`MC`, `MR`, `M+`, `M-`, `MS`)
- `ff_circle_area`: toggle circle area shortcut (`A(r)`)

Accepted values: `1`, `0`, `true`, `false`, `on`, `off`, `yes`, `no`

Examples:

- `calculator.html?ff_trig=0`
- `calculator.html?ff_memory=0&ff_circle_area=0`

Persistent defaults can be set in localStorage under `calculator.featureFlags` (JSON object). Query parameters override localStorage.

### Validation

- Verify the calculator display updates when entering digits and operators.
- Verify `Enter` evaluates the current expression.
- Verify `Esc` clears input and resets the display state.

### Troubleshooting

- If nothing responds, confirm JavaScript is enabled in the browser.
- If keyboard input does not work, click inside the page once to ensure focus.
- If changes are not visible, hard refresh the browser to bypass cache.

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

- GitHub repository instructions in [`.github/instructions`](.github/instructions/)
- AI provenance logging in [`ai-logs`](ai-logs/)
- Markdown documentation in [`README.md`](README.md)

### Documentation Assets

- PowerPoint slide decks in `slides/20260518-aiasd-repos.pptx` and `slides/aiasd-311-monday.pptx`

### What Is Not Used

- No frontend framework
- No backend framework
- No package manager manifest
- No build system or bundler
- No test framework currently present

## AI-Assisted Artifacts

- `README.md`: Project overview and usage notes. AI log: [`ai-logs/2026/05/18/acaf6075-7dde-4cc7-b293-0829934f7cc3/conversation.md`](ai-logs/2026/05/18/acaf6075-7dde-4cc7-b293-0829934f7cc3/conversation.md)
- `docs/developer-guide.md`: Contributor guide for setup, workflow, validation, and troubleshooting. AI log: [`ai-logs/2026/05/19/ff1412ec-1440-4c21-a97e-d7f21445cab9/conversation.md`](ai-logs/2026/05/19/ff1412ec-1440-4c21-a97e-d7f21445cab9/conversation.md)
- `docs/calculator-specification.md`: Calculator requirements, feature-flag semantics, engine API contract, and acceptance scenarios. AI log: [`ai-logs/2026/05/20/1458b547-37c2-4434-9660-55aceb561034/conversation.md`](ai-logs/2026/05/20/1458b547-37c2-4434-9660-55aceb561034/conversation.md)
- `.github/instructions/ai-assisted-output.instructions.md`: Repository policy for AI provenance, logging, and compliance requirements. AI log: [`ai-logs/2026/05/18/acaf6075-7dde-4cc7-b293-0829934f7cc3/conversation.md`](ai-logs/2026/05/18/acaf6075-7dde-4cc7-b293-0829934f7cc3/conversation.md)
- `.github/instructions/evergreen-software-development.instructions.md`: Evergreen engineering guidance for maintainable software changes. AI log: [`ai-logs/2026/05/18/acaf6075-7dde-4cc7-b293-0829934f7cc3/conversation.md`](ai-logs/2026/05/18/acaf6075-7dde-4cc7-b293-0829934f7cc3/conversation.md)
- `.github/instructions/html.instructions.md`: HTML authoring guidance for semantic, accessible browser markup. AI log: [`ai-logs/2026/05/18/acaf6075-7dde-4cc7-b293-0829934f7cc3/conversation.md`](ai-logs/2026/05/18/acaf6075-7dde-4cc7-b293-0829934f7cc3/conversation.md)
- `.github/instructions/css.instructions.md`: CSS authoring guidance for maintainable styling and responsive layout. AI log: [`ai-logs/2026/05/18/acaf6075-7dde-4cc7-b293-0829934f7cc3/conversation.md`](ai-logs/2026/05/18/acaf6075-7dde-4cc7-b293-0829934f7cc3/conversation.md)
- `.github/instructions/javascript.instructions.md`: JavaScript authoring guidance for explicit state, rendering, and event handling. AI log: [`ai-logs/2026/05/18/acaf6075-7dde-4cc7-b293-0829934f7cc3/conversation.md`](ai-logs/2026/05/18/acaf6075-7dde-4cc7-b293-0829934f7cc3/conversation.md)
- `.github/prompts/git-commit-logical-groups.prompt.md`: Agent prompt for grouping workspace changes into logical commits with safe git workflow checks. AI log: [`ai-logs/2026/05/19/f484659e-32e1-441a-958c-e33d2d7925f1/conversation.md`](ai-logs/2026/05/19/f484659e-32e1-441a-958c-e33d2d7925f1/conversation.md)
- `.github/skills/git-commit-logical-groups/SKILL.md`: Reusable skill for staging and committing local changes in logical, review-friendly groups using Conventional Commits and safety checks. AI log: [`ai-logs/2026/05/20/8948d9b2-5146-4fb5-8a9e-aece30d7ac17/conversation.md`](ai-logs/2026/05/20/8948d9b2-5146-4fb5-8a9e-aece30d7ac17/conversation.md)
- `.github/prompts/project-tech-stack-inventory.prompt.md`: Agent prompt for generating an evidence-based inventory of technologies, frameworks, and tools in the repository. AI log: [`ai-logs/2026/05/18/acaf6075-7dde-4cc7-b293-0829934f7cc3/conversation.md`](ai-logs/2026/05/18/acaf6075-7dde-4cc7-b293-0829934f7cc3/conversation.md)
- `.github/prompts/documentation-instruction-file-generator.prompt.md`: Agent prompt for generating a repository documentation instruction file with standards, structure, and compliance requirements. AI log: [`ai-logs/2026/05/19/950941c4-4c36-4ba9-b757-4c9539968e87/conversation.md`](ai-logs/2026/05/19/950941c4-4c36-4ba9-b757-4c9539968e87/conversation.md)
- `.github/prompts/test-driven-development-instruction-file-generator.prompt.md`: Agent prompt for regenerating the repository TDD instruction file with strict Red-Green-Refactor and unit-test requirements. AI log: [`ai-logs/2026/05/20/f62cf86f-6857-4562-8b9d-46319d02acd9/conversation.md`](ai-logs/2026/05/20/f62cf86f-6857-4562-8b9d-46319d02acd9/conversation.md)
- `.github/instructions/documentation.instructions.md`: Canonical repository documentation authoring, linking, and maintenance standards for Markdown docs. AI log: [`ai-logs/2026/05/19/aae6cce1-78ed-4c45-a2fc-36cb511a2fba/conversation.md`](ai-logs/2026/05/19/aae6cce1-78ed-4c45-a2fc-36cb511a2fba/conversation.md)
- `.github/instructions/agent-file.instructions.md`: Canonical standards for creating and validating custom `.agent.md` files. AI log: [`ai-logs/2026/05/20/6e12419b-016a-4376-ac02-08f264cfc1a5/conversation.md`](ai-logs/2026/05/20/6e12419b-016a-4376-ac02-08f264cfc1a5/conversation.md)
- `.github/agents/Product Owner.agent.md`: Product Owner agent for backlog shaping, acceptance criteria, and release-oriented planning. AI log: [`ai-logs/2026/05/20/6e12419b-016a-4376-ac02-08f264cfc1a5/conversation.md`](ai-logs/2026/05/20/6e12419b-016a-4376-ac02-08f264cfc1a5/conversation.md)
- `.github/agents/git-expert.agent.md`: Git Expert agent for safe branching, commit hygiene, history analysis, conflict resolution, and release-ready Git workflows. AI log: [`ai-logs/2026/05/20/dd31b226-b811-4f1c-8d56-c55430be1d5e/conversation.md`](ai-logs/2026/05/20/dd31b226-b811-4f1c-8d56-c55430be1d5e/conversation.md)
- `.github/instructions/test-driven-development.instructions.md`: Repository guidance for Red-Green-Refactor workflow, test design, and TDD quality gates. AI log: [`ai-logs/2026/05/20/380dcaef-538d-40bf-9b00-5036801ca53a/conversation.md`](ai-logs/2026/05/20/380dcaef-538d-40bf-9b00-5036801ca53a/conversation.md)
- Additional project instruction artifacts currently present in [`.github/instructions/`](.github/instructions/): `chatmode-file.instructions.md`, `instruction-files.instructions.md`, `instruction-prompt-files.instructions.md`, and `prompt-file.instructions.md`.

## Instructions

This repository includes detailed instructions for core technologies:

- [HTML Instructions](.github/instructions/html.instructions.md): Guidelines for semantic, accessible, and maintainable HTML.
- [CSS Instructions](.github/instructions/css.instructions.md): Best practices for writing scalable and maintainable CSS.
- [JavaScript Instructions](.github/instructions/javascript.instructions.md): Rules for modern, modular, and testable JavaScript.

Refer to these documents to ensure code quality and consistency across the project.
