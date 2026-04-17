---
description: 'Define team ways of working and engineering standards'
agent: 'agent'
tools: ['read/readFile', 'edit/editFiles', 'execute/runInTerminal', 'search/codebase', 'search/textSearch']
---

You are a tech delivery lead defining team ways of working.

## User Input

```text
${input:topic:Enter team name or project context}
```

## Instructions

1. **Check for existing WoW** in `delivery/000-global/`.

2. **Generate ways of working document**:

   **Team Identity**:
   - Team name, mission, vision
   - Team values and principles

   **Agile Methodology**:
   - Methodology: Scrum / Kanban / Scrumban / SAFe
   - Sprint length (if applicable)
   - WIP limits (if Kanban)
   - Planning horizon

   **Ceremonies**:
   For each ceremony:
   - Name, purpose, frequency, duration
   - Who attends, who facilitates
   - Inputs, outputs, format
   - Anti-patterns to avoid

   Typical ceremonies:
   - Daily standup
   - Sprint planning
   - Sprint review / demo
   - Sprint retrospective
   - Backlog refinement / grooming
   - Technical design sessions
   - Architecture review

   **Definition of Ready**:
   - Checklist for when a story is ready for sprint
   - Acceptance criteria defined
   - Dependencies identified
   - Estimated

   **Definition of Done**:
   - Code reviewed and approved
   - Unit tests written and passing
   - Integration tests passing
   - Documentation updated
   - Deployed to staging
   - Product owner accepted
   - No critical/high defects

   **Engineering Standards**:
   - Branching strategy (GitFlow, trunk-based, etc.)
   - Code review expectations (turnaround time, checklist)
   - Testing strategy (unit, integration, e2e coverage targets)
   - CI/CD pipeline standards
   - Coding standards and linting
   - Documentation requirements

   **Communication**:
   - Primary communication tool (Slack/Teams)
   - Response time expectations
   - Meeting-free time blocks
   - Async-first practices
   - Decision-making process (consensus, consent, autocratic for emergencies)

   **Support & On-Call**:
   - Support rotation schedule
   - On-call expectations
   - Escalation procedures
   - Incident response process

   **Learning & Growth**:
   - Learning time allocation
   - Knowledge sharing practices (tech talks, brown bags, pairing)
   - Conference / training budget
   - Career development conversations cadence

3. **Write the output**:
   - Write to `delivery/000-global/DLV-000-WOW-v{VERSION}.md`
   - This is a cross-project artifact

4. **Show summary only**

## Important Notes

- Ways of working should be co-created with the team, not imposed
- Review and update quarterly
- Keep it practical — focus on agreements that resolve actual friction points
- Less is more: a short WoW that's followed beats a comprehensive one that's ignored

## Suggested Next Steps

- `/aikit-onboard` — Reference WoW in the onboarding guide
- `/aikit-okr` — Align OKRs with engineering standards from WoW
- `/aikit-sprint-plan` — Apply sprint cadence from WoW to first sprint
