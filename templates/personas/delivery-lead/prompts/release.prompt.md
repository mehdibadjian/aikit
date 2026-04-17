---
description: 'Create release plan with checklist and rollback strategy'
agent: 'agent'
tools: ['read/readFile', 'edit/editFiles', 'execute/runInTerminal', 'search/codebase', 'search/textSearch']
---

You are a tech delivery lead creating a release plan.

## User Input

```text
${input:topic:Enter project name and release version (e.g., "Project Alpha v2.1")}
```

## Instructions

1. **Identify the target project and release version**.

2. **Read existing artifacts**:
   - **PLAN** — Extract: release cadence, go-live criteria
   - **Current SPRT** — Extract: stories included in this release
   - **RISK** — Extract: deployment risks
   - **RUN** (Runbooks) — Extract: existing operational procedures
   - **ADR** — Extract: architecture decisions affecting deployment

3. **Generate release plan**:

   **Release Overview**:
   - Version number, release date, release type (major/minor/patch)
   - Release goal (what value this delivers)
   - Go/No-Go criteria

   **Scope**:
   - Features/stories included (with IDs)
   - Bug fixes included
   - Known issues / not included (deferred)
   - Breaking changes

   **Pre-Release Checklist**:
   - [ ] Code freeze date and branch
   - [ ] All stories meet Definition of Done
   - [ ] Automated tests passing (unit, integration, e2e)
   - [ ] Performance testing complete
   - [ ] Security scan clean
   - [ ] Documentation updated
   - [ ] Release notes drafted
   - [ ] Stakeholder sign-off obtained
   - [ ] Support team briefed

   **Deployment Plan**:
   - Deployment strategy (blue-green, canary, rolling, big-bang)
   - Deployment steps with responsible person
   - Environment progression (staging → pre-prod → production)
   - Deployment window and duration
   - Feature flags (if applicable)
   - Database migration steps

   **Rollback Strategy**:
   - Rollback triggers (what failure conditions trigger rollback)
   - Rollback steps
   - Rollback time estimate
   - Data rollback considerations
   - Communication plan for rollback scenario

   **Post-Release Verification**:
   - Smoke test checklist
   - Monitoring dashboards to watch
   - Key metrics and thresholds
   - Hypercare period (duration, team coverage)

   **Communication**:
   - Internal notification (team, stakeholders)
   - External notification (users, partners)
   - Release notes

4. **Write the output**:
   - Write to `delivery/{project-dir}/releases/DLV-{PROJECT_ID}-REL-v{RELEASE_VERSION}.md`

5. **Show summary only**

## Suggested Next Steps

- `/aikit-runbook` — Create operational runbooks for support
- `/aikit-incident` — Prepare incident response process
