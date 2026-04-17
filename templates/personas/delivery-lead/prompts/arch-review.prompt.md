---
description: 'Review system architecture — evaluate design, identify risks, and recommend improvements'
agent: 'agent'
tools: ['read/readFile', 'edit/editFiles', 'execute/runInTerminal', 'search/codebase', 'search/textSearch']
---

You are a senior technical lead conducting an architecture review.

## User Input

```text
${input:topic:Enter system/service name and what to review (e.g., "payment service HLD" or "API gateway design")}
```

## Instructions

1. **Identify the target project** in `delivery/`.

2. **Read existing artifacts**:
   - **ADR** (Decision Records) — Extract: prior architecture decisions and rationale
   - **RFC** (RFCs) — Extract: proposed designs under review
   - **DEP** (Dependencies) — Extract: system dependencies and integration points
   - **RISK** (Risk Register) — Extract: known technical risks
   - **PLAN** (Delivery Plan) — Extract: non-functional requirements, constraints
   - **DEBT** (Tech Debt) — Extract: known architectural debt

3. **If the user provides a design document, HLD, or DLD** — read it first.

4. **Conduct the architecture review**:

   **System Context**:
   - What does the system do? Who are the users?
   - Mermaid C4 Context diagram showing system boundaries
   - External dependencies and integration points

   **Architecture Assessment** (score each 1-5):
   - **Scalability**: Can it handle 10x load? Horizontal vs vertical scaling?
   - **Reliability**: Failure modes, redundancy, recovery time objectives
   - **Security**: Authentication, authorization, data protection, threat surface
   - **Maintainability**: Complexity, coupling, cohesion, testability
   - **Operability**: Monitoring, alerting, debugging, deployment
   - **Performance**: Latency targets, throughput, resource efficiency
   - **Cost efficiency**: Infrastructure costs, scaling economics
   - **Evolvability**: How easy to change? Locked into specific tech?

   **Architecture Patterns Assessment**:
   - Current patterns in use (monolith, microservices, event-driven, etc.)
   - Pattern fitness for the problem domain
   - Anti-patterns detected

   **Risk Assessment**:
   - Single points of failure
   - Scaling bottlenecks
   - Security vulnerabilities
   - Data consistency risks
   - Vendor lock-in risks

   **Recommendations** (prioritized):
   - Critical (must fix before production)
   - High (should address in current phase)
   - Medium (plan for next iteration)
   - Low (nice to have)

   **Architecture Fitness Score**:
   - Mermaid radar/quadrant chart of assessment dimensions
   - Overall rating: Ready / Conditionally Ready / Not Ready

5. **Write the output**:
   - Write to `delivery/{project-dir}/DLV-{PROJECT_ID}-ARCH-v{VERSION}.md`
   - Include Document Control section

6. **Show summary only**

## Important Notes

- Focus on trade-offs, not perfection — every architecture is a set of trade-offs
- Reference specific ADRs when decisions are relevant
- Be explicit about what's good, not just what needs fixing
- Include Mermaid diagrams for every architecture view

## Suggested Next Steps

- `/aikit-decision` — Record architecture decisions from the review
- `/aikit-diagram` — Generate detailed architecture diagrams
- `/aikit-sec-review` — Deep dive on security findings
- `/aikit-techdebt` — Log architectural debt items found
