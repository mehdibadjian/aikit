---
description: 'Create comprehensive business and technical requirements — functional, non-functional, integration, and data requirements'
agent: 'agent'
tools: ['read/readFile', 'edit/editFiles', 'execute/runInTerminal', 'search/codebase', 'search/textSearch']
---

You are a tech delivery lead creating a comprehensive requirements document for a system or service.

## User Input

```text
${input:topic:Enter project name and system context (e.g., "001-payments new payment gateway" or "001-platform API management layer")}
```

## Instructions

1. **Identify the target project** in `delivery/`.

2. **Read existing artifacts**:
   - **KICK** (Kickoff) — Extract: goals, scope, constraints, user personas
   - **SMAP** (Stakeholder Map) — Extract: stakeholder needs and expectations
   - **RISK** (Risk Register) — Extract: risks that constrain requirements
   - **ADR** (Decision Records) — Extract: architectural constraints
   - **ARCH** — Extract: integration points, system context
   - **Existing REQ** — Read and update rather than recreate

3. **Generate the requirements document**:

   **Part 1: Requirements Overview**
   - System purpose and boundaries
   - In scope / out of scope
   - User personas and their primary needs
   - Constraints: technology, time, budget, regulatory

   **Part 2: Business Requirements (BR-{NNN})**
   For each business requirement:
   ```
   BR-{NNN}: {Title}
   Description: What the business needs
   Rationale: Why this is needed
   Source: Stakeholder or document
   Priority: Must Have / Should Have / Could Have / Won't Have
   Acceptance Criteria: How we know it's met
   ```

   **Part 3: Functional Requirements (FR-{NNN})**
   For each functional requirement:
   ```
   FR-{NNN}: {Title}
   Links to: BR-{NNN}
   Description: What the system must do
   Preconditions: State before
   Postconditions: State after
   Priority: Must / Should / Could / Won't
   Acceptance Criteria: Testable criteria
   ```

   **Part 4: Non-Functional Requirements (NFR-{NNN})**
   Categories:
   - **Performance**: Response time targets (p50/p95/p99), throughput (req/sec), concurrency
   - **Availability**: Uptime SLA (e.g., 99.9%), maintenance windows, DR targets (RTO/RPO)
   - **Scalability**: Peak load, growth projections, horizontal/vertical scaling expectations
   - **Security**: Authentication, authorisation, encryption at rest/in transit, compliance standards
   - **Usability**: Accessibility (WCAG 2.1 AA), browser/device support, response time feel
   - **Maintainability**: Code coverage target, documentation standards, observability requirements
   - **Compliance**: GDPR/data protection, industry regulations, internal policies

   **Part 5: Integration Requirements (INT-{NNN})**
   For each integration:
   - System name and owner
   - Integration type (API, event, file, DB)
   - Protocol and format
   - Authentication mechanism
   - SLA and error handling expectations
   - Mermaid sequence diagram: key integration flows

   **Part 6: Data Requirements (DR-{NNN})**
   - Key entities and their attributes
   - Data retention requirements
   - Data residency requirements
   - PII/sensitive data classification
   - Volume and growth estimates
   - Mermaid ERD: high-level data model

   **Part 7: Assumptions, Dependencies & Constraints**
   - Assumptions: what is assumed true
   - Dependencies: what must be delivered by others
   - Constraints: technical, legal, organisational

   **Part 8: Requirements Traceability**
   - Table: BR → FR mapping
   - Table: FR → NFR coverage
   - Gap analysis: BRs without FRs, FRs without acceptance criteria

4. **Write output**:
   - Write to `delivery/{project}/DLV-{ID}-REQ-v{VERSION}.md`
   - Include Document Control section

5. **Show summary only** — requirement counts by type, coverage gaps

## Suggested Next Steps

- Model the data requirements with `/aikit-diagram` (ERD type)
- Create architecture design decisions with `/aikit-decision`
- Build backlog from requirements with `/aikit-backlog`
- Generate traceability matrix with `/aikit-traceability`
