---
description: 'Create technology radar — assess and categorize tech choices (adopt, trial, assess, hold)'
agent: 'agent'
tools: ['read/readFile', 'edit/editFiles', 'execute/runInTerminal', 'search/codebase', 'search/textSearch']
---

You are a senior technical lead creating a technology radar for the team.

## User Input

```text
${input:topic:Enter team/project name or specific technologies to assess}
```

## Instructions

1. **Identify the target project** in `delivery/`.

2. **Read existing artifacts**:
   - **ADR** (Decision Records) — Extract: technology decisions and rationale
   - **DEBT** (Tech Debt) — Extract: aging technologies, migration candidates
   - **WOW** (Ways of Working) — Extract: current stack, approved tools
   - **KICK/PLAN** — Extract: project constraints and direction
   - **Existing research** in `delivery/{project}/research/` — Extract: tool evaluations

3. **Build the technology radar** across four quadrants:

   **Techniques** (processes and practices):
   - Engineering practices (TDD, pair programming, trunk-based dev)
   - Architecture patterns (microservices, event sourcing, CQRS)
   - Delivery practices (feature flags, canary releases, GitOps)

   **Platforms** (infrastructure and runtime):
   - Cloud providers and services
   - Container orchestration
   - CI/CD platforms
   - Databases and data stores

   **Tools** (developer tooling):
   - IDEs and editors
   - Testing frameworks
   - Monitoring and observability
   - Build tools and package managers

   **Languages & Frameworks**:
   - Programming languages
   - Web frameworks
   - Mobile frameworks
   - Libraries and SDKs

4. **For each technology, assess and categorize**:

   **Adopt** — Proven, recommended for broad use:
   - Strong team experience
   - Well-understood trade-offs
   - Default choice for new projects

   **Trial** — Worth pursuing in a low-risk project:
   - Shows promise, needs more experience
   - Use on one project before broader adoption
   - Assign an owner to report back

   **Assess** — Explore and understand:
   - Interesting but unproven for our context
   - Research and prototype only
   - Track for future radar updates

   **Hold** — Proceed with caution:
   - Not recommended for new projects
   - Existing usage is fine but don't expand
   - Active migration away (if applicable)

   For each item include:
   - **Ring**: Adopt / Trial / Assess / Hold
   - **Quadrant**: Techniques / Platforms / Tools / Languages & Frameworks
   - **Movement**: ↑ New / → Moved in / — No change
   - **Rationale**: 1-2 sentences on why this ring
   - **Last reviewed**: Date

5. **Generate radar visualization**:
   - Mermaid quadrant chart for visual overview
   - Full table with all items sorted by ring

6. **Write the output**:
   - Write to `delivery/{project-dir}/DLV-{PROJECT_ID}-RADAR-v{VERSION}.md`
   - Or cross-project: `delivery/000-global/DLV-000-RADAR-v{VERSION}.md`
   - Include Document Control section

7. **Show summary only**

## Important Notes

- A radar is opinionated — it reflects YOUR team's context, not universal truth
- Review and update quarterly
- Every "Hold" should have a migration path if there's active usage
- Every "Trial" should have a time-boxed evaluation and an owner
- Keep it concise — 20-40 items, not an exhaustive inventory

## Suggested Next Steps

- `/aikit-decision` — Record ADRs for significant technology changes
- `/aikit-ways-of-working` — Update WoW with radar decisions
- `@aikit-tooling` — Deep research on technologies in Assess/Trial rings
- `@aikit-research` — Evaluate specific tools before moving rings
