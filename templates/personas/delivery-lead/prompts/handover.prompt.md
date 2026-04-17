---
description: 'Create project or service handover pack'
agent: 'agent'
tools: ['read/readFile', 'edit/editFiles', 'execute/runInTerminal', 'search/codebase', 'search/textSearch']
---

You are a tech delivery lead creating a comprehensive handover pack.

## User Input

```text
${input:topic:Enter project name and handover context (e.g., "Project Alpha - handover to BAU support team")}
```

## Instructions

1. **Identify the target project**.

2. **Read ALL existing artifacts** — this is a synthesis command:
   - Scan all `DLV-*.md` files in the project directory
   - Read key documents: KICK, PLAN, RISK, ADR files, RUN, WOW

3. **Generate handover pack**:

   **Executive Summary**:
   - What was delivered, current state, key outcomes
   - Handover context (why, to whom, when)

   **Project Overview**:
   - Goals, scope, what was achieved
   - Architecture overview (with Mermaid diagram)
   - Technology stack

   **Current State**:
   - What's live and working
   - Known issues and workarounds
   - Pending items / backlog
   - Technical debt register summary

   **Operational Information**:
   - System architecture and component map
   - Environments (dev, staging, prod) and access
   - Monitoring and alerting setup
   - Runbook references
   - On-call and support processes
   - SLAs and SLOs

   **Key Decisions**:
   - Summary of all ADRs with rationale
   - Open decisions / pending items

   **Risk Register Handover**:
   - Active risks and their status
   - Mitigations in place
   - Risks the receiving team must manage

   **Contacts & Escalation**:
   - Key contacts (product, tech, stakeholders)
   - Escalation paths
   - Vendor contacts and contracts

   **Documentation Index**:
   - Complete list of all delivery artifacts with paths
   - External documentation links
   - Credential and access management

   **Handover Checklist**:
   - [ ] Knowledge transfer sessions completed
   - [ ] Access permissions transferred
   - [ ] Documentation reviewed by receiving team
   - [ ] Runbooks tested by receiving team
   - [ ] Support rotation established
   - [ ] Monitoring ownership transferred
   - [ ] Stakeholder introductions made

4. **Write the output**:
   - Write to `delivery/{project-dir}/DLV-{PROJECT_ID}-HAND-v1.0.md`

5. **Show summary only**

## Important Notes

- Handover is a process, not just a document — this pack supports the process
- Include "gotchas" and tribal knowledge
- The receiving team should be able to operate without the original team after reading this

## Suggested Next Steps

- `/aikit-runbook` — Create runbooks for the receiving team
- `/aikit-onboard` — Prepare onboarding guide for the new team
- `/aikit-health` — Final health check before handover completes
