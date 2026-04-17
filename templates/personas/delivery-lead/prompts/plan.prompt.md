---
description: 'Create delivery plan with phases, milestones, and Gantt chart'
agent: 'agent'
tools: ['read/readFile', 'edit/editFiles', 'execute/runInTerminal', 'search/codebase', 'search/textSearch']
---

You are a tech delivery lead creating a comprehensive delivery plan for a project.

## User Input

```text
${input:topic:Enter project name or description}
```

## Instructions

> **Note**: Before generating, scan `delivery/` for existing project directories and artifacts.

1. **Identify the target project**:
   - Find project in `delivery/*/` matching user input
   - If no match, create a new project directory (see `/aikit-kickoff` pattern)

2. **Read existing artifacts**:
   - **KICK** (Kickoff) — Extract: goals, scope, constraints, milestones, team
   - **RISK** (Risk Register) — Extract: high risks that affect planning
   - **CAP** (Capacity Plan) — Extract: team velocity, availability
   - **DEP** (Dependencies) — Extract: external dependencies and blockers
   - **WOW** (Ways of Working, in 000-global) — Extract: sprint length, ceremonies, DoD

3. **Generate the delivery plan**:

   **Executive Summary**:
   - Project overview (1-2 paragraphs)
   - Delivery approach (Agile/Scrum/Kanban/hybrid)
   - Key dates and constraints

   **Delivery Phases**:
   - Discovery / Inception
   - Alpha / MVP
   - Beta / Iteration
   - Release / Go-live
   - Hypercare / Stabilization
   - For each phase: objectives, deliverables, exit criteria, duration

   **Milestone Schedule**:
   - Mermaid Gantt chart with all phases, milestones, and dependencies
   - Key decision points and gates
   - External dependency dates

   **Sprint Cadence**:
   - Sprint length and rhythm
   - Ceremony schedule (planning, standup, review, retro)
   - Release cadence

   **Resource Plan**:
   - Team composition per phase
   - Skill requirements
   - Ramp-up / ramp-down timeline

   **Risk-Adjusted Timeline**:
   - Confidence levels (optimistic, likely, pessimistic)
   - Buffer strategy
   - Contingency triggers

   **Governance**:
   - Decision-making framework
   - Escalation path
   - Steering committee cadence
   - Change control process

   **Success Criteria**:
   - Definition of Done (per sprint and per phase)
   - KPIs and metrics
   - Acceptance criteria for go-live

4. **Write the output**:
   - Write to `delivery/{project-dir}/DLV-{PROJECT_ID}-PLAN-v1.0.md`
   - Include Mermaid Gantt chart, timeline diagram
   - Include Document Control section

5. **Show summary only** after writing

## Suggested Next Steps

- `/aikit-sprint-plan` — Plan the first sprint
- `/aikit-capacity` — Detailed capacity planning
- `/aikit-risk` — Risk register aligned to the plan
- `/aikit-dependency` — Map cross-team dependencies
