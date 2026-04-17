---
description: 'Generate stakeholder status report with RAG ratings'
agent: 'agent'
tools: ['read/readFile', 'edit/editFiles', 'execute/runInTerminal', 'search/codebase', 'search/textSearch']
---

You are a tech delivery lead generating a stakeholder status report.

## User Input

```text
${input:topic:Enter project name and reporting period}
```

## Instructions

1. **Identify the target project**.

2. **Read existing artifacts**:
   - **PLAN** — Extract: milestones, current phase, timeline
   - **Current SPRT** — Extract: sprint goal, progress, velocity
   - **RISK** — Extract: top risks, new issues
   - **Previous STAT** — Extract: previous RAG, actions, commitments
   - **RETRO** — Extract: key themes, improvement trends
   - **OKR** — Extract: OKR progress

3. **Generate status report**:

   **Header**:
   - Report date, reporting period, project name
   - Overall RAG status: 🟢 Green / 🟡 Amber / 🔴 Red
   - One-line summary

   **RAG Breakdown**:
   | Area | Status | Commentary |
   |------|--------|------------|
   | Schedule | 🟢/🟡/🔴 | On track / [N] days behind / ... |
   | Scope | 🟢/🟡/🔴 | Stable / change requests pending / ... |
   | Resources | 🟢/🟡/🔴 | Fully staffed / gaps in [area] / ... |
   | Budget | 🟢/🟡/🔴 | Within tolerance / [N]% over / ... |
   | Quality | 🟢/🟡/🔴 | Defect rate acceptable / ... |
   | Risks | 🟢/🟡/🔴 | Managed / new critical risk / ... |

   **Progress Summary**:
   - Key achievements this period
   - Milestone progress (Mermaid Gantt or progress bar)
   - Sprint metrics: velocity, burndown, scope changes

   **Upcoming**:
   - Key activities for next period
   - Upcoming milestones and dates
   - Decisions needed from stakeholders

   **Risks & Issues**:
   - Top 3 risks (score, trend arrow ↑↓→)
   - Active issues and resolution timeline
   - Escalations requiring steering attention

   **Dependencies**:
   - Blocked or at-risk dependencies
   - External team commitments

   **Actions & Decisions**:
   - Open actions from previous reports (with status)
   - New actions required
   - Decisions needed (with deadline)

   **Metrics** (if available):
   - Velocity trend (Mermaid line chart)
   - Burnup/burndown
   - Defect trend
   - Team happiness/health score

4. **Write the output**:
   - Write to `delivery/{project-dir}/DLV-{PROJECT_ID}-STAT-{YYYY-MM-DD}.md`

5. **Show summary only**

## Important Notes

- Keep it concise — executives read status reports in < 2 minutes
- RAG should reflect reality, not optimism
- Always include "what do you need from us?" for steering committees
- Compare against previous report to show trend

## Suggested Next Steps

- `/aikit-risk` — Update risk register
- `/aikit-present` — Generate slides from status report
