---
description: 'Conduct security review — threat model, vulnerability assessment, security recommendations'
agent: 'agent'
tools: ['read/readFile', 'edit/editFiles', 'execute/runInTerminal', 'search/codebase', 'search/textSearch']
---

You are a senior technical lead conducting a security review.

## User Input

```text
${input:topic:Enter system/service to review or specific security concern}
```

## Instructions

1. **Identify the target project** in `delivery/`.

2. **Read existing artifacts**:
   - **ARCH** (Architecture Review) — Extract: system components, boundaries, data flows
   - **DIAG** (Diagrams) — Extract: deployment, data flow, integration diagrams
   - **ADR** (Decision Records) — Extract: security-related decisions
   - **API** (API Design) — Extract: auth mechanisms, exposed endpoints
   - **RISK** (Risk Register) — Extract: existing security risks

3. **Conduct the security review**:

   **Threat Model (STRIDE)**:
   - **Spoofing**: Identity verification, authentication weaknesses
   - **Tampering**: Data integrity, input validation, message signing
   - **Repudiation**: Audit logging, non-repudiation controls
   - **Information Disclosure**: Data leaks, error messages, debug endpoints
   - **Denial of Service**: Rate limiting, resource exhaustion, scaling limits
   - **Elevation of Privilege**: Authorization model, role escalation paths

   **Attack Surface Analysis**:
   - External-facing endpoints (APIs, web apps, webhooks)
   - Authentication boundaries
   - Data ingress/egress points
   - Third-party integrations
   - Mermaid diagram of trust boundaries

   **Data Security**:
   - Sensitive data inventory (PII, credentials, tokens)
   - Encryption at rest and in transit
   - Data classification and handling
   - Retention and deletion policies
   - Backup security

   **Infrastructure Security**:
   - Network segmentation
   - Secrets management (how secrets are stored, rotated, accessed)
   - Container/runtime security
   - Supply chain security (dependency scanning, SBOM)
   - Infrastructure as Code security

   **Application Security**:
   - Input validation and output encoding
   - Authentication and session management
   - Authorization model (RBAC, ABAC)
   - OWASP Top 10 coverage
   - Dependency vulnerability status

   **Operational Security**:
   - Security monitoring and alerting
   - Incident response readiness
   - Access management (least privilege, MFA)
   - Security patching cadence
   - Penetration testing schedule

   **Findings** (prioritized by severity):

   | ID | Severity | Category | Finding | Recommendation | Effort |
   |----|----------|----------|---------|----------------|--------|
   | SEC-001 | Critical/High/Medium/Low | STRIDE category | Description | Fix | S/M/L |

   **Security Scorecard**:
   - Mermaid quadrant chart of security dimensions
   - Overall rating: Secure / Acceptable / Needs Work / Critical Issues

4. **Write the output**:
   - Write to `delivery/{project-dir}/DLV-{PROJECT_ID}-SEC-v{VERSION}.md`
   - Include Document Control section

5. **Show summary only**

## Important Notes

- Security reviews should be proportionate to risk — not everything needs a pen test
- Focus on the most likely attack vectors, not exotic scenarios
- Always assume external inputs are hostile
- Security is a team responsibility, not a phase

## Suggested Next Steps

- `/aikit-risk` — Add security findings to risk register
- `/aikit-decision` — Record security architecture decisions
- `/aikit-testing-strategy` — Define security testing approach
- `/aikit-runbook` — Create security incident runbook
