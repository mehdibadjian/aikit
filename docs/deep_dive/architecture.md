# Architecture & Structure

The repository is built around strict separation of concerns, divided generally between the data mapping (questions), the execution (reading/writing to disk), and the raw static assets.

## Directory Separation

### `src/commands/`
This directory strictly handles user context gathering. It takes terminal inputs, parses choices, and yields a variable context object to the rest of the application. It has zero knowledge of *how* templates are built, just *what* variables should be collected.

### `src/utils/`
This holds generic utilities completely decoupled from the product state. The primary engines (`copyTemplate`, `processPersonaAssets`, `mergeVscodeSettings`, `mergeGeminiSettings`, `mirrorSharedSkillsToGemini`) belong here. They take a generic target directory and dictionary of key-value pairs, injecting those variables into any targeted Markdown templates recursively.

### `templates/`
The asset tree. Files placed here are completely statically defined but retain embedded string interpolations like `{{PROJECT_NAME}}`. They are divided into logically partitioned domains:
- `templates/shared/` — Tool-agnostic base assets, e.g. `AI_CONTEXT.md`.
- `templates/copilot/` — GitHub Copilot-specific configs, e.g. `.github/copilot-instructions.md`.
- `templates/antigravity/` — Google Antigravity-specific configs.
- `templates/personas/` — Role-based asset sets. Each persona subfolder (e.g. `delivery-lead/`, `engineer/fullstack/`) contains `skills/`, `agents/`, `prompts/`, `instructions/`, and `references/` directories. Top-level persona folders may group sub-personas (e.g. `engineer/` contains `fullstack/`).

### Output: `.ai/` Folder Convention
All persona assets (skills, agents, prompts, instructions, references) are written into a unified `.ai/` folder at the target path, making them accessible to any AI toolchain:
- `.ai/skills/`
- `.ai/agents/`
- `.ai/prompts/`
- `.ai/instructions/`
- `.ai/references/`

When GitHub Copilot is selected, agents are additionally registered in `.github/copilot-agents/` and `.vscode/settings.json` is merged to register all `.ai/` directories with Copilot's file-location settings.

When Google Antigravity is selected, skills are mirrored into `.gemini/skills/`, prompts are converted to `.gemini/commands/` TOML files, and `.gemini/settings.json` is merged.
