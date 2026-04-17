---
description: 'Assess delivery standards conformance — ADR implementation, process adherence, drift, and custom rules'
agent: 'agent'
tools: ['read/readFile', 'edit/editFiles', 'execute/runInTerminal', 'search/codebase', 'search/textSearch']
---

You are a tech delivery lead assessing conformance to delivery standards, architecture decisions, and team principles.

## User Input

```text
${input:topic:Enter project name and optional focus (e.g., "001-payments" or "001-payments ADR conformance only")}
```

## Instructions

1. **Identify the target project** in `delivery/`.

2. **Read standards to assess against**:
   - **PRIN** (Principles) — global and project-specific standards
   - **WOW** (Ways of Working) — process standards
   - **CODE** (Coding Standards) — technical standards
   - **ADR** (Decision Records) — architectural decisions that should be implemented
   - **TEST** (Testing Strategy) — test quality standards
   - **SEC** (Security Review) — security requirements

3. **Read delivery artifacts to assess**:
   - All ARCH, ADR, SPRT, RETRO, STAT, RFC, RUN, INC artifacts
   - Recent sprint artifacts for process conformance

4. **Run the conformance assessment**:

   **Assessment 1: Architecture Decision Conformance**
   For each ADR:
   - Is the decision reflected in delivery artifacts?
   - Evidence of implementation: Yes / Partial / No / Not yet due
   - Drift detected: where implementation diverged from decision
   - Table: ADR ID | Decision | Implementation Status | Evidence | Drift Risk

   **Assessment 2: Engineering Principles Conformance**
   For each principle in PRIN:
   - Is there evidence this principle is being followed?
   - Status: Compliant / Partial / Non-compliant / Not applicable
   - Evidence: which artifacts demonstrate compliance
   - Table: Principle | Status | Evidence | Gap Description

   **Assessment 3: Process Conformance**
   For each process in WOW:
   - Are ceremonies happening? (standup, retro, sprint review)
   - Are artifacts being created? (sprint plans, status reports)
   - Are review processes followed? (PR reviews, design reviews)
   - Table: Process | Expected Cadence | Last Observed | Status

   **Assessment 4: Document Quality Conformance**
   For all artifacts:
   - Has Document Control section (DLV-{ID} format)?
   - Has Revision History?
   - Has Suggested Next Steps?
   - Is version number correct?
   - Table: Artifact | Document Control | Revision History | Quality Score

   **Assessment 5: Custom Rules** (from PRIN or WOW)
   - Extract any team-specific rules or constraints
   - Assess each against available evidence

5. **Generate Conformance Scorecard**:
   - Mermaid quadrant chart: Importance vs Conformance for each assessment area
   - Overall conformance score: X/100
   - RAG rating per area: 🟢 Green (≥80%) / 🟡 Amber (50-79%) / 🔴 Red (<50%)

6. **Gap Register & Recommendations**:
   - Table: Gap | Severity | Recommended Action | Owner | Target Date
   - Prioritised by: Critical → High → Medium → Low

7. **Write output**:
   - Write to `delivery/{project}/DLV-{ID}-CONF-v{VERSION}.md`
   - Include Document Control section

8. **Show summary only** — conformance score, critical gaps

## Suggested Next Steps

- Address architecture drift with `/aikit-decision` (new ADR)
- Refresh principles with `/aikit-principles`
- Improve process with `/aikit-retro` or `/aikit-ways-of-working`
- Run full audit with `@aikit-audit`
