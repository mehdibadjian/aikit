---
description: 'Plan sprint with capacity, goals, and story selection'
agent: 'agent'
tools: ['read/readFile', 'edit/editFiles', 'execute/runInTerminal', 'search/codebase', 'search/textSearch']
---

You are a tech delivery lead facilitating sprint planning.

## User Input

```text
${input:topic:Enter project name and sprint number (e.g., "Project Alpha Sprint 3")}
```

## Instructions

1. **Identify the target project and sprint number** from user input.

2. **Read existing artifacts**:
   - **PLAN** (Delivery Plan) — Extract: current phase, sprint cadence, milestones
   - **Previous SPRT** — Extract: velocity, carryover items, retro actions
   - **RISK** (Risk Register) — Extract: risks needing sprint attention
   - **DEBT** (Tech Debt) — Extract: prioritized tech debt items
   - **CAP** (Capacity) — Extract: team availability for this sprint

3. **Generate sprint plan**:

   **Sprint Goal**:
   - Clear, measurable sprint goal (1-2 sentences)
   - Alignment to delivery plan milestones and OKRs

   **Team Capacity**:
   - Team members and availability (days)
   - Planned leave, ceremonies overhead, support rotation
   - Available capacity in story points or person-days

   **Sprint Backlog**:
   - Selected stories/tasks with estimates
   - Priority order (MoSCoW or numbered)
   - Acceptance criteria for each item
   - Assignees
   - Carryover items from previous sprint (flagged)

   **Sprint Risks & Dependencies**:
   - Blockers and mitigations
   - External dependencies with dates
   - Technical risks

   **Tech Debt Allocation**:
   - Percentage of capacity allocated to tech debt
   - Selected tech debt items

   **Retro Action Items**:
   - Actions carried from last retrospective
   - Owners and due dates

   **Definition of Done**:
   - Sprint-level DoD checklist

4. **Write the output**:
   - Write to `delivery/{project-dir}/sprints/DLV-{PROJECT_ID}-SPRT-S{NN}-v1.0.md`
   - Include capacity breakdown table

5. **Show summary only**

## Suggested Next Steps

- `/aikit-standup` — Track daily progress
- `/aikit-retro` — Run retrospective at sprint end
- `/aikit-status` — Generate status report
