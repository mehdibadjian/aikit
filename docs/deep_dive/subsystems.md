# Core Subsystems

## 1. Interactive Prompts Loader
The command line application's visual layout is governed entirely by `@clack/prompts` within the `init.ts` command block.
- By grouping questions using `p.group()`, the user is guided via step-by-step visual forms.
- Validators prevent an empty `PROJECT_NAME`. 
- Global error bounds via `onCancel` ensures a controlled shutdown (`process.exit(0)`) if the user hits `CTRL-C`.
- Persona options are discovered dynamically at runtime via `getAllPersonaOptions()`, which reads the `templates/personas/` directory and returns flat or category-grouped entries (e.g. `Delivery Lead`, `Engineer · Fullstack`).

## 2. The Templating Engine
The file-system logic dynamically evaluates variable structures. 
- During execution, the tool parses paths relative to the current execution directory (`process.cwd()`).
- Because compiled output resides in `/dist` while templates exist in `/templates`, the filesystem utilises Node `path.resolve` logic combined with regex replacements to ensure the `targetPath` cleanly ingests the processed payload from the source directory.
- The only interpolation variable collected today is `PROJECT_NAME`; all `{{PROJECT_NAME}}` placeholders across `.md` files are replaced at copy time.
- Arrays (like the `project.tools` selection containing `copilot` and `antigravity`) systematically toggle different `copyTemplate()` calls based on runtime choices.

## 3. Persona Asset Processor
The `processPersonaAssets()` function in `src/utils/fileSystem.ts` handles role-based asset scaffolding.
- It reads from `templates/personas/<persona>/` and iterates over five asset types: `skills`, `instructions`, `prompts`, `agents`, `references`.
- All assets are written to `.ai/<assetType>/` at the target path, creating a unified, tool-agnostic AI asset folder.
- When GitHub Copilot is selected, `agents` are additionally written to `.github/copilot-agents/` so Copilot can discover them natively.
- When Google Antigravity is selected, `skills` are also written to `.gemini/skills/`, and `prompts` are converted from `.prompt.md` format into `.toml` command files under `.gemini/commands/`.
- Persona folders may be nested under a category directory (e.g. `engineer/fullstack`); `getAllPersonaOptions()` surfaces both flat and nested personas as selectable options.

## 4. Tool-Specific Settings Merge
Two dedicated helpers patch tool configuration files non-destructively:
- **`mergeVscodeSettings()`** — Merges `chat.instructionsFilesLocations`, `chat.promptFilesLocations`, and `chat.agentFilesLocations` keys into `.vscode/settings.json`, pointing VS Code Copilot at the `.ai/` directories. Existing settings are preserved.
- **`mergeGeminiSettings()`** — Ensures `.gemini/settings.json` exists and is valid JSON, preserving any existing user keys.
- **`mirrorSharedSkillsToGemini()`** — Copies skills already placed in `.ai/skills/` (from shared templates) into `.gemini/skills/` so they are also discoverable by the Gemini CLI, without overwriting files already present.
