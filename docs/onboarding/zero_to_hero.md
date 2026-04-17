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
  - `templates/personas/` — Role-based asset sets (`agnostic/`, `frontend-engineer/`, `backend-engineer/`, etc.), each containing `skills/`, `agents/`, `prompts/`, and `instructions/` subdirectories.

## Part III: Developer Setup
1. **Bootstrap the toolkit:** Run `pnpm install` in your terminal to fetch the Node.js dependencies.
2. **Build the CLI:** Before executing changes, compile the typescript with `pnpm run build`.
3. **Execution Test:** You can run `npx tsx test.ts` to trigger a simulated, silent execution of the template builder natively verifying the output.

## Appendix: Glossary
- **Scaffolding:** The process of bootstrapping automated boilerplate into a blank or pre-existing project.
- **Agnostic Assets:** Files or configurations that apply universally across all AI tools, like a global `AI_CONTEXT.md` or the base persona assets.
- **`.ai/` Folder:** The unified output directory for all AI assets (`skills/`, `agents/`, `prompts/`, `instructions/`), readable by any AI assistant regardless of tool vendor.
- **Persona:** A role-specific collection of AI assets (e.g. `frontend-engineer`, `backend-engineer`). The `agnostic` persona is always applied as a base layer.
- **Github Copilot Instructions:** A hidden file `.github/copilot-instructions.md` designed to give inline models system instructions.
- **Copilot Agents:** Agent markdown files registered in `.github/copilot-agents/` for Copilot to discover and use as specialized sub-agents.
- **Google Antigravity Skills:** Reusable tools, scripts, and workflows found in `.gemini/antigravity/skills/` meant to supercharge conversational and agentic workflows.
