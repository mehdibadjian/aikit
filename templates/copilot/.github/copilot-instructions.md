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
