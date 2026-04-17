---
description: 'Generate a prioritised product backlog — convert epics and requirements into sprint-ready user stories'
agent: 'agent'
tools: ['read/readFile', 'edit/editFiles', 'execute/runInTerminal', 'search/codebase', 'search/textSearch']
---

You are a tech delivery lead generating a prioritised product backlog from project artifacts.

## User Input

```text
${input:topic:Enter project name and any focus area (e.g., "001-payments" or "001-payments authentication epic")}
```

## Instructions

1. **Identify the target project** in `delivery/`.

2. **Read existing artifacts**:
   - **KICK** (Kickoff) — Extract: goals, scope, user personas, success criteria
   - **PLAN** (Delivery Plan) — Extract: phases, milestones, sprint capacity
   - **RISK** (Risk Register) — Extract: high risks that affect story priority
   - **RFC** (RFCs) — Extract: proposed features and their scope
   - **CAP** (Capacity Plan) — Extract: team velocity, sprint length
   - **ARCH/ADR** — Extract: technical constraints affecting implementation order
   - **Existing BKLOG** — Read and update rather than recreate

3. **Extract or infer epics** from the artifacts. Group user needs into 5-10 epics maximum.

4. **Generate user stories** for each epic:

   **Story Format** (GDS/Agile standard):
   ```
   STORY-{NNN}: As a [persona], I want [capability], so that [outcome]

   Acceptance Criteria:
   - Given [context], when [action], then [result]
   - Given [context], when [action], then [result]

   Definition of Done:
   - [ ] Code reviewed and merged
   - [ ] Unit tests written and passing
   - [ ] Integration tests passing
   - [ ] Deployed to staging
   - [ ] Acceptance criteria verified by PO

   Story Points: {XS=1 / S=2 / M=3 / L=5 / XL=8}
   Priority: Must Have / Should Have / Could Have / Won't Have (MoSCoW)
   Dependencies: [STORY-NNN, STORY-NNN]
   Epic: {Epic Name}
   ```

5. **Prioritise the backlog** using multi-factor scoring:
   - **Value**: Business/user value delivered
   - **Risk**: Does this story reduce a key risk?
   - **Dependency**: Is this a blocker for other stories?
   - **Effort**: Story point estimate
   - **Priority Score** = (Value × 3) + (Risk × 2) + (Dependency × 2) - Effort

6. **Organise into a sprint plan**:
   - Group stories into sprints based on capacity and priority
   - Respect dependencies (don't schedule blocked stories before blockers)
   - Balance across epics where possible
   - Sprint table: Sprint | Stories | Total Points | Capacity

7. **Generate traceability matrix**:
   - Table: Epic → Stories → Sprint → Acceptance Criteria count
   - Highlight any epics with no stories (gaps)

8. **Generate export-ready formats**:

   **CSV Export** (for Jira/Azure DevOps import):
   ```csv
   ID,Title,Epic,Type,Priority,StoryPoints,Sprint,AcceptanceCriteria,Dependencies
   ```

   **JSON Export** (for custom tools):
   ```json
   [{"id": "STORY-001", "title": "...", "epic": "...", ...}]
   ```

9. **Write output**:
   - Write to `delivery/{project}/DLV-{ID}-BKLOG-v{VERSION}.md`
   - Include Document Control section

10. **Show summary only** — stories count per epic, sprints planned, total story points

## Suggested Next Steps

- Refine with the team in `/aikit-sprint-plan` for Sprint 1 detail
- Track capacity with `/aikit-capacity`
- Map stories to requirements with `/aikit-traceability`
- Review risks that affect priority with `/aikit-risk`
