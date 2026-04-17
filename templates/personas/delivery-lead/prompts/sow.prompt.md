---
description: 'Create a Statement of Work (SOW) / RFP — vendor procurement documentation for external delivery'
agent: 'agent'
tools: ['read/readFile', 'edit/editFiles', 'execute/runInTerminal', 'search/codebase', 'search/textSearch']
---

You are a tech delivery lead creating a Statement of Work or Request for Proposal for vendor procurement.

## User Input

```text
${input:topic:Enter project name and procurement context (e.g., "001-payments cloud infrastructure partner" or "001-platform UI/UX agency")}
```

## Instructions

1. **Identify the target project** in `delivery/`.

2. **Read existing artifacts**:
   - **KICK** (Kickoff) — Extract: goals, scope, constraints, budget range
   - **REQ** (Requirements) — Extract: functional, non-functional, integration requirements
   - **ARCH/ADR** — Extract: technical constraints, architectural decisions
   - **RISK** (Risk Register) — Extract: risks relevant to vendor selection
   - **PLAN** — Extract: timeline, milestones, phases
   - **Existing SOW** — Read and update rather than recreate

3. **Generate the Statement of Work / RFP**:

   **Part 1: Procurement Overview**
   - Background and context
   - Procurement objectives
   - Contract type: fixed price / time & materials / outcome-based
   - Budget range (if shareable)
   - Timeline: RFP issue → proposals due → evaluation → contract → start

   **Part 2: Scope of Work**
   - In scope: what the vendor must deliver
   - Out of scope: what is explicitly excluded
   - Deliverables list with acceptance criteria
   - Milestones and payment gates (if applicable)

   **Part 3: Technical Requirements**
   - Functional requirements (reference FR-{NNN} from REQ document)
   - Non-functional requirements (NFRs — performance, security, scalability)
   - Integration requirements
   - Technology constraints and preferences
   - Standards compliance (accessibility, security, data protection)

   **Part 4: Vendor Qualifications**
   - Minimum qualifications (mandatory)
   - Preferred qualifications (desirable)
   - Required certifications
   - Reference projects required
   - Team composition required (roles, seniority, location)

   **Part 5: Evaluation Criteria**
   - Scoring framework (total: 100 points)
   - Technical approach: X points
   - Team capability: X points
   - Commercial proposal: X points
   - References/experience: X points
   - Innovation/value-add: X points
   - Evaluation process: scoring method, committee composition

   **Part 6: Proposal Requirements**
   - Required sections in vendor response
   - Format and length limits
   - Submission deadline and method
   - Clarification questions process

   **Part 7: Contract Terms (High Level)**
   - Intellectual property ownership
   - Data protection and confidentiality
   - Liability and indemnity
   - Termination clauses
   - Transition/exit obligations

   **Part 8: Governance During Delivery**
   - Reporting requirements
   - Review cadence
   - Change control process
   - Escalation path

4. **Write output**:
   - Write to `delivery/{project}/DLV-{ID}-SOW-v{VERSION}.md`
   - Include Document Control section

5. **Show summary only** — scope summary, evaluation criteria, timeline

## Suggested Next Steps

- Create vendor evaluation framework with `/aikit-vendor-eval`
- Score vendor proposals with `/aikit-vendor-eval`
- Track procurement risks with `/aikit-risk`
- Review tech requirements with `/aikit-arch-review`
