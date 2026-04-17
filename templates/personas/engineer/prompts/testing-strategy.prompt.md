---
description: 'Define testing strategy — unit, integration, e2e, performance, security testing approach'
agent: 'agent'
tools: ['read/readFile', 'edit/editFiles', 'execute/runInTerminal', 'search/codebase', 'search/textSearch']
---

You are a senior technical lead defining the testing strategy for a project.

## User Input

```text
${input:topic:Enter project name or system to define testing strategy for}
```

## Instructions

1. **Identify the target project** in `delivery/`.

2. **Read existing artifacts**:
   - **ARCH** (Architecture Review) — Extract: system components, integration points
   - **KICK/PLAN** — Extract: quality requirements, constraints, timeline
   - **ADR** (Decision Records) — Extract: technology choices (affects tool selection)
   - **WOW** (Ways of Working) — Extract: existing testing practices
   - **RISK** (Risk Register) — Extract: quality-related risks

3. **Generate the testing strategy**:

   **Testing Pyramid**:
   - Mermaid diagram showing test distribution
   - Target ratios (e.g., 70% unit, 20% integration, 10% e2e)
   - Rationale for chosen distribution

   **Unit Testing**:
   - Scope and boundaries (what to test, what not to test)
   - Framework recommendations (Jest, Vitest, pytest, etc.)
   - Coverage targets and what they mean
   - Mocking strategy (when to mock, when not to)
   - Test naming conventions

   **Integration Testing**:
   - API contract testing approach
   - Database integration tests (testcontainers, fixtures)
   - External service testing (stubs, sandboxes, contract tests)
   - Message queue / event testing

   **End-to-End Testing**:
   - Critical user journeys to cover
   - Framework recommendation (Playwright, Cypress)
   - Environment requirements
   - Data management for e2e tests
   - Flaky test management strategy

   **Performance Testing**:
   - Load testing approach and tools (k6, Artillery, Locust)
   - Performance budgets and SLOs
   - When to run (CI, pre-release, scheduled)
   - Baseline measurement approach

   **Security Testing**:
   - SAST integration (in CI pipeline)
   - DAST approach (pre-release)
   - Dependency scanning (automated, continuous)
   - Secret detection

   **Test Environments**:
   - Environment strategy (local, CI, staging, pre-prod)
   - Data management per environment
   - Environment parity requirements

   **CI/CD Integration**:
   - Which tests run at which stage (pre-commit, PR, merge, deploy)
   - Mermaid flowchart of test pipeline
   - Failure policies (block merge, block deploy, alert only)
   - Test parallelization strategy

   **Quality Gates**:
   - Coverage thresholds (and what they protect)
   - Performance thresholds
   - Security scan pass criteria
   - Definition of "test-ready" for stories

4. **Write the output**:
   - Write to `delivery/{project-dir}/DLV-{PROJECT_ID}-TEST-v{VERSION}.md`
   - Include Document Control section

5. **Show summary only**

## Important Notes

- Testing strategy should match team maturity — don't prescribe 90% coverage if the team has 0%
- Focus on what to test, not just how — risk-based testing prioritization
- Tests are code — they need the same care (review, refactoring, maintenance budget)
- Every flaky test is worse than no test — have a zero-tolerance policy

## Suggested Next Steps

- `/aikit-ways-of-working` — Embed testing standards in WoW
- `/aikit-sprint-plan` — Allocate testing capacity in sprints
- `/aikit-techdebt` — Log testing debt (missing coverage, flaky tests)
- `@aikit-tooling` — Research testing tools for chosen approach
