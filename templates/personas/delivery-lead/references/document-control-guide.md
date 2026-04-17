# AIKit Document Control Guide

## Document ID Format

Every AIKit artifact uses this ID format:

```
DLV-{PROJECT_ID}-{TYPE_CODE}-v{VERSION}
```

**Examples**:
- `DLV-001-PLAN-v1.0` — Delivery Plan for project 001
- `DLV-000-WOW-v2.1` — Ways of Working (global), version 2.1
- `DLV-003-RISK-v1.3` — Risk Register for project 003, third update

## Project ID Assignment

- `000` — Global / cross-project artifacts (WoW, OKRs, Principles, Tech Radar)
- `001` to `999` — Individual project directories, sequentially numbered
- Match to `delivery/{NNN}-{project-name}/` directory

## Document Type Codes

### Delivery
| Code | Type | Location |
|------|------|----------|
| KICK | Project Kickoff / Charter | `delivery/{NNN}/` |
| PLAN | Delivery Plan | `delivery/{NNN}/` |
| SPRT | Sprint Plan | `delivery/{NNN}/sprints/` |
| STUP | Standup Summary | `delivery/{NNN}/sprints/` |
| RETRO | Retrospective | `delivery/{NNN}/` |
| RISK | Risk & Issue Register | `delivery/{NNN}/` |
| STAT | Status Report | `delivery/{NNN}/` |
| REL | Release Plan | `delivery/{NNN}/releases/` |
| ONBD | Onboarding Guide | `delivery/{NNN}/` |
| HAND | Handover Pack | `delivery/{NNN}/` |
| INC | Incident Report | `delivery/{NNN}/` |
| DEP | Dependency Map | `delivery/{NNN}/` |
| CAP | Capacity Plan | `delivery/{NNN}/` |
| RUN | Runbook | `delivery/{NNN}/` |
| RFC | Request for Comments | `delivery/{NNN}/` |
| WOW | Ways of Working | `delivery/000-global/` |
| OKR | OKR Tracker | `delivery/000-global/` |
| SMAP | Stakeholder Map | `delivery/{NNN}/` |
| STKE | Stakeholder Analysis | `delivery/{NNN}/` |
| PRES | Presentation | `delivery/{NNN}/` |
| HLTH | Health Check | `delivery/{NNN}/` |
| BKLOG | Product Backlog | `delivery/{NNN}/` |
| ROAD | Strategic Roadmap | `delivery/{NNN}/` |
| OPS | Operational Readiness | `delivery/{NNN}/` |
| STORY | Project Story | `delivery/{NNN}/` |
| GLOS | Glossary | `delivery/{NNN}/` |
| SOW | Statement of Work / RFP | `delivery/{NNN}/` |
| EVAL | Vendor Evaluation | `delivery/{NNN}/` |
| STRAT | Strategy Synthesis | `delivery/{NNN}/` |
| FRMK | Delivery Framework | `delivery/000-global/` |

### Technical
| Code | Type | Location |
|------|------|----------|
| ADR | Architecture Decision Record | `delivery/{NNN}/` |
| ARCH | Architecture Review | `delivery/{NNN}/` |
| DIAG | Architecture Diagram | `delivery/{NNN}/` |
| RADAR | Technology Radar | `delivery/000-global/` |
| TEST | Testing Strategy | `delivery/{NNN}/` |
| API | API Design / Review | `delivery/{NNN}/` |
| SEC | Security Review | `delivery/{NNN}/` |
| MIG | Migration Plan | `delivery/{NNN}/` |
| CODE | Coding Standards | `delivery/000-global/` or `{NNN}/` |
| DEBT | Tech Debt Register | `delivery/{NNN}/` |
| DEVOPS | DevOps Strategy | `delivery/{NNN}/` |
| FINOPS | FinOps Strategy | `delivery/{NNN}/` |
| DATA | Data Model | `delivery/{NNN}/` |
| REQ | Requirements | `delivery/{NNN}/` |

### Quality & Governance
| Code | Type | Location |
|------|------|----------|
| PRIN | Engineering Principles | `delivery/000-global/` or `{NNN}/` |
| TRACE | Traceability Matrix | `delivery/{NNN}/` |
| CONF | Conformance Assessment | `delivery/{NNN}/` |
| MAT | Maturity Model | `delivery/000-global/` or `{NNN}/` |
| GOVQ | Governance Quality Analysis | `delivery/{NNN}/` |

## Versioning Rules

- **v1.0** — Initial creation
- **v1.1** — Minor update (content additions, corrections)
- **v1.2, v1.3...** — Further minor updates
- **v2.0** — Major revision (significant restructure or scope change)
- Never overwrite a previous version — always increment

## Special Filename Patterns

| Artifact | Filename Pattern | Example |
|----------|-----------------|---------|
| Sprint Plan | `DLV-{NNN}-SPRT-S{NN}-v{VER}.md` | `DLV-001-SPRT-S03-v1.0.md` |
| Standup | `DLV-{NNN}-STUP-S{NN}-D{NN}-v{VER}.md` | `DLV-001-STUP-S03-D02-v1.0.md` |
| Release | `DLV-{NNN}-REL-R{N.N}-v{VER}.md` | `DLV-001-REL-R1.0-v1.0.md` |

## Document Status Values

| Status | Meaning |
|--------|---------|
| `DRAFT` | Being developed, not yet reviewed |
| `REVIEW` | Submitted for review |
| `APPROVED` | Reviewed and accepted |
| `SUPERSEDED` | Replaced by a newer version |
| `ARCHIVED` | No longer active |

## Item ID Conventions

Within documents, individual items use these ID patterns:

| Item Type | ID Format | Example |
|-----------|-----------|---------|
| Risk | `RISK-{NNN}` | `RISK-001` |
| Issue | `ISSUE-{NNN}` | `ISSUE-003` |
| Architecture Decision | `ADR-{NNN}` | `ADR-007` |
| User Story | `STORY-{NNN}` | `STORY-042` |
| Business Requirement | `BR-{NNN}` | `BR-012` |
| Functional Requirement | `FR-{NNN}` | `FR-034` |
| Non-Functional Req | `NFR-{NNN}` | `NFR-005` |
| Integration Req | `INT-{NNN}` | `INT-002` |
| Data Requirement | `DR-{NNN}` | `DR-008` |
| Goal | `GOAL-{NNN}` | `GOAL-003` |
| Initiative | `INIT-{NNN}` | `INIT-007` |
| Action Item | `ACTION-{NNN}` | `ACTION-015` |

IDs should be sequential and unique within a project.
