# Copilot Instructions

This repository is the **aikit** CLI — a scaffolding tool that copies AI assets (skills, prompts, agents, instructions) into projects for GitHub Copilot and Google Antigravity.

## AI Assets

This project uses an `.ai/` folder convention:
- `.ai/skills/` — Task-specific skill guides
- `.ai/instructions/` — Coding conventions and project-specific rules
- `.ai/agents/` — Specialized agent personas
- `.ai/prompts/` — Reusable prompt templates

## Skills

Before performing any task, check `.ai/skills/` for a relevant skill file and read it in full before proceeding. Skill files are Markdown documents named after the capability they describe (e.g., `wiki-architect.md`, `github-asset-hunter.md`).

If a skill exists that matches the user's request, you MUST load and follow it. Do not rely on this file to enumerate skills — discover them at task time by reading the directory.

## Instructions

Additional coding conventions and project-specific rules live in `.ai/instructions/`. Read any relevant instruction files before generating or reviewing code.

## Agents

Specialized agent personas live in `.ai/agents/`. When the user's request maps to a specific workflow (e.g., architecture review, documentation), check that directory and adopt the matching agent persona for the session.

## Prompts

Reusable prompt templates live in `.ai/prompts/`. When generating boilerplate, reviews, or repeated interactions, check for an existing prompt template before writing one from scratch.
