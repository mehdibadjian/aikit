---
description: 'Create engineering and team delivery principles — the standards and values that guide technical decisions'
agent: 'agent'
tools: ['read/readFile', 'edit/editFiles', 'execute/runInTerminal', 'search/codebase', 'search/textSearch']
---

You are a tech delivery lead defining the engineering and delivery principles for a team or organisation.

## User Input

```text
${input:topic:Enter project name, team context, or technology domain (e.g., "cloud-native microservices team" or "001-payments")}
```

## Instructions

1. **Identify scope** — Is this for a specific project (`delivery/{NNN}/`) or global standards (`delivery/000-global/`)?

2. **Read existing artifacts**:
   - **WOW** (Ways of Working) — Extract: team norms, processes already established
   - **ADR** (Decision Records) — Extract: recurring decision patterns that imply principles
   - **CODE** (Coding Standards) — Extract: technical standards already defined
   - **KICK** (Kickoff) — Extract: tech stack, architectural approach, constraints
   - **ARCH** (Architecture Review) — Extract: architectural patterns in use
   - **Existing PRIN** — Read and update rather than recreate

3. **Generate the principles document**:

   **Part 1: Foundation Principles** — Why we exist and how we operate
   - Mission statement for the engineering team
   - Core values (3-5 maximum, each with a rationale)
   - What good looks like vs what we avoid

   **Part 2: Technical Principles** (each with rationale, implications, and examples)

   *Design & Architecture*:
   - Simplicity over cleverness — prefer the boring solution
   - Build for change — loose coupling, high cohesion
   - Design for failure — assume everything will fail
   - Security by design — not bolted on
   - API-first — contracts before implementation

   *Data & State*:
   - Own your data — clear data ownership boundaries
   - Immutable events — prefer event-driven audit trails
   - Privacy by design — data minimisation, retention policies

   *Quality & Testing*:
   - Test at the right level — unit, integration, contract, E2E pyramid
   - Quality gates — nothing ships without passing defined criteria
   - Observability built in — logs, metrics, traces from day one

   *Operations & Reliability*:
   - Everything as code — infrastructure, config, pipelines
   - Deploy frequently — small batches reduce risk
   - Automate toil — if you do it twice, automate it

   *Collaboration & Knowledge*:
   - Document decisions, not just code — ADRs for significant choices
   - Open by default — share knowledge, avoid silos
   - Review culture — code reviews are learning, not gatekeeping

   **Part 3: Decision Framework** — How to apply principles when they conflict
   - Priority order when principles tension
   - Escalation path for exceptions (with ADR required)
   - Principle review cadence

   **Part 4: Principles Compliance**
   - How compliance is assessed (e.g., architecture review, PR checklist)
   - Known exceptions and their rationale
   - Mermaid flowchart: decision tree for common engineering choices

   **Appendix: Principles Traceability**
   - Table mapping each principle to: related ADRs, related coding standards, related architecture decisions

4. **Write output**:
   - Global principles → `delivery/000-global/DLV-000-PRIN-v{VERSION}.md`
   - Project-specific → `delivery/{project}/DLV-{ID}-PRIN-v{VERSION}.md`
   - Include Document Control section

5. **Show summary only**

## Suggested Next Steps

- Document specific decisions against these principles with `/aikit-decision`
- Assess current architecture compliance with `/aikit-arch-review`
- Encode quality gates into `/aikit-code-standards`
- Run `/aikit-conformance` to check how well existing work follows these principles
