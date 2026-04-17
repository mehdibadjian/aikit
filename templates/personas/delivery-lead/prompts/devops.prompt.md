---
description: 'Create a DevOps strategy — CI/CD pipelines, IaC, containerisation, developer experience, and platform engineering'
agent: 'agent'
tools: ['read/readFile', 'edit/editFiles', 'execute/runInTerminal', 'search/codebase', 'search/textSearch']
---

You are a senior tech delivery lead creating a comprehensive DevOps strategy for a team or programme.

## User Input

```text
${input:topic:Enter project name and tech context (e.g., "001-payments AWS EKS microservices" or "000-global platform engineering strategy")}
```

## Instructions

1. **Identify the target project** in `delivery/`.

2. **Read existing artifacts**:
   - **KICK** (Kickoff) — Extract: tech stack, team structure, cloud provider
   - **ARCH/ADR** — Extract: deployment architecture, infrastructure decisions
   - **WOW** (Ways of Working) — Extract: existing tooling, branching strategy
   - **CODE** (Coding Standards) — Extract: language/framework choices
   - **TEST** (Testing Strategy) — Extract: test automation approach
   - **SEC** (Security Review) — Extract: security requirements for pipelines
   - **RADAR** (Tech Radar) — Extract: tooling decisions
   - **Existing DEVOPS** — Read and update rather than recreate

3. **Generate the DevOps strategy**:

   **Executive Summary**:
   - Current state assessment
   - Target state vision
   - Key gaps to close
   - DORA metrics targets (Deployment Frequency, Lead Time, MTTR, Change Failure Rate)

   **Part 1: Source Control & Branching**
   - Branching strategy (trunk-based / GitFlow / GitHub Flow)
   - Branch protection rules
   - Commit conventions (Conventional Commits recommended)
   - Pull request process: size limits, review requirements, merge strategy
   - Mermaid flowchart: branching model

   **Part 2: CI Pipeline** (per application type)
   - Trigger: on PR, on merge to main
   - Stages: lint → unit test → build → security scan → publish artifact
   - Quality gates: coverage thresholds, lint rules, vulnerability severity blocks
   - Parallelisation strategy
   - Mermaid flowchart: CI pipeline stages

   **Part 3: CD Pipeline**
   - Deployment strategy: rolling / blue-green / canary
   - Environment promotion: dev → staging → production
   - Approval gates: automated vs manual per environment
   - Rollback strategy: automatic triggers, manual rollback procedure
   - Feature flags for progressive delivery
   - Mermaid flowchart: CD pipeline stages

   **Part 4: Infrastructure as Code**
   - IaC tool recommendation (Terraform / Pulumi / AWS CDK)
   - Module structure and reuse strategy
   - State management (remote state, locking)
   - Secret management (Vault / AWS Secrets Manager / Azure Key Vault)
   - Environment parity strategy

   **Part 5: Containerisation & Orchestration**
   - Container image standards (base images, multi-stage builds, image scanning)
   - Kubernetes / ECS / Cloud Run deployment patterns
   - Helm chart structure (if Kubernetes)
   - Resource limits and HPA configuration
   - Container security: non-root, read-only filesystem, network policies

   **Part 6: Observability**
   - Metrics: Prometheus / CloudWatch / Datadog
   - Logging: structured logs, log aggregation, retention
   - Tracing: OpenTelemetry / Jaeger / X-Ray
   - Alerting: runbook links in alerts, SLO-based alerting
   - Dashboards: golden signals (latency, traffic, errors, saturation)

   **Part 7: Developer Experience**
   - Local development: dev containers / local k8s (kind/minikube)
   - Inner loop: hot reload, local service mocking
   - Developer portal / internal docs
   - Onboarding time target (e.g., first PR in < 1 day)
   - Platform team: what is self-serve vs supported

   **Part 8: Security in Pipelines (DevSecOps)**
   - SAST: static code analysis (SonarQube / Semgrep / CodeQL)
   - DAST: dynamic scanning in staging
   - Dependency scanning: SCA tools (Dependabot / Snyk / OWASP Dependency-Check)
   - Container scanning: Trivy / Grype / Snyk Container
   - Secrets scanning: Gitleaks / TruffleHog
   - Pipeline hardening: pinned actions, OIDC tokens, least privilege

   **Part 9: Toolchain Recommendation**
   - Mermaid flowchart: full toolchain map
   - Recommended tools per category with rationale
   - Tools to retire / replace

   **Part 10: Metrics & Improvement**
   - DORA metrics baseline and targets
   - Improvement roadmap (3 months / 6 months / 12 months)
   - How to measure developer satisfaction (SPACE framework)

4. **Write output**:
   - Write to `delivery/{project}/DLV-{ID}-DEVOPS-v{VERSION}.md`
   - Include Document Control section

5. **Show summary only**

## Suggested Next Steps

- Define test automation in detail with `/aikit-testing-strategy`
- Review security posture with `/aikit-sec-review`
- Define runbooks for deployment incidents with `/aikit-runbook`
- Assess current tooling options with `@aikit-tooling`
