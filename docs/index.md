# AI Scaffold CLI - Architecture & Implementation Plan

This document details the architectural decisions, design patterns, and implementation history for the `ai-scaffold-cli` tool.

## 1. Project Motivation
Developers increasingly utilize tools like GitHub Copilot and Google Antigravity. These agents benefit immensely from localized context (such as `.cursorrules`, `copilot-instructions.md`, or Antigravity skills). This CLI tool aims to standardize and automate the injection of that AI context into any repository instantly via dynamic templates.

## 2. Technology Stack
- **Language:** TypeScript
- **Runtime:** Node.js (v22+)
- **Package Manager:** `pnpm`
- **CLI Framework:** `commander` (for robust argument parsing)
- **Interactive Prompts:** `@clack/prompts` (for clear, beautiful terminal steps)
- **File Operations:** `fs-extra` defaults for async directory copies.
- **Bundler:** `tsup` for rapid, zero-config compilation down to a single `dist/index.js` file.
- **Code Quality:** ESLint & Prettier.

## 3. Application Architecture

### Core Modules
1. **`src/index.ts` (Entry Point)**
   - Houses the `commander` integration. Sets up the versioning and registers the `init` command.
2. **`src/commands/init.ts` (Interactive Flow)**
   - Captures user inputs (project name, project type, required AI tools) using terminal prompts.
   - Converts the responses into a mapping of variables.
3. **`src/utils/fileSystem.ts` (Template Engine)**
   - Calculates dynamic pathing based on whether it is running from `/dist` or `/src`.
   - Iteratively reads the `templates/` directory and recursively copies them to the target.
   - Injects variables (e.g., `{{PROJECT_NAME}}`) using regex string interpolation mid-flight.

### Data Flow
1. User types `pnpm start`.
2. Terminal prompts user for settings.
3. Program reads configurations from `templates/`.
4. String references are statically replaced.
5. Directory structures are replicated identically within the target directory.

## 4. Implementation phases (Completed)

**Phase 1: Repository Boilerplate**
- Initialized Node stack. Set up TypeScript, `tsup` configuration, linting via ESLint, and code formatting via Prettier.
- Authored `.gitignore` to protect environment boundaries.

**Phase 2: Template Assembly**
The core "brain" of the project resides in `templates/`:
- `shared/AI_CONTEXT.md` -> Target root framework.
- `copilot/.github/copilot-instructions.md` -> Copilot guidelines.
- `antigravity/.gemini/antigravity/skills/project-scaffold/SKILL.md` -> Antigravity context.

**Phase 3: Logic Implementation**
- Created the recursive `copyTemplate` utility.
- Authored the `@clack` state machine.

**Phase 4: Quality Assurance**
- Fully audited local E2E functionality with an automated script (`test.ts`) using the `tsx` runtime. Simulated a template clone over an `e2e-test` directory and validated variable replacement.

## 5. Future Considerations
- Add remote Git fetching (so templates can be pulled from a remote URL).
- Add support for configuration via a `scaffold.json` file.
- Allow users to "publish" their own skills via `.cursorrules` generation.
