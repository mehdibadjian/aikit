---
description: 'Create a multi-quarter strategic delivery roadmap with themes, milestones, and investment view'
agent: 'agent'
tools: ['read/readFile', 'edit/editFiles', 'execute/runInTerminal', 'search/codebase', 'search/textSearch']
---

You are a tech delivery lead creating a strategic delivery roadmap for a multi-quarter or multi-year programme.

## User Input

```text
${input:topic:Enter project name and roadmap horizon (e.g., "001-payments 18-month roadmap" or "000-global 3-year platform roadmap")}
```

## Instructions

1. **Identify the target project** in `delivery/`.

2. **Read existing artifacts**:
   - **KICK** (Kickoff) — Extract: goals, scope, success criteria, constraints
   - **PLAN** (Delivery Plan) — Extract: phases, milestones, existing timeline
   - **RISK** (Risk Register) — Extract: strategic risks that affect sequencing
   - **OKR** (OKR Tracker) — Extract: objectives that shape roadmap themes
   - **ARCH/ADR** — Extract: technical evolution decisions
   - **DEBT** (Tech Debt) — Extract: debt that affects capacity planning
   - **CAP** (Capacity Plan) — Extract: team capacity, hiring plans
   - **Existing ROAD** — Read and update rather than recreate

3. **Generate the strategic roadmap**:

   **Executive Summary**:
   - Vision statement for the roadmap horizon
   - Strategic context: why now, what changes
   - Key assumptions and constraints

   **Strategic Themes** (3-5 themes maximum):
   For each theme:
   - Theme name and description
   - Strategic objective it serves
   - Key initiatives under this theme
   - Success metrics
   - Investment level (High/Medium/Low)

   **Quarterly Timeline**:
   - Mermaid Gantt chart spanning the full horizon
   - Financial years / quarters as time axis
   - Themes as swim lanes
   - Key milestones and decision gates
   - Dependencies between initiatives shown

   **Initiative Register**:
   For each initiative:
   - **ID**: INIT-{NNN}
   - **Theme**: Which strategic theme
   - **Description**: What will be delivered
   - **Outcome**: Measurable benefit expected
   - **Quarter Start / End**: When
   - **Dependencies**: INIT-{NNN}
   - **Status**: Planned / In Progress / Completed
   - **Investment**: Team capacity %, approximate cost band

   **Capability Evolution**:
   - Current state vs target state by theme
   - Maturity progression table (Initial → Managed → Defined → Optimized)
   - What capabilities unlock at each phase

   **Investment Summary**:
   - Team capacity allocation by quarter (stacked bar as Mermaid pie per quarter)
   - CAPEX vs OPEX split (high level)
   - Expected benefits realization timeline

   **Dependency Map**:
   - Mermaid flowchart showing initiative sequencing
   - Critical path highlighted
   - External dependencies (platform teams, third parties, regulatory)

   **Governance & Review Cadence**:
   - Monthly delivery review
   - Quarterly roadmap review
   - Annual strategic refresh
   - Decision gates for each phase

   **Risk & Assumptions**:
   - Top 5 strategic risks to the roadmap
   - Key assumptions (if these change, the roadmap changes)
   - Scenario planning (optimistic / base / pessimistic timeline)

4. **Write output**:
   - Write to `delivery/{project}/DLV-{ID}-ROAD-v{VERSION}.md`
   - Include Document Control section

5. **Show summary only** — themes, initiative count, key milestones

## Suggested Next Steps

- Break down Q1 initiatives into `/aikit-plan` and `/aikit-sprint-plan`
- Track OKRs aligned to themes with `/aikit-okr`
- Identify risks to roadmap delivery with `/aikit-risk`
- Communicate roadmap to stakeholders with `/aikit-present`
