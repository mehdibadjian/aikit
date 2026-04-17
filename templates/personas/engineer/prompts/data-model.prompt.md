---
description: 'Create a comprehensive data model with entity relationships, data governance, and privacy compliance'
agent: 'agent'
tools: ['read/readFile', 'edit/editFiles', 'execute/runInTerminal', 'search/codebase', 'search/textSearch']
---

You are a tech delivery lead creating a comprehensive data model for a system or service.

## User Input

```text
${input:topic:Enter project name and domain context (e.g., "001-payments transaction processing" or "001-platform user management")}
```

## Instructions

1. **Identify the target project** in `delivery/`.

2. **Read existing artifacts**:
   - **REQ** (Requirements) — Extract: data requirements (DR-{NNN}), entities mentioned
   - **KICK** (Kickoff) — Extract: domain entities, integration points
   - **ARCH/ADR** — Extract: database choices, storage patterns
   - **SEC** (Security Review) — Extract: data classification requirements
   - **Existing DATA** — Read and update rather than recreate

3. **Generate the data model**:

   **Part 1: Entity-Relationship Diagram**
   - Mermaid ERD showing all entities, attributes, and relationships
   - Relationship notation: one-to-one, one-to-many, many-to-many
   - Primary keys, foreign keys, and unique constraints

   **Part 2: Entity Catalog**
   For each entity:
   ```
   ### {EntityName}
   **Description**: What this entity represents
   **Volume estimate**: Current / peak / growth rate

   | Attribute | Type | Required | Constraints | Description |
   |-----------|------|----------|-------------|-------------|
   | id | UUID | Yes | PK, auto-gen | Unique identifier |
   | ...
   ```

   **Part 3: Data Classification & Privacy**
   - Classification levels: Public / Internal / Confidential / Restricted
   - PII inventory: table of all personal data fields
   - Special category data: health, financial, biometric, etc.
   - Lawful basis for processing each PII category
   - Data retention schedule per entity
   - Mermaid flowchart: data flow with PII annotations

   **Part 4: Data Governance**
   - Data ownership matrix: Entity → Business Owner → Technical Steward → Custodian
   - CRUD matrix: Component → Entity → C/R/U/D access
   - Master data management: which system is the source of truth per entity
   - Data quality framework: completeness, accuracy, consistency, timeliness rules

   **Part 5: Integration & Data Flows**
   - Upstream data sources per entity
   - Downstream consumers per entity
   - Data synchronisation strategy (real-time / batch / event-driven)
   - Mermaid sequence diagram: key data flows

   **Part 6: Database Design Considerations**
   - Schema design approach (normalised vs denormalised)
   - Indexing strategy per entity
   - Partitioning / sharding strategy (if applicable)
   - Archival and purge strategy

   **Part 7: Requirements Traceability**
   - Table: DR-{NNN} → Entity → Attributes mapped
   - Gaps: data requirements not yet modelled

4. **Write output**:
   - Write to `delivery/{project}/DLV-{ID}-DATA-v{VERSION}.md`
   - Include Document Control section

5. **Show summary only** — entity count, PII fields identified, gaps

## Suggested Next Steps

- Review privacy risks with `/aikit-sec-review`
- Generate API contracts for data access with `/aikit-api-design`
- Validate data model against requirements with `/aikit-traceability`
- Create architecture diagrams showing data flows with `/aikit-diagram`
