# aikit

A powerful, interactive CLI tool built to scaffold AI assets — skills, agents, prompts, and instructions — into any project for GitHub Copilot and Google Antigravity.

## 🚀 Features
- **Prompt Driven:** Beautiful interactive terminal UI powered by `@clack/prompts`.
- **Parametrized Templates:** Embeds project name, type, and custom variables directly into `.md` files dynamically.
- **`.ai/` Folder Convention:** Writes all AI assets into a unified `.ai/skills/`, `.ai/agents/`, `.ai/prompts/`, and `.ai/instructions/` structure.
- **GitHub Copilot Integration:** Injects `.github/copilot-instructions.md` and registers agents in `.github/copilot-agents/`.
- **Google Antigravity Integration:** Sets up `.gemini/antigravity/skills/` templates.
- **Engineering Personas:** Optionally scaffold role-specific AI assets for personas like `frontend-engineer` or `backend-engineer`.
- **Global Context:** Adds `AI_CONTEXT.md` explicitly mapping architectural guidelines.

## 🛠 File Structure
- `src/` - The core CLI TypeScript application.
  - `commands/` - Interactive prompts and CLI flows.
  - `utils/` - File system and templating logic.
- `templates/` - Holds all raw scaffold files ready to inject.
  - `templates/shared/` - Tool-agnostic base assets (e.g. `AI_CONTEXT.md`).
  - `templates/copilot/` - GitHub Copilot-specific assets.
  - `templates/antigravity/` - Google Antigravity-specific assets.
  - `templates/personas/` - Role-based AI asset sets (e.g. `agnostic/`, `frontend-engineer/`, `backend-engineer/`).
- `dist/` - Bundled output created via `tsup`.

## 💻 Quick Start (No Clone Required)

If you just want to use the CLI without modifying it, you can run it directly from this GitHub repository using `npx`:

```bash
npx mehdibadjian/aikit
# (Note: This will download, build, and execute the CLI automatically)
```

The CLI will prompt you for your project name, type, AI tools, and optional engineering personas, then scaffold the assets into your project.

## 🛠 Local Development & Installation

If you want to contribute, modify the templates locally, or build from source:

1. **Install Dependencies:**
   This project uses `pnpm`. Install everything via:
   ```bash
   pnpm install
   ```

2. **Build the CLI:**
   ```bash
   pnpm run build
   ```

3. **Global CLI Setup (Optional):**
   To run `ai-scaffold` from anywhere, you can link the package globally:
   ```bash
   pnpm link --global
   # or with npm
   npm link
   ```
   Now you can scaffold projects anywhere by running:
   ```bash
   ai-scaffold init
   ```

4. **Run Locally:**
   If you didn't link the package globally, you can run it via:
   ```bash
   pnpm start
   ```

## 🧪 Testing
An automated test script (`test.ts`) is included to verify the templating engine independently of the CLI prompt flow.
```bash
npx tsx test.ts
```

For more in-depth architecture decisions and onboarding guides, see [docs/index.md](./docs/index.md).
