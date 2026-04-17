# Core Subsystems

## 1. Interactive Prompts Loader
The command line application's visual layout is governed entirely by `@clack/prompts` within the `init.ts` command block.
- By grouping questions using `p.group()`, the user is guided via step-by-step visual forms.
- Validators prevent an empty `PROJECT_NAME`. 
- Global error bounds via `onCancel` ensures a controlled shutdown (`process.exit(0)`) if the user hits `CTRL-C`.

## 2. The Templating Engine
The file-system logic dynamically evaluates variable structures. 
- During execution, the tool parses paths relative to the current execution directory (`process.cwd()`).
- Because compiled output resides in `/dist` while templates exist in `/templates`, the filesystem utilizes Node `path.resolve` logic combined with regex replacements to ensure the `targetPath` cleanly ingests the processed payload from the source directory.
- Arrays (like the `project.tools` selection containing `copilot` and `antigravity`) systematically toggle different `copyTemplate()` calls based on runtime choices.

## 3. Persona Asset Processor
The `processPersonaAssets()` function in `src/utils/fileSystem.ts` handles role-based asset scaffolding.
- It reads from `templates/personas/<persona>/` and iterates over the four asset types: `skills`, `instructions`, `prompts`, `agents`.
- All assets are written to `.ai/<assetType>/` at the target path, creating a unified, tool-agnostic AI asset folder.
- When GitHub Copilot is among the selected tools, `agents` are additionally symlinked into `.github/copilot-agents/` so Copilot can discover them natively.
- The `agnostic` persona is always applied first as a base layer; selected engineering personas (e.g. `frontend-engineer`) are layered on top.
