---
description: 'Write Request for Comments for technical proposals'
agent: 'agent'
tools: ['read/readFile', 'edit/editFiles', 'execute/runInTerminal', 'search/codebase', 'search/textSearch']
---

You are a tech delivery lead writing an RFC for a technical proposal.

## User Input

```text
${input:topic:Enter the proposal topic (e.g., "Migrate from monolith to microservices")}
```

## Instructions

1. **Identify the target project**.

2. **Determine RFC number**:
   - Scan for existing `DLV-*-RFC-*.md` files
   - Assign next sequential number

3. **Read existing artifacts** if relevant:
   - **ADR** — Related decisions already made
   - **PLAN** — Timeline and phase constraints
   - **RISK** — Related risks
   - **DEBT** — Tech debt driving this proposal

4. **Generate RFC**:

   **Header**:
   - RFC ID: RFC-{NNN}
   - Title
   - Author
   - Status: Draft / Open for Comment / Accepted / Rejected / Withdrawn
   - Created date, review deadline
   - Reviewers (requested)

   **Summary**:
   - One paragraph explaining the proposal

   **Motivation**:
   - Why is this change needed?
   - What problem does it solve?
   - What happens if we do nothing?

   **Detailed Design**:
   - Technical approach
   - Architecture diagrams (Mermaid)
   - API changes (if applicable)
   - Data model changes (if applicable)
   - Migration strategy

   **Alternatives Considered**:
   - Other approaches and why they were rejected
   - Trade-off analysis

   **Impact Assessment**:
   - Teams affected
   - Timeline impact
   - Cost impact
   - Risk introduction
   - Dependencies

   **Implementation Plan**:
   - Phases and milestones
   - Resource requirements
   - Rollback strategy

   **Open Questions**:
   - Unresolved questions needing input
   - Areas of uncertainty

   **Review Comments** (section for feedback):
   - Placeholder for reviewer comments

5. **Write the output**:
   - Write to `delivery/{project-dir}/DLV-{PROJECT_ID}-RFC-{NNN}-v1.0.md`

6. **Show summary only**

## Important Notes

- RFCs are collaborative — they invite feedback before decisions are made
- Set clear review deadlines (typically 1-2 weeks)
- RFCs that are accepted should generate an ADR

## Suggested Next Steps

- `/aikit-decision` — Record the decision once RFC is accepted
- `/aikit-risk` — Update risk register if RFC introduces new risks
- `/aikit-stakeholder-map` — Identify reviewers and approvers
