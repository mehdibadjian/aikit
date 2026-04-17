# Principal-Level Guide

Welcome to the AI Scaffold CLI architecture guide. This section is designed for senior engineers evaluating the core design implementation.

## Core Architectural Insight: Dynamic Template Evaluation
Unlike heavier CLI generators (like `create-react-app` or `Plop`) which rely on heavy AST parsing, this specific tool treats text-based generation exclusively via **mid-flight string interpolation and recursive buffering.**

In TypeScript: We iterate over template files with `fs.readFile`, regex substitute `{{VAR}}` to target variables, and execute an `fs.writeFile` to the destination. 

### Cross-Language Comparison
If implemented in Python, we would likely leverage a mature text-processor like **Jinja2** combined with `Pathlib` or cookiecutter logic:
```python
# Pseudo-Python Jinja2 Example
from jinja2 import Template
from pathlib import Path

def process_file(src_path: Path, dest_path: Path, context: dict):
    template_content = src_path.read_text()
    rendered = Template(template_content).render(**context)
    dest_path.write_text(rendered)
```
The trade-off here is relying strictly on lightweight native string regex matching `varName.replace(...)` to reduce dependency bloat, meaning no external template engine is required for the `.md` transformations!

## Architecture Flow
```mermaid
sequenceDiagram
    participant User
    participant CLI as src/commands/init.ts
    participant FS as src/utils/fileSystem.ts
    participant Templates as templates/

    User->>CLI: pnpm start
    CLI->>User: Prompts for Project Variables
    User-->>CLI: (Name, Type, Tools, Personas)
    CLI->>FS: copyTemplate('shared', dest, vars)
    FS->>Templates: Read shared assets
    Templates-->>FS: Return raw content
    FS->>FS: Interpolate {{PROJECT_NAME}} / {{PROJECT_TYPE}}
    FS->>User: Write AI_CONTEXT.md

    CLI->>FS: copyTemplate('copilot' | 'antigravity', dest, vars)
    FS->>Templates: Read tool-specific assets
    Templates-->>FS: Return raw content
    FS->>User: Write tool configs (.github/, .gemini/)

    CLI->>FS: processPersonaAssets('agnostic', dest, tools)
    FS->>Templates: Read personas/agnostic/{skills,agents,prompts,instructions}
    Templates-->>FS: Return asset files
    FS->>User: Write to .ai/{skills,agents,prompts,instructions}/
    Note over FS,User: Agents also written to .github/copilot-agents/ if Copilot selected

    CLI->>FS: processPersonaAssets(selectedPersona, dest, tools)
    FS->>Templates: Read personas/<persona>/{skills,agents,prompts,instructions}
    Templates-->>FS: Return persona-specific assets
    FS->>User: Layer into .ai/ folder
```
