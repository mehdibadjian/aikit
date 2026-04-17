---
description: 'Create a FinOps strategy — cloud cost management, optimization, governance, and forecasting'
agent: 'agent'
tools: ['read/readFile', 'edit/editFiles', 'execute/runInTerminal', 'search/codebase', 'search/textSearch']
---

You are a tech delivery lead creating a FinOps strategy to bring financial accountability to cloud spend.

## User Input

```text
${input:topic:Enter project name and cloud context (e.g., "001-platform AWS multi-account" or "000-global FinOps framework")}
```

## Instructions

1. **Identify the target project** in `delivery/`.

2. **Read existing artifacts**:
   - **KICK** (Kickoff) — Extract: cloud provider, budget constraints, team size
   - **ARCH/ADR** — Extract: cloud services in use, scaling approach
   - **PLAN** (Delivery Plan) — Extract: growth projections, launch dates
   - **DEVOPS** — Extract: environments, deployment frequency
   - **Existing FINOPS** — Read and update rather than recreate

3. **Generate the FinOps strategy**:

   **Executive Summary**:
   - Current cloud spend overview (or estimated if not yet live)
   - FinOps maturity level: Crawl / Walk / Run (FinOps Foundation framework)
   - Key optimization opportunities
   - Target: reduce waste by X% within 90 days

   **Part 1: FinOps Operating Model**
   - Roles & responsibilities: Cloud Financial Owner, FinOps Practitioner, Engineering Lead
   - Shared accountability model: who owns which spend categories
   - Review cadence: daily anomaly alerts, weekly team review, monthly exec review
   - Mermaid flowchart: FinOps governance structure

   **Part 2: Cost Visibility**
   - Tagging strategy: mandatory tags (team, environment, service, cost-centre)
   - Tag enforcement: policy-as-code (AWS Config / Azure Policy / GCP OPA)
   - Cost allocation: per team, per service, per environment
   - Dashboards: cost per service, cost per sprint, cost trend

   **Part 3: Cost Optimization**

   *Compute*:
   - Right-sizing recommendations
   - Reserved Instances / Savings Plans / Committed Use Discounts
   - Spot/Preemptible instances for non-critical workloads
   - Auto-scaling policies (scale to zero where possible)

   *Storage*:
   - Storage tiering (hot / warm / cold / archive)
   - Lifecycle policies for S3/Blob/GCS
   - Snapshot retention policies
   - Data transfer optimization (regional data locality)

   *Networking*:
   - NAT gateway optimization
   - Data egress reduction strategies
   - CDN caching to reduce origin hits

   *Databases*:
   - Right-sizing RDS / Cloud SQL instances
   - Aurora Serverless / Serverless v2 for variable workloads
   - Read replica cost review

   **Part 4: Budget Management**
   - Budget alerts by team and service
   - Budget approval workflow for new resources
   - Spend forecast model (linear growth / seasonal)
   - Mermaid Gantt: budget review timeline per quarter

   **Part 5: Unit Economics**
   - Cost per user / cost per transaction / cost per API call
   - Target unit cost and how to track it
   - Break-even and scaling efficiency analysis

   **Part 6: FinOps Tooling**
   - Native tools: AWS Cost Explorer / Azure Cost Management / GCP Billing
   - Third-party options: Infracost / CloudHealth / Spot.io / Apptio Cloudability
   - IaC cost estimation: Infracost in CI pipeline
   - Anomaly detection setup

   **Part 7: 90-Day Improvement Roadmap**
   - Month 1 (Crawl): Tagging, visibility, anomaly alerts
   - Month 2 (Walk): Right-sizing, reserved capacity review, waste elimination
   - Month 3 (Run): Unit economics, FinOps culture, automation
   - Mermaid Gantt: 90-day plan

   **Part 8: KPIs & Success Metrics**
   - Cloud spend as % of revenue (or budget)
   - Coverage of reserved/committed capacity
   - Tag coverage %
   - % of recommendations actioned
   - Unit cost trend

4. **Write output**:
   - Write to `delivery/{project}/DLV-{ID}-FINOPS-v{VERSION}.md`
   - Include Document Control section

5. **Show summary only**

## Suggested Next Steps

- Align FinOps targets with OKRs using `/aikit-okr`
- Review architecture for cost efficiency with `/aikit-arch-review`
- Add FinOps checks to DevOps pipeline with `/aikit-devops`
- Track FinOps metrics with `@aikit-metrics`
