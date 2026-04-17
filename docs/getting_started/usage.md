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
5. **Engineering Personas:** Optionally select role-specific personas (e.g. `Frontend Engineer`, `Backend Engineer`) to layer additional AI assets on top of the agnostic base.

Upon completion, the CLI:
- Writes shared base assets (`AI_CONTEXT.md`) to the target directory.
- Injects tool-specific configs (e.g. `.github/copilot-instructions.md` for Copilot, `.gemini/antigravity/` for Antigravity).
- Copies all AI assets from the `agnostic` base persona and any selected personas into `.ai/skills/`, `.ai/agents/`, `.ai/prompts/`, and `.ai/instructions/`.
- Registers Copilot agents in `.github/copilot-agents/` when GitHub Copilot is selected.

All `{{PROJECT_NAME}}` and `{{PROJECT_TYPE}}` placeholders in `.md` files are replaced with the values you provided.
