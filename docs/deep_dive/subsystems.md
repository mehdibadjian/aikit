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
