# Zero-to-Hero Learning Path

Welcome! This guide will take you from setting up your laptop to understanding the internals of the AI Scaffold CLI.

## Part I: Foundation (TypeScript CLI vs Python)
This project is built using TypeScript on Node.js using `@clack/prompts` and a fast bundler called `tsup`. 
If you are coming from the Python ecosystem, this is analogous to using Python's `Typer` or `Click` libraries for CLI entry points combined with `PyInstaller` or pure script execution. Both deal effectively in passing ARGV flags and parsing standard input.

## Part II: Codebase Walkthrough
The main entry flow of the CLI application begins at `src/commands/init.ts`.
### Directory Mapping:
- `src/` — Core TypeScript routines.
- `src/commands/` — Interactive data collection.
- `src/utils/` — The filesystem interaction and string parsers.
- `templates/` — The actual payload. Holds all raw scaffold files ready to inject.
  - `templates/shared/` — Tool-agnostic base assets.
  - `templates/copilot/` — GitHub Copilot-specific assets.
  - `templates/antigravity/` — Google Antigravity assets.
  - `templates/personas/` — Role-based asset sets. Top-level folders are either flat personas (e.g. `delivery-lead/`) or category folders containing sub-personas (e.g. `engineer/fullstack/`). Each persona contains `skills/`, `agents/`, `prompts/`, `instructions/`, and `references/` subdirectories.

## Part III: Developer Setup
1. **Bootstrap the toolkit:** Run `pnpm install` in your terminal to fetch the Node.js dependencies.
2. **Build the CLI:** Before executing changes, compile the typescript with `pnpm run build`.
3. **Execution Test:** You can run `npx tsx test.ts` to trigger a simulated, silent execution of the template builder natively verifying the output.

## Appendix: Glossary
- **Scaffolding:** The process of bootstrapping automated boilerplate into a blank or pre-existing project.
- **`.ai/` Folder:** The unified output directory for all AI assets (`skills/`, `agents/`, `prompts/`, `instructions/`, `references/`), readable by any AI assistant regardless of tool vendor.
- **Persona:** A role-specific collection of AI assets (e.g. `delivery-lead`, `engineer/fullstack`). Selected personas are layered directly into `.ai/` at scaffold time.
- **Github Copilot Instructions:** A hidden file `.github/copilot-instructions.md` designed to give inline models system instructions.
- **Copilot Agents:** Agent markdown files registered in `.github/copilot-agents/` for Copilot to discover and use as specialized sub-agents.
- **VSCode Settings Merge:** Auto-patching of `.vscode/settings.json` to register `.ai/instructions/`, `.ai/prompts/`, and `.ai/agents/` with Copilot's file-location settings.
- **Google Antigravity Commands:** Prompt files converted to `.toml` format under `.gemini/commands/` for use as slash commands in the Gemini CLI.
- **Google Antigravity Skills:** Reusable skill files placed in `.gemini/skills/` to supercharge Gemini agentic workflows.
