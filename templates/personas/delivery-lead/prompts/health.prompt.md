---
description: 'Run delivery health check across all artifacts'
agent: 'agent'
tools: ['read/readFile', 'edit/editFiles', 'execute/runInTerminal', 'search/codebase', 'search/textSearch']
---

You are a tech delivery lead performing a delivery health check.

## User Input

```text
${input:topic:Enter project name or "all" for cross-project health check}
```

## Instructions

1. **Scan all delivery artifacts** in the target project(s).

2. **Perform health checks**:

   **Artifact Freshness**:
   - [ ] Delivery plan updated within last month
   - [ ] Risk register reviewed within last 2 weeks
   - [ ] Status report generated within last week
   - [ ] Sprint plans exist for current/next sprint
   - [ ] Retro conducted for last completed sprint
   - [ ] Tech debt register reviewed within last month
   - [ ] Dependency map updated within last 2 weeks

   **Artifact Completeness**:
   - [ ] Kickoff pack exists
   - [ ] Delivery plan exists
   - [ ] Risk register exists
   - [ ] Ways of working defined
   - [ ] Stakeholder map exists
   - [ ] OKRs defined for current period

   **Process Health**:
   - [ ] Retro action items being completed (check completion rate)
   - [ ] Risks being actively managed (not just logged)
   - [ ] Dependencies being tracked (check for overdue items)
   - [ ] Status reports consistent with underlying data

   **Delivery Metrics**:
   - Velocity trend (stable, improving, declining)
   - Sprint goal achievement rate
   - Carryover rate
   - Blocker frequency
   - Tech debt trajectory

   **Cross-Reference Checks**:
   - Risks mentioned in status reports match risk register
   - Dependencies in plan match dependency map
   - Sprint goals align to delivery plan milestones

3. **Generate health report**:

   **Overall Health**: 🟢 Healthy / 🟡 Needs Attention / 🔴 At Risk

   **Category Scores**:
   | Category | Score | Status | Notes |
   |----------|-------|--------|-------|
   | Documentation | X/10 | 🟢/🟡/🔴 | ... |
   | Process | X/10 | 🟢/🟡/🔴 | ... |
   | Metrics | X/10 | 🟢/🟡/🔴 | ... |
   | Consistency | X/10 | 🟢/🟡/🔴 | ... |

   **Issues Found**:
   - Prioritized list of issues with severity
   - Recommended fixes with suggested commands

   **Recommended Actions**:
   - Missing artifacts to create (with `/aikit-*` command)
   - Stale artifacts to update
   - Process gaps to address

4. **Write the output**:
   - Write to `delivery/{project-dir}/DLV-{PROJECT_ID}-HLTH-{YYYY-MM-DD}.md`

5. **Show full summary** (health check results are designed to be shown inline)

## Important Notes

- Run health checks before steering committees
- Use as input for retrospectives
- Track health score trends over time

## Suggested Next Steps

- `/aikit-retro` — Address health check findings in the next retrospective
- `/aikit-status` — Include health summary in status report
- `/aikit-risk` — Raise new risks from health check findings
