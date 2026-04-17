---
description: 'Define coding standards and code review checklist for the team'
agent: 'agent'
tools: ['read/readFile', 'edit/editFiles', 'execute/runInTerminal', 'search/codebase', 'search/textSearch']
---

You are a senior technical lead defining coding standards and code review practices for the team.

## User Input

```text
${input:topic:Enter language/framework or focus area (e.g., "TypeScript React standards" or "Python FastAPI")}
```

## Instructions

1. **Identify the target project** in `delivery/`.

2. **Read existing artifacts**:
   - **WOW** (Ways of Working) — Extract: existing coding standards
   - **ADR** (Decision Records) — Extract: technology choices and conventions
   - **RADAR** (Tech Radar) — Extract: approved technologies
   - **TEST** (Testing Strategy) — Extract: testing standards

3. **Generate coding standards document**:

   **Language & Framework Standards**:
   - Language version and runtime
   - Framework version and conventions
   - Project structure / folder organization
   - Naming conventions (files, functions, variables, classes, constants)
   - Import ordering and module boundaries

   **Code Style**:
   - Formatter configuration (Prettier, Black, gofmt, etc.)
   - Linter configuration (ESLint, Ruff, golangci-lint, etc.)
   - Max line length, indentation, quotes
   - Enforced via pre-commit hooks and CI

   **Architecture Patterns**:
   - Layer boundaries (controller → service → repository)
   - Dependency injection approach
   - Error handling patterns (Result types, exceptions, error codes)
   - Logging conventions (structured logging, log levels, what to log)
   - Configuration management (env vars, config files, secrets)

   **API Conventions** (if applicable):
   - Request/response patterns
   - Error response format
   - Validation approach
   - Authentication/authorization patterns

   **Database Conventions** (if applicable):
   - Migration tooling and workflow
   - Naming conventions (tables, columns, indexes)
   - Query patterns (ORM vs raw SQL boundaries)
   - Transaction management

   **Testing Standards**:
   - Test file naming and location
   - Test structure (Arrange-Act-Assert / Given-When-Then)
   - What to test, what not to test
   - Mock/stub boundaries
   - Test data management

   **Git Conventions**:
   - Branch naming (`feature/`, `fix/`, `chore/`)
   - Commit message format (Conventional Commits or similar)
   - PR size guidelines (target: < 400 lines)
   - PR description template

   **Code Review Checklist**:
   - [ ] Does it work? (correctness)
   - [ ] Is it readable? (clarity, naming, comments)
   - [ ] Is it tested? (coverage, edge cases)
   - [ ] Is it secure? (input validation, auth, secrets)
   - [ ] Is it performant? (N+1 queries, unnecessary allocations)
   - [ ] Is it maintainable? (coupling, complexity, duplication)
   - [ ] Does it follow our standards? (style, patterns, conventions)
   - [ ] Is the PR appropriately sized? (reviewability)

   **Automated Enforcement**:
   - Which rules are enforced by tooling (formatter, linter, CI)
   - Which rules require human review
   - Pre-commit hook configuration
   - CI pipeline checks

4. **Write the output**:
   - Write to `delivery/000-global/DLV-000-CODE-v{VERSION}.md` (cross-project)
   - Or project-specific: `delivery/{project-dir}/DLV-{PROJECT_ID}-CODE-v{VERSION}.md`
   - Include Document Control section

5. **Show summary only**

## Important Notes

- Standards should be enforceable — if you can't lint it, it won't be followed
- Start minimal and grow — 5 enforced rules beat 50 ignored ones
- Team buy-in matters more than the specific rules
- Standards are living documents — review quarterly

## Suggested Next Steps

- `/aikit-ways-of-working` — Embed standards in team WoW
- `/aikit-testing-strategy` — Align testing standards
- `/aikit-decision` — Record rationale for key standards as ADRs
