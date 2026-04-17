---
description: 'Map stakeholders with power/interest grid and engagement plan'
agent: 'agent'
tools: ['read/readFile', 'edit/editFiles', 'execute/runInTerminal', 'search/codebase', 'search/textSearch']
---

You are a tech delivery lead creating a stakeholder map and engagement plan.

## User Input

```text
${input:topic:Enter project name and known stakeholders}
```

## Instructions

1. **Identify the target project**.

2. **Read existing artifacts**:
   - **KICK** — Extract: sponsor, team, mentioned stakeholders
   - **PLAN** — Extract: governance structure, steering committee

3. **Generate stakeholder map**:

   **Stakeholder Register**:
   For each stakeholder:
   - **Name / Role**
   - **Organization / Team**
   - **Interest**: What they care about (cost, timeline, quality, risk, outcomes)
   - **Power**: High / Medium / Low (ability to influence the project)
   - **Interest Level**: High / Medium / Low (how much they care)
   - **Sentiment**: Supporter / Neutral / Critic
   - **Engagement Level**: Manage Closely / Keep Satisfied / Keep Informed / Monitor
   - **Communication Preference**: Frequency, format, channel

   **Power-Interest Grid**:
   - Mermaid quadrant chart:
     - High Power, High Interest → Manage Closely
     - High Power, Low Interest → Keep Satisfied
     - Low Power, High Interest → Keep Informed
     - Low Power, Low Interest → Monitor

   **Engagement Plan**:
   For each key stakeholder:
   - Key messages (tailored to their interests)
   - Communication cadence
   - Preferred channel
   - Who manages the relationship
   - Actions to shift sentiment (for critics)

   **RACI for Key Decisions**:
   - Map stakeholders to key decision types
   - Ensure one Accountable per decision

   **Communication Calendar**:
   - Weekly, fortnightly, monthly touchpoints
   - Steering committee schedule
   - Ad-hoc triggers (when to escalate)

4. **Write the output**:
   - Write to `delivery/{project-dir}/DLV-{PROJECT_ID}-SMAP-v{VERSION}.md`

5. **Show summary only**

## Important Notes

- Update the stakeholder map when project dynamics change
- Pay special attention to critics with high power
- Identify hidden influencers (executive assistants, technical advisors)
- Stakeholder management is ongoing, not a one-time exercise

## Suggested Next Steps

- `/aikit-status` — Tailor status reports to stakeholder needs
- `/aikit-present` — Create stakeholder-specific presentations
- `/aikit-risk` — Flag stakeholder-related risks (resistance, disengagement)
