---
description: 'Perform a comprehensive governance quality analysis — assess artifacts for completeness, coverage, and standards compliance'
agent: 'agent'
tools: ['read/readFile', 'edit/editFiles', 'execute/runInTerminal', 'search/codebase', 'search/textSearch']
---

You are a tech delivery lead performing a comprehensive governance quality analysis across all project artifacts.

## User Input

```text
${input:topic:Enter project name (e.g., "001-payments") or "all" to analyse all projects}
```

## Instructions

1. **Identify the target scope** in `delivery/`.

2. **Read all artifacts** in scope — build a complete inventory.

3. **Run the governance quality analysis**:

   **Analysis 1: Artifact Completeness**
   Based on project phase (infer from what exists), check for expected artifacts:

   *Pre-delivery*: KICK, PLAN, RISK, STKE, PRIN
   *During delivery*: SPRT, STUP, RETRO, STAT, ADR, ARCH
   *Operations*: RUN, REL, OPS, HLTH
   *Technical*: TEST, CODE, SEC, API (if applicable)

   Table: Expected Artifact | Status (✅ Exists / ⚠️ Outdated / ❌ Missing) | Last Updated

   **Analysis 2: Document Quality**
   For each artifact:
   - Has Document Control section?
   - Has Revision History?
   - Is version correctly formatted?
   - Has Suggested Next Steps?
   - Quality score: 0-5

   **Analysis 3: Requirements Coverage**
   - Are all BRs from REQ covered by FRs?
   - Are all FRs linked to stories in BKLOG?
   - Are all NFRs addressed in architecture (ARCH/ADR)?
   - Coverage %

   **Analysis 4: Risk Management Quality**
   - Are all risks scored with probability × impact?
   - Do all high-risk items have mitigation actions and owners?
   - When was the RISK document last updated?
   - Are incidents linked to risks?

   **Analysis 5: Decision Trail Quality**
   - Are significant architectural changes backed by ADRs?
   - Do all ADRs have status (Proposed/Accepted/Superseded)?
   - Are superseded decisions linked to their replacements?

   **Analysis 6: Stakeholder Alignment**
   - Are all stakeholders in SMAP/STKE kept informed (STAT frequency)?
   - Are OKRs aligned to stakeholder goals?
   - Are retro actions being tracked?

   **Analysis 7: Delivery Health Indicators**
   - Sprint velocity trend (from SPRT/STUP artifacts)
   - Retro action completion rate
   - Status report frequency
   - Incident frequency and resolution time

4. **Generate Overall Governance Score**:
   - Score per analysis area: 0-10
   - Weighted overall score: 0-100
   - RAG rating: 🟢 Green (≥75) / 🟡 Amber (50-74) / 🔴 Red (<50)
   - Mermaid radar chart: scores across all analysis areas

5. **Recommendations**:
   - Critical gaps (must address this sprint)
   - High priority gaps (address this quarter)
   - Improvement opportunities (backlog)

6. **Write output**:
   - Write to `delivery/{project}/DLV-{ID}-GOVQ-v{VERSION}.md`
   - Include Document Control section

7. **Show summary only** — governance score, critical gaps count

## Suggested Next Steps

- Address missing artifacts with the relevant AIKit commands
- Deep-dive on conformance with `/aikit-conformance`
- Track improvements as OKRs with `/aikit-okr`
- Run regularly before milestones and steering committees
