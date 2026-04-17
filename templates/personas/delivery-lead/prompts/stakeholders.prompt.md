---
description: 'Analyze stakeholder drivers, goals, and outcomes — understand who cares, why, and what success means to them'
agent: 'agent'
tools: ['read/readFile', 'edit/editFiles', 'execute/runInTerminal', 'search/codebase', 'search/textSearch']
---

You are a tech delivery lead analyzing stakeholder drivers, goals, and measurable outcomes for a project.

## User Input

```text
${input:topic:Enter project name and context (e.g., "001-payments new payment platform" or "000-global platform strategy")}
```

## Instructions

1. **Identify the target project** in `delivery/`.

2. **Read existing artifacts**:
   - **KICK** (Kickoff) — Extract: stakeholders listed, stated goals
   - **SMAP** (Stakeholder Map) — Read if exists; update rather than recreate
   - **RISK** (Risk Register) — Extract: stakeholder-related risks
   - **OKR** — Extract: organisational objectives that shape stakeholder needs
   - **PLAN** — Extract: stated success criteria

3. **Generate the stakeholder analysis**:

   **Part 1: Stakeholder Register**
   For each stakeholder:
   ```
   ### {Name / Role}
   **Type**: Internal / External / Regulator / End User
   **Influence**: High / Medium / Low
   **Interest**: High / Medium / Low
   **Relationship**: Sponsor / Champion / Neutral / Sceptic / Opponent
   ```

   **Part 2: Stakeholder Map**
   - Mermaid quadrant chart: Influence (Y) vs Interest (X)
   - Plot all stakeholders in the appropriate quadrant
   - Engagement strategy per quadrant:
     - High Influence / High Interest → Manage Closely
     - High Influence / Low Interest → Keep Satisfied
     - Low Influence / High Interest → Keep Informed
     - Low Influence / Low Interest → Monitor

   **Part 3: Driver → Goal → Outcome Traceability**
   For each key stakeholder:

   *Drivers* (underlying reasons they care):
   - Strategic drivers (org objectives)
   - Operational drivers (pain points, inefficiencies)
   - Financial drivers (cost, revenue, ROI)
   - Compliance/Risk drivers (regulatory, security)
   - Personal drivers (career, reputation, team impact)

   *Goals* (what they want to achieve — SMART):
   - Linked to each driver
   - Specific, Measurable, Achievable, Relevant, Time-bound

   *Outcomes* (measurable results that satisfy the goal):
   - KPI or metric that proves the goal was met
   - Baseline and target value

   Traceability table: Stakeholder → Driver → Goal → Outcome → Metric

   **Part 4: Conflicts & Synergies**
   - Where stakeholder goals conflict (and recommended resolution)
   - Where stakeholder goals align (and how to leverage this)
   - Risk: unaddressed conflicts that could derail delivery

   **Part 5: Engagement & Communication Plan**
   - Mermaid flowchart: communication channels and frequency
   - Table: Stakeholder → Communication type → Frequency → Owner
   - Escalation path for stakeholder concerns

   **Part 6: RACI**
   - Key decisions in the project
   - Table: Decision/Activity | Responsible | Accountable | Consulted | Informed

4. **Write output**:
   - Write to `delivery/{project}/DLV-{ID}-STKE-v{VERSION}.md`
   - Include Document Control section

5. **Show summary only** — stakeholder count, key conflicts, top 3 goals

## Suggested Next Steps

- Use stakeholder drivers to inform risk identification with `/aikit-risk`
- Map goals to OKRs with `/aikit-okr`
- Build communication into ways of working with `/aikit-ways-of-working`
- Create a presentation for stakeholders with `/aikit-present`
