---
description: 'Create a full operational readiness pack — support model, runbooks, DR/BCP, on-call, SLAs, and handover'
agent: 'agent'
tools: ['read/readFile', 'edit/editFiles', 'execute/runInTerminal', 'search/codebase', 'search/textSearch']
---

You are a tech delivery lead creating an operational readiness pack to ensure a service is ready for production.

## User Input

```text
${input:topic:Enter project name and go-live context (e.g., "001-payments go-live in 4 weeks" or "001-platform service transition")}
```

## Instructions

1. **Identify the target project** in `delivery/`.

2. **Read existing artifacts**:
   - **KICK** (Kickoff) — Extract: service description, SLA commitments, stakeholders
   - **ARCH/ADR** — Extract: system components, dependencies, deployment model
   - **RUN** (Runbook) — Extract: existing runbooks to reference/expand
   - **INC** (Incident Reports) — Extract: past incidents and lessons
   - **RISK** (Risk Register) — Extract: operational risks
   - **REL** (Release Plan) — Extract: go-live date, rollback plan
   - **TEST** (Testing Strategy) — Extract: test coverage, NFRs
   - **Existing OPS** — Read and update rather than recreate

3. **Generate the operational readiness pack**:

   **Part 1: Operational Readiness Checklist**
   - Pre-go-live checklist with status (✅ Done / ⚠️ In Progress / ❌ Not Started)
   - Grouped by: Monitoring, Security, Capacity, Runbooks, Support, DR, Comms

   **Part 2: Support Model**
   - Support tiers: Tier 1 (service desk), Tier 2 (engineering), Tier 3 (vendor)
   - Support hours: business hours / extended hours / 24×7
   - Escalation matrix with names, roles, contact details (template)
   - SLA commitments: P1/P2/P3/P4 with response and resolution targets
   - Mermaid flowchart: incident escalation path

   **Part 3: On-Call Setup**
   - On-call rotation structure
   - On-call tooling (PagerDuty / Opsgenie / VictorOps)
   - Alert routing rules
   - On-call runbook: what to check first, common fixes
   - Out-of-hours escalation procedure

   **Part 4: Service Level Agreements**
   - Service Description and scope
   - Availability target (e.g., 99.9% = 8.7h downtime/year)
   - Performance targets (p95 / p99 latency)
   - Error rate budget
   - Exclusions and dependencies
   - Review cadence

   **Part 5: Monitoring & Alerting**
   - Golden signals in place: Latency / Traffic / Errors / Saturation
   - Dashboard links (template)
   - Alert inventory: alert name, threshold, severity, runbook link
   - Synthetic monitoring: health checks, canary transactions
   - Log retention and access

   **Part 6: Incident Management**
   - Incident classification: P1 (service down) → P4 (minor degradation)
   - Incident response procedure
   - War room process for P1/P2
   - Communication templates (internal, external, stakeholder)
   - Post-incident review trigger criteria

   **Part 7: Disaster Recovery & Business Continuity**
   - RTO (Recovery Time Objective): target time to restore
   - RPO (Recovery Point Objective): maximum data loss tolerance
   - DR strategy: active-active / active-passive / backup-restore
   - Failover procedure
   - DR test schedule and last test date
   - Mermaid sequence diagram: DR failover sequence

   **Part 8: Capacity & Scaling**
   - Current baseline capacity
   - Auto-scaling triggers and limits
   - Peak load capacity (e.g., 3× normal)
   - Capacity review cadence
   - Manual scaling procedure if autoscaling fails

   **Part 9: Change Management**
   - Change categories: Standard / Normal / Emergency
   - Deployment freeze periods (e.g., around go-live, Christmas)
   - Change approval workflow
   - Rollback criteria and procedure

   **Part 10: Knowledge Transfer**
   - Architecture overview for ops team
   - System dependencies map
   - Known issues and workarounds
   - Vendor contacts and support portals
   - Documentation location map

4. **Write output**:
   - Write to `delivery/{project}/DLV-{ID}-OPS-v{VERSION}.md`
   - Include Document Control section

5. **Show summary only** — readiness checklist score, critical gaps

## Suggested Next Steps

- Detail individual runbooks with `/aikit-runbook`
- Document release process with `/aikit-release`
- Prepare handover to support team with `/aikit-handover`
- Run incident simulation and document with `/aikit-incident`
