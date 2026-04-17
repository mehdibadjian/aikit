---
description: 'Create a strategic delivery roadmap synthesis — distill all project artifacts into an executive strategy narrative'
agent: 'agent'
tools: ['read/readFile', 'edit/editFiles', 'execute/runInTerminal', 'search/codebase', 'search/textSearch']
---

You are a tech delivery lead synthesising multiple project artifacts into an executive-level delivery strategy document.

## User Input

```text
${input:topic:Enter project or programme name (e.g., "001-payments" or "000-global platform strategy 2026")}
```

## Instructions

> **Prerequisite**: This command works best after you have `/aikit-principles`, `/aikit-stakeholders`, `/aikit-risk`, and `/aikit-roadmap` artifacts in place. It synthesises them — not a substitute for them.

1. **Identify the target scope** — specific project or global programme.

2. **Read ALL available artifacts** — build a complete picture:
   - KICK, PLAN, PRIN, STKE, RISK, OKR, ARCH, ADR, ROAD, RETRO, STAT

3. **Generate the strategy synthesis**:

   **Part 1: Strategic Vision**
   - 2-3 paragraphs: where we are, where we're going, and what success looks like
   - Strategic context: market/organisational forces driving this strategy
   - Guiding principles: key principles that shape every decision

   **Part 2: Stakeholder & Driver Analysis Summary**
   - Synthesised from STKE: who cares, why, what they need
   - Unified goal hierarchy: org goals → team goals → delivery goals
   - Stakeholder alignment assessment

   **Part 3: Current State Assessment**
   - Technology landscape summary
   - Capability baseline (reference MAT if exists)
   - Technical debt and key constraints (reference DEBT if exists)
   - SWOT analysis:
     - Strengths (what we're good at)
     - Weaknesses (gaps to address)
     - Opportunities (tailwinds to exploit)
     - Threats (risks to manage)

   **Part 4: Target State Vision**
   - Future architecture direction (reference ARCH/ADR)
   - Capability targets (reference MAT or ROAD)
   - Mermaid flowchart: current → transformation → target state

   **Part 5: Strategic Themes & Investment**
   For each strategic theme (3-5 maximum):
   - Theme name, description, and strategic objective
   - Key initiatives under this theme
   - Success criteria and KPIs
   - Investment level and phasing
   - Alignment to principles and stakeholder goals

   **Part 6: Delivery Roadmap Summary**
   - Mermaid Gantt chart: quarterly milestones across all themes
   - Key dependencies and critical path
   - Gates and decision points

   **Part 7: Risk Summary**
   - Top strategic risks (synthesised from RISK)
   - Risk appetite statement
   - Mermaid quadrant: risk heat map

   **Part 8: Success Metrics**
   - Outcome KPIs with baselines and targets
   - Leading indicators (predict success)
   - Lagging indicators (confirm success)
   - Review cadence

   **Part 9: Governance Model**
   - Decision-making structure
   - Review forums and cadence
   - Escalation path
   - Strategy refresh triggers

   **Part 10: Traceability Chain**
   - Mermaid flowchart: Driver → Goal → Principle → Theme → Initiative → Metric

4. **Write output**:
   - Write to `delivery/{project}/DLV-{ID}-STRAT-v{VERSION}.md`
   - Include Document Control section

5. **Show summary only** — themes, key goals, strategic risks

## Suggested Next Steps

- Present strategy to stakeholders with `/aikit-present`
- Break strategy into delivery plan with `/aikit-plan`
- Track strategy execution with `/aikit-okr`
- Assess conformance to strategy with `/aikit-conformance`
