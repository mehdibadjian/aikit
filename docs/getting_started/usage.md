# Usage & Reference

Once built, you can run the CLI workflow locally. 

## Running the CLI
```bash
pnpm start
```
Alternatively, if linked globally, you can invoke:
```bash
aikit init
```

## The Interactive Flow
The CLI leverages `@clack/prompts` to ask a series of configuration questions:
1. **Target Directory:** Where should the files be scaffolded? (Default is current folder `.`)
2. **Project Name:** A generic identifier for the project. Injected as `{{PROJECT_NAME}}` into all template `.md` files.
3. **AI Tools:** Multiselect options for GitHub Copilot, Google Antigravity, or Skip. The tool injects tool-specific configs based on these selections.
4. **Team Personas:** Dynamically populated from `templates/personas/`. Select one or more personas (e.g. `Delivery Lead`, `Engineer · Fullstack`) to layer role-specific AI assets on top of the shared base.

Upon completion, the CLI:
- Writes shared base assets (`AI_CONTEXT.md`) to the target directory.
- For **GitHub Copilot**: injects `.github/copilot-instructions.md`, writes agents to `.github/copilot-agents/`, and merges `.vscode/settings.json` so Copilot resolves `.ai/instructions/`, `.ai/prompts/`, and `.ai/agents/` automatically.
- For **Google Antigravity**: copies tool assets to `.gemini/`, converts `.prompt.md` files into `.gemini/commands/*.toml` for the Gemini CLI, merges `.gemini/settings.json`, and mirrors shared skills into `.gemini/skills/`.
- Copies all AI assets from any selected personas into `.ai/skills/`, `.ai/agents/`, `.ai/prompts/`, `.ai/instructions/`, and `.ai/references/`.

All `{{PROJECT_NAME}}` placeholders in `.md` files are replaced with the value you provided.
