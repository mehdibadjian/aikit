# Usage & Reference

Once built, you can run the CLI workflow locally. 

## Running the CLI
```bash
pnpm start
```
Alternatively, if linked globally, you can invoke:
```bash
ai-scaffold init
```

## The Interactive Flow
The CLI leverages `@clack/prompts` to ask a series of configuration questions:
1. **Target Directory:** Where should the files be scaffolded? (Default is current folder `.`)
2. **Project Name:** A generic identifier for the project.
3. **Project Type:** Identifies whether it's frontend, backend, fullstack, or scripting. This variable is injected directly into templates.
4. **AI Tools:** Multiselect options for GitHub Copilot and Google Antigravity. The tool will inject tool-specific configs based on these selections.

Upon completion, it recursively traverses the `templates/` directory, compiles the variable map, and renders the assets securely in your project.
