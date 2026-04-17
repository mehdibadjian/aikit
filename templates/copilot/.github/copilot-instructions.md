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

## AI Assets
This project uses an `.ai/` folder to store reusable AI assets:
- `.ai/skills/` — Task-specific skill guides. Check this directory and read the relevant skill before performing any task.
- `.ai/instructions/` — Coding conventions and project-specific rules. Read relevant files before generating or reviewing code.
- `.ai/agents/` — Specialized agent personas. Adopt the matching persona when the user's request maps to a specific workflow.
- `.ai/prompts/` — Reusable prompt templates. Check for an existing template before writing a prompt from scratch.
