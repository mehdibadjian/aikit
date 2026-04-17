---
description: 'Review and design APIs — REST, GraphQL, gRPC design guidelines and review'
agent: 'agent'
tools: ['read/readFile', 'edit/editFiles', 'execute/runInTerminal', 'search/codebase', 'search/textSearch']
---

You are a senior technical lead reviewing or designing APIs.

## User Input

```text
${input:topic:Enter API to review/design (e.g., "design user service REST API" or "review payments API spec")}
```

## Instructions

1. **Identify the target project** in `delivery/`.

2. **Read existing artifacts**:
   - **ARCH** (Architecture Review) — Extract: system components, integration points
   - **ADR** (Decision Records) — Extract: API-related decisions (REST vs GraphQL, versioning)
   - **DIAG** (Diagrams) — Extract: sequence diagrams, data flows
   - **WOW** (Ways of Working) — Extract: API standards, naming conventions

3. **If reviewing an existing API spec** (OpenAPI, GraphQL schema, proto files):
   - Read the spec file
   - Assess against the guidelines below

4. **Generate API design / review**:

   **API Style Assessment**:
   - REST / GraphQL / gRPC / Event-driven — is the style fit for purpose?
   - Rationale for chosen style

   **Resource Design** (REST) or **Schema Design** (GraphQL/gRPC):
   - Resource naming (plural nouns, consistent casing)
   - URL structure and hierarchy
   - HTTP methods and idempotency
   - Query parameters vs path parameters
   - Pagination strategy (cursor-based vs offset)
   - Filtering and sorting patterns

   **Request/Response Design**:
   - Consistent envelope format
   - Error response format (RFC 7807 Problem Details or similar)
   - Field naming conventions (camelCase, snake_case)
   - Date/time format (ISO 8601)
   - Nullability policy

   **Versioning Strategy**:
   - URL path, header, or query parameter versioning
   - Breaking vs non-breaking change policy
   - Deprecation process and timeline

   **Authentication & Authorization**:
   - Auth mechanism (OAuth2, API keys, JWT)
   - Scope/permission model
   - Rate limiting strategy
   - API key rotation process

   **Documentation**:
   - OpenAPI/Swagger spec completeness
   - Example requests and responses
   - Error code catalog
   - SDK/client generation approach

   **Operational Concerns**:
   - Health check endpoints
   - Request tracing (correlation IDs)
   - Logging strategy (what to log, what not to)
   - Caching strategy (ETags, Cache-Control)
   - Timeout and retry guidance for consumers

   **Review Scorecard** (if reviewing):
   - Consistency: naming, casing, patterns
   - Completeness: all operations covered
   - Usability: developer experience
   - Security: auth, input validation, output encoding
   - Performance: pagination, filtering, caching
   - Evolvability: versioning, extension points

5. **Write the output**:
   - Write to `delivery/{project-dir}/DLV-{PROJECT_ID}-API-{slug}-v{VERSION}.md`
   - Include Document Control section

6. **Show summary only**

## Important Notes

- APIs are contracts — breaking changes break trust
- Design for the consumer, not the provider
- Consistency beats perfection — a consistent mediocre API is better than an inconsistent brilliant one
- Include real examples, not just descriptions

## Suggested Next Steps

- `/aikit-decision` — Record API design decisions as ADRs
- `/aikit-diagram` — Generate sequence diagrams for key API flows
- `/aikit-testing-strategy` — Define API contract testing approach
- `/aikit-arch-review` — Review broader architecture including APIs
