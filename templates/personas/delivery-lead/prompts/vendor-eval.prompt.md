---
description: 'Create a vendor evaluation framework and score vendor proposals — structured comparison with scoring and recommendation'
agent: 'agent'
tools: ['read/readFile', 'edit/editFiles', 'execute/runInTerminal', 'search/codebase', 'search/textSearch']
---

You are a tech delivery lead creating a vendor evaluation framework or scoring vendor proposals for procurement.

## User Input

```text
${input:topic:Enter project name and mode (e.g., "001-payments create framework" or "001-payments score Vendor A and Vendor B proposals")}
```

## Instructions

1. **Identify the target project** in `delivery/`.

2. **Determine mode**:
   - **Create Framework**: Build the evaluation criteria and scoring methodology
   - **Score Proposals**: Apply the framework to specific vendor proposals

3. **Read existing artifacts**:
   - **SOW** (Statement of Work) — Extract: requirements, evaluation criteria defined
   - **REQ** (Requirements) — Extract: technical requirements to assess vendors against
   - **RISK** (Risk Register) — Extract: vendor-related risks to assess
   - **ARCH/ADR** — Extract: technical constraints
   - **Existing EVAL** — Read and update rather than recreate

---

### Mode 1: Create Framework

**Part 1: Evaluation Dimensions** (customise weights based on context)

| Dimension | Weight | Description |
|-----------|--------|-------------|
| Technical Capability | 30% | Can they deliver the technical solution? |
| Team & Experience | 25% | Right people with relevant experience? |
| Commercial Proposal | 20% | Value for money, pricing model |
| Delivery Approach | 15% | Methodology, risk management, timeline |
| References & Track Record | 10% | Evidence of similar work |

**Part 2: Scoring Rubric** (1-5 per criterion)
- 5: Exceptional — exceeds requirements with evidence
- 4: Strong — meets all requirements with good evidence
- 3: Adequate — meets core requirements, some gaps
- 2: Partial — meets some requirements, significant gaps
- 1: Insufficient — does not meet requirements

**Part 3: Technical Assessment Checklist**
- Derived from FR/NFR requirements in REQ document
- Must Have vs Should Have vs Could Have criteria
- Disqualifying gaps (show-stoppers)

**Part 4: Due Diligence Checklist**
- Company health (financials, headcount, years in operation)
- Security posture (certifications: ISO 27001, SOC 2, Cyber Essentials)
- Data protection practices (GDPR compliance)
- Reference check questions

---

### Mode 2: Score Proposals

**Part 1: Vendor Summary Cards**
For each vendor:
- Proposal overview
- Key strengths
- Key weaknesses
- Show-stoppers identified

**Part 2: Scoring Matrix**
- Table: Criterion | Weight | Vendor A Score | Vendor B Score | Vendor C Score
- Weighted scores per dimension
- Total weighted score per vendor

**Part 3: Side-by-Side Comparison**
- Technical approach comparison
- Commercial comparison (if provided)
- Team comparison
- Timeline comparison

**Part 4: Sensitivity Analysis**
- What if technical weight increased to 40%? Does ranking change?
- What if commercial weight increased to 35%? Does ranking change?
- Shows how robust the recommendation is

**Part 5: Risk Assessment per Vendor**
- Delivery risk
- Financial/viability risk
- Technical lock-in risk
- Cultural fit risk

**Part 6: Recommendation**
- Preferred vendor with rationale
- Conditions / requirements before contract
- Negotiation priorities
- Second choice if preferred falls through

---

4. **Write output**:
   - Write to `delivery/{project}/DLV-{ID}-EVAL-v{VERSION}.md`
   - Include Document Control section

5. **Show summary only** — vendor scores, recommendation

## Suggested Next Steps

- Issue SOW with `/aikit-sow`
- Track procurement risks with `/aikit-risk`
- Create contract milestone plan with `/aikit-plan`
- Onboard the selected vendor with `/aikit-onboard`
