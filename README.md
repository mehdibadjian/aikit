# AI Scaffold CLI

A powerful, interactive CLI tool built to easily scaffold generic context, Copilot instruction files, and Antigravity skills into any project.

## 🚀 Features
- **Prompt Driven:** Beautiful interactive terminal UI powered by `@clack/prompts`.
- **Parametrized Templates:** Embeds project name, type, and custom variables directly into `.md` files dynamically.
- **GitHub Copilot Integration:** Injects `.github/copilot-instructions.md`.
- **Google Antigravity Integration:** Sets up `.gemini/antigravity/skills/` templates.
- **Global Context:** Adds `AI_CONTEXT.md` explicitly mapping architectural guidelines.

## 🛠 File Structure
- `src/` - The core CLI typescript application.
  - `commands/` - Interactive prompts and CL flows.
  - `utils/` - File system and templating logic.
- `templates/` - Holds all raw scaffold files ready to inject.
- `dist/` - Bundled output created via `tsup`.

## 💻 Installation & Usage

1. **Install Dependencies:**
   This project uses `pnpm`. Install everything via:
   ```bash
   pnpm install
   ```

2. **Build the CLI:**
   ```bash
   pnpm run build
   ```

3. **Run the CLI:**
   ```bash
   pnpm start
   # or (if linked globally)
   ai-scaffold init
   ```

## 🧪 Testing
An automated test script (`test.ts`) is included to verify the templating engine independently of the CLI prompt flow.
```bash
npx tsx test.ts
```

For more in-depth architecture decisions, see `docs/index.md` located in the docs directory.
