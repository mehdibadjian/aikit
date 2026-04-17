---
description: 'Generate a requirements traceability matrix — map goals to decisions to stories to tests'
agent: 'agent'
tools: ['read/readFile', 'edit/editFiles', 'execute/runInTerminal', 'search/codebase', 'search/textSearch']
---

You are a tech delivery lead generating a traceability matrix to ensure complete end-to-end coverage from goals through to tests.

## User Input

```text
${input:topic:Enter project name (e.g., "001-payments") and optional focus (e.g., "authentication stories only")}
```

## Instructions

1. **Identify the target project** in `delivery/`.

2. **Read existing artifacts** to extract traceability items:
   - **KICK** — Extract: goals, success criteria (GOAL-{NNN})
   - **RISK** — Extract: risks (RISK-{NNN})
   - **ADR** — Extract: decisions (ADR-{NNN})
   - **RFC** — Extract: proposed changes (RFC-{NNN})
   - **SPRT/BKLOG** — Extract: user stories (STORY-{NNN})
   - **TEST** — Extract: test cases, test suites, coverage
   - **REL** — Extract: release items and acceptance criteria
   - **ARCH** — Extract: architecture components

3. **Generate the traceability matrix**:

   **Part 1: Goal → Story Traceability**
   - Table: Goal ID | Goal Description | Story IDs | Coverage %
   - Flag goals with no stories (🔴 gap)
   - Flag stories with no goal (⚠️ orphan)

   **Part 2: Story → Test Traceability**
   - Table: Story ID | Story Title | Test Case IDs | Test Type | Status
   - Coverage: % of stories with test coverage
   - Flag untested stories (🔴 gap)

   **Part 3: Decision → Story Traceability**
   - Table: ADR ID | Decision Title | Affected Stories | Implementation Status
   - Flag decisions not yet reflected in stories (⚠️ not implemented)

   **Part 4: Risk → Mitigation Traceability**
   - Table: Risk ID | Risk Description | Mitigation Story/ADR | Status
   - Flag risks with no mitigation action (🔴 unmitigated)

   **Part 5: Full End-to-End Chain**
   - Mermaid flowchart: Goal → Story → Test → Release chain for top 5 goals
   - Shows complete traceability path for key features

   **Part 6: Coverage Analysis**
   - Goal coverage: X of Y goals have stories (%)
   - Story test coverage: X of Y stories have tests (%)
   - Risk mitigation coverage: X of Y risks have actions (%)
   - Overall traceability health score (0-100)

   **Part 7: Gap Register**
   - Table of all identified gaps with: Type | Item ID | Description | Recommended Action | Priority
   - Prioritised: 🔴 Critical → 🟠 High → 🟡 Medium → 🟢 Low

4. **Write output**:
   - Write to `delivery/{project}/DLV-{ID}-TRACE-v{VERSION}.md`
   - Include Document Control section

5. **Show summary only** — coverage scores, gap count

## Suggested Next Steps

- Close story gaps with `/aikit-backlog`
- Close test gaps with `/aikit-testing-strategy`
- Close risk gaps with `/aikit-risk`
- Run quality conformance check with `/aikit-conformance`
