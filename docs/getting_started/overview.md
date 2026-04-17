# Overview

aikit is a powerful, interactive CLI tool built to scaffold AI assets — skills, agents, prompts, and instructions — into any project for GitHub Copilot and Google Antigravity.

## Key Features
- **Prompt Driven:** Beautiful interactive terminal UI powered by `@clack/prompts`.
- **Parametrized Templates:** Embeds project name and custom variables directly into `.md` files dynamically.
- **`.ai/` Folder Convention:** All AI assets land in a unified `.ai/skills/`, `.ai/agents/`, `.ai/prompts/`, `.ai/instructions/`, and `.ai/references/` structure — tool-agnostic and usable by any AI assistant.
- **GitHub Copilot Integration:** Injects `.github/copilot-instructions.md`, registers agents in `.github/copilot-agents/`, and auto-configures `.vscode/settings.json` to point Copilot's instruction, prompt, and agent file locations at your `.ai/` directories.
- **Google Antigravity Integration:** Sets up `.gemini/skills/`, converts prompt files to `.gemini/commands/` TOML entries for the Gemini CLI, and merges `.gemini/settings.json`.
- **Team Personas:** Dynamically discovers persona folders from `templates/personas/` — supports flat personas (e.g. `Delivery Lead`) and category-grouped personas (e.g. `Engineer · Fullstack`). The selected personas are layered into `.ai/` at scaffold time.
- **Global Context:** Adds `AI_CONTEXT.md` explicitly mapping architectural guidelines.
