# AIKit Delivery Workflow Skill

This skill provides the AIKit command system, workflow phases, and when to use each command. Load this skill when generating AIKit commands, planning delivery workflows, or advising on which commands to use in sequence.

## AIKit Command Workflow

AIKit follows a structured delivery lifecycle. Commands build on each other — earlier commands produce artifacts that later commands consume.

```mermaid
flowchart TD
    A[/aikit-start\nOrientation] --> B[/aikit-kickoff\nProject Charter]
    B --> C[/aikit-stakeholders\nStakeholder Analysis]
    B --> D[/aikit-risk\nRisk Register]
    C --> E[/aikit-requirements\nRequirements]
    D --> E
    E --> F[/aikit-data-model\nData Model]
    E --> G[/aikit-arch-review\nArchitecture]
    G --> H[/aikit-decision\nADR]
    H --> I[/aikit-diagram\nDiagrams]
    E --> J[/aikit-backlog\nProduct Backlog]
    J --> K[/aikit-sprint-plan\nSprint Planning]
    K --> L[/aikit-standup\nStandup]
    K --> M[/aikit-retro\nRetrospective]
    L --> N[/aikit-status\nStatus Report]
    J --> O[/aikit-release\nRelease Plan]
    O --> P[/aikit-operationalize\nOps Readiness]
    P --> Q[/aikit-runbook\nRunbooks]
```

## Command → Document Type Mapping

| Command | Doc Type Code | Output Location |
|---------|--------------|-----------------|
| `/aikit-kickoff` | KICK | `delivery/{NNN}/` |
| `/aikit-plan` | PLAN | `delivery/{NNN}/` |
| `/aikit-principles` | PRIN | `delivery/000-global/` or `{NNN}/` |
| `/aikit-stakeholders` | STKE | `delivery/{NNN}/` |
| `/aikit-risk` | RISK | `delivery/{NNN}/` |
| `/aikit-requirements` | REQ | `delivery/{NNN}/` |
| `/aikit-data-model` | DATA | `delivery/{NNN}/` |
| `/aikit-decision` | ADR | `delivery/{NNN}/` |
| `/aikit-arch-review` | ARCH | `delivery/{NNN}/` |
| `/aikit-diagram` | DIAG | `delivery/{NNN}/` |
| `/aikit-tech-radar` | RADAR | `delivery/000-global/` |
| `/aikit-sec-review` | SEC | `delivery/{NNN}/` |
| `/aikit-api-design` | API | `delivery/{NNN}/` |
| `/aikit-testing-strategy` | TEST | `delivery/{NNN}/` |
| `/aikit-migration` | MIG | `delivery/{NNN}/` |
| `/aikit-code-standards` | CODE | `delivery/000-global/` or `{NNN}/` |
| `/aikit-techdebt` | DEBT | `delivery/{NNN}/` |
| `/aikit-devops` | DEVOPS | `delivery/{NNN}/` |
| `/aikit-finops` | FINOPS | `delivery/{NNN}/` |
| `/aikit-backlog` | BKLOG | `delivery/{NNN}/` |
| `/aikit-roadmap` | ROAD | `delivery/{NNN}/` |
| `/aikit-strategy` | STRAT | `delivery/{NNN}/` |
| `/aikit-sprint-plan` | SPRT | `delivery/{NNN}/sprints/` |
| `/aikit-standup` | STUP | `delivery/{NNN}/sprints/` |
| `/aikit-retro` | RETRO | `delivery/{NNN}/` |
| `/aikit-status` | STAT | `delivery/{NNN}/` |
| `/aikit-release` | REL | `delivery/{NNN}/releases/` |
| `/aikit-operationalize` | OPS | `delivery/{NNN}/` |
| `/aikit-runbook` | RUN | `delivery/{NNN}/` |
| `/aikit-incident` | INC | `delivery/{NNN}/` |
| `/aikit-dependency` | DEP | `delivery/{NNN}/` |
| `/aikit-capacity` | CAP | `delivery/{NNN}/` |
| `/aikit-onboard` | ONBD | `delivery/{NNN}/` |
| `/aikit-handover` | HAND | `delivery/{NNN}/` |
| `/aikit-ways-of-working` | WOW | `delivery/000-global/` |
| `/aikit-okr` | OKR | `delivery/000-global/` |
| `/aikit-stakeholder-map` | SMAP | `delivery/{NNN}/` |
| `/aikit-health` | HLTH | `delivery/{NNN}/` |
| `/aikit-rfc` | RFC | `delivery/{NNN}/` |
| `/aikit-traceability` | TRACE | `delivery/{NNN}/` |
| `/aikit-conformance` | CONF | `delivery/{NNN}/` |
| `/aikit-maturity-model` | MAT | `delivery/000-global/` or `{NNN}/` |
| `/aikit-analyze` | GOVQ | `delivery/{NNN}/` |
| `/aikit-story` | STORY | `delivery/{NNN}/` |
| `/aikit-glossary` | GLOS | `delivery/{NNN}/` |
| `/aikit-sow` | SOW | `delivery/{NNN}/` |
| `/aikit-vendor-eval` | EVAL | `delivery/{NNN}/` |
| `/aikit-present` | PRES | `delivery/{NNN}/` |

## Artifact Dependency Rules

When generating any artifact, always read these if they exist:
- **KICK** → consumed by almost everything
- **PLAN** → consumed by sprint, release, status, capacity
- **RISK** → consumed by plan, sprint-plan, status, arch, sec
- **ADR** → consumed by arch, diagram, traceability, conformance
- **WOW** → consumed by onboard, retro, sprint-plan

## Document Versioning

- Start at `v1.0`
- Increment minor (`v1.1`) for content updates
- Increment major (`v2.0`) for complete rewrites
- Always increment if a previous version exists — never overwrite

## Quality Gates

Every generated artifact MUST have:
1. Document Control table at the top
2. Revision History table
3. Mermaid diagram(s) where applicable
4. `## Suggested Next Steps` section at the end
5. File written to correct `delivery/` path

## Naming Conventions

- Files: `DLV-{NNN}-{TYPE}-v{VERSION}.md` (e.g., `DLV-001-PLAN-v1.0.md`)
- Sprint artifacts: `DLV-{NNN}-SPRT-S{NN}-v{VERSION}.md`
- Standup: `DLV-{NNN}-STUP-S{NN}-D{NN}-v{VERSION}.md`
- Release: `DLV-{NNN}-REL-R{N.N}-v{VERSION}.md`
