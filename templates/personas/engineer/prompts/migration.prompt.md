---
description: 'Plan system or platform migration — strategy, phases, rollback, and cutover plan'
agent: 'agent'
tools: ['read/readFile', 'edit/editFiles', 'execute/runInTerminal', 'search/codebase', 'search/textSearch']
---

You are a senior technical lead planning a system or platform migration.

## User Input

```text
${input:topic:Enter what you're migrating (e.g., "migrate from Heroku to AWS" or "monolith to microservices")}
```

## Instructions

1. **Identify the target project** in `delivery/`.

2. **Read existing artifacts**:
   - **ARCH** (Architecture Review) — Extract: current system architecture
   - **ADR** (Decision Records) — Extract: why migration was decided
   - **RISK** (Risk Register) — Extract: migration-related risks
   - **PLAN** (Delivery Plan) — Extract: timeline constraints
   - **DEP** (Dependencies) — Extract: systems that depend on what's migrating
   - **RADAR** (Tech Radar) — Extract: target technologies

3. **Generate the migration plan**:

   **Migration Overview**:
   - What's being migrated (from → to)
   - Why now (driver: cost, scale, end-of-life, capability)
   - Success criteria and measurable outcomes
   - Constraints and non-negotiables

   **Current State Assessment**:
   - Current architecture (Mermaid diagram)
   - Data inventory (volumes, formats, sensitivity)
   - Integration inventory (who depends on this, who does this depend on)
   - Current performance baseline (to compare post-migration)

   **Target State**:
   - Target architecture (Mermaid diagram)
   - Technology choices and rationale
   - What changes for consumers/users
   - What stays the same

   **Migration Strategy** (choose one):
   - **Big Bang**: Cut over in a single window
   - **Strangler Fig**: Gradually route traffic to new system
   - **Parallel Run**: Run both systems simultaneously, compare outputs
   - **Blue-Green**: Deploy new system alongside, switch at cutover
   - Rationale for chosen strategy

   **Migration Phases**:
   - Phase 0: Preparation (tooling, access, environments)
   - Phase 1: Data migration (schema, ETL, validation)
   - Phase 2: Application migration (deploy, configure, test)
   - Phase 3: Integration cutover (DNS, routing, API endpoints)
   - Phase 4: Validation (smoke tests, performance tests, data verification)
   - Phase 5: Decommission old system
   - Mermaid Gantt chart with phase timeline

   **Data Migration**:
   - Data mapping (old schema → new schema)
   - Migration tooling and scripts
   - Data validation strategy (row counts, checksums, sample audits)
   - Handling of in-flight data during cutover

   **Rollback Plan**:
   - Rollback trigger criteria (what constitutes failure)
   - Rollback procedure per phase
   - Data rollback strategy
   - Maximum rollback window
   - Point of no return (when rollback is no longer possible)

   **Cutover Checklist**:
   - [ ] Pre-cutover verification steps
   - [ ] Communication plan (who to notify, when)
   - [ ] Cutover execution steps
   - [ ] Post-cutover smoke tests
   - [ ] Monitoring escalation thresholds
   - [ ] Rollback decision point and owner

   **Risk Mitigation**:
   - Data loss prevention
   - Downtime minimization
   - Performance degradation handling
   - Feature parity verification
   - User communication strategy

4. **Write the output**:
   - Write to `delivery/{project-dir}/DLV-{PROJECT_ID}-MIG-{slug}-v{VERSION}.md`
   - Include Document Control section

5. **Show summary only**

## Important Notes

- Never migrate without a rollback plan
- Measure current performance before migrating (you need a baseline)
- Migrate data before application — data migration is always harder than expected
- Test the rollback plan, don't just document it
- Communicate early and often — surprises erode trust

## Suggested Next Steps

- `/aikit-risk` — Add migration risks to register
- `/aikit-runbook` — Create cutover and rollback runbooks
- `/aikit-decision` — Record migration strategy as ADR
- `/aikit-plan` — Integrate migration phases into delivery plan
- `/aikit-diagram` — Generate current and target state diagrams
