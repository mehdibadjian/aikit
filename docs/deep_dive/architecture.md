# Architecture & Structure

The repository is built around strict separation of concerns, divided generally between the data mapping (questions), the execution (reading/writing to disk), and the raw static assets.

## Directory Separation

### `src/commands/`
This directory strictly handles user context gathering. It takes terminal inputs, parses choices, and yields a variable context object to the rest of the application. It has zero knowledge of *how* templates are built, just *what* variables should be collected.

### `src/utils/`
This holds generic utilities completely decoupled from the product state. The primary engine (`copyTemplate` and `processAgnosticAssets`) belongs here. It takes a generic target directory and dictionary of key-value pairs, injecting those variables into any targeted Markdown templates recursively.

### `templates/`
The asset tree. Files placed here are completely statically defined but retain embedded string interpolations like `{{PROJECT_NAME}}`. They are divided into logically partitioned domains:
- `templates/shared/`
- `templates/copilot/`
- `templates/antigravity/`
