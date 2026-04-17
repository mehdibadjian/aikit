# Overview

aikit is a powerful, interactive CLI tool built to scaffold AI assets — skills, agents, prompts, and instructions — into any project for GitHub Copilot and Google Antigravity.

## Key Features
- **Prompt Driven:** Beautiful interactive terminal UI powered by `@clack/prompts`.
- **Parametrized Templates:** Embeds project name, type, and custom variables directly into `.md` files dynamically.
- **`.ai/` Folder Convention:** All AI assets land in a unified `.ai/skills/`, `.ai/agents/`, `.ai/prompts/`, and `.ai/instructions/` structure — tool-agnostic and usable by any AI assistant.
- **GitHub Copilot Integration:** Injects `.github/copilot-instructions.md` and registers agents in `.github/copilot-agents/`.
- **Google Antigravity Integration:** Sets up `.gemini/antigravity/skills/` templates.
- **Engineering Personas:** Optionally scaffold role-specific AI assets for personas like `frontend-engineer` or `backend-engineer` on top of the agnostic base.
- **Global Context:** Adds `AI_CONTEXT.md` explicitly mapping architectural guidelines.
