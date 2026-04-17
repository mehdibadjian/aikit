# aikit — Gemini Project Context

This repository is the **aikit** CLI — a scaffolding tool that copies AI assets (skills, prompts, agents, instructions) into projects for GitHub Copilot and Google Antigravity.

## Skills

Skills live in `.ai/skills/` as individual `.md` files. Before performing any task, list that directory and read any skill file relevant to the user's request. Do not rely on this file to enumerate them — discover them at task time.

## Instructions

Coding conventions and project-specific rules live in `.ai/instructions/`. Read any relevant files before generating or reviewing code.

## Agents

Agent personas live in `.ai/agents/`. When the user's request maps to a specific workflow, check that directory and adopt the matching persona for the session.

## Prompts

Reusable prompt templates live in `.ai/prompts/`. Check for an existing template before writing a prompt from scratch.

## Conventions

- Source is TypeScript under `src/`; built output goes to `dist/`
- Templates live under `templates/personas/<persona>/{skills,prompts,agents,instructions}/`
- The `agnostic` persona is always applied; other personas are user-selected at init time
- Run `pnpm build` to compile; `pnpm dev` for watch mode
