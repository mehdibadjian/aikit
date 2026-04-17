# Copilot Instructions

This repository is maintained with specific conventions to maximize GitHub Copilot efficacy. 

## General 
- Write concise, idiomatic code. 
- Avoid verbose or obsolete design patterns.
- Prefer explicit variable names over shorthand.

## Architecture
- Use functional programming where appropriate, avoiding deep inheritance chains.
- Ensure all business logic is strictly separated from presentation logic.
- Do not import external modules unless explicitly told to do so or if they exist in package dependencies.

## Testing
- Ensure that you author accompanying tests for any logic you generate.
- Use explicit assertions and descriptive test titles.

(Please read the AI_CONTEXT.md at the root for a deeper understanding of the specific domains in this codebase.)

## AI Assets
This project uses an `.ai/` folder to store reusable AI assets:
- `.ai/skills/` — Task-specific skill guides. Read the relevant skill file before performing that task.
- `.ai/instructions/` — Coding conventions and project-specific rules. Always follow these.
- `.ai/agents/` — Specialized agent personas for specific workflows.
- `.ai/prompts/` — Reusable prompt templates.
