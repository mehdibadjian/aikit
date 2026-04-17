# Mermaid Syntax Skill for AIKit

This skill provides Mermaid diagram syntax reference for delivery and architecture diagrams. Load this skill when generating Mermaid diagrams in AIKit artifacts.

## Diagram Types Used in AIKit

### Gantt Chart (delivery timelines, sprint plans, roadmaps)

```mermaid
gantt
    title Project Delivery Timeline
    dateFormat  YYYY-MM-DD
    section Discovery
    Kickoff           :done,    disc1, 2026-01-01, 5d
    Stakeholder interviews :active, disc2, after disc1, 10d
    section Alpha
    Sprint 1          :         alp1, after disc2, 14d
    Sprint 2          :         alp2, after alp1, 14d
    section Beta
    Sprint 3          :         bet1, after alp2, 14d
    Go-live           :milestone, go1, after bet1, 0d
```

**Key syntax**:
- `done` = completed task
- `active` = current task
- `crit` = critical path
- `milestone` = milestone (0d duration)
- `after {id}` = dependency

---

### Flowchart (workflows, escalation paths, decision trees)

```mermaid
flowchart TD
    A[Start] --> B{Decision?}
    B -->|Yes| C[Action A]
    B -->|No| D[Action B]
    C --> E[End]
    D --> E

    style A fill:#4CAF50,color:#fff
    style E fill:#2196F3,color:#fff
```

**Node shapes**:
- `[Rectangle]` — process/step
- `{Diamond}` — decision
- `(Rounded)` — start/end
- `[(Database)]` — storage
- `[/Parallelogram/]` — input/output
- `((Circle))` — connector

**Direction**: `TD` (top-down), `LR` (left-right), `BT` (bottom-top), `RL` (right-left)

---

### Quadrant Chart (risk maps, stakeholder grids, prioritisation)

```mermaid
quadrantChart
    title Risk Heat Map
    x-axis Low Impact --> High Impact
    y-axis Low Probability --> High Probability
    quadrant-1 Monitor Closely
    quadrant-2 Critical - Act Now
    quadrant-3 Low Priority
    quadrant-4 Manage Actively
    RISK-001: [0.7, 0.8]
    RISK-002: [0.3, 0.4]
    RISK-003: [0.9, 0.3]
```

**Use for**: Risk heat maps (probability vs impact), Stakeholder maps (influence vs interest), Prioritisation matrices

---

### Pie Chart (effort distribution, category breakdowns)

```mermaid
pie title Sprint Capacity Allocation
    "Feature Development" : 50
    "Bug Fixes" : 20
    "Tech Debt" : 15
    "Ceremonies" : 10
    "Unplanned" : 5
```

---

### Sequence Diagram (API flows, incident timelines, process flows)

```mermaid
sequenceDiagram
    actor User
    participant Frontend
    participant API Gateway
    participant Auth Service
    participant Database

    User->>Frontend: Submit payment
    Frontend->>API Gateway: POST /payments
    API Gateway->>Auth Service: Validate token
    Auth Service-->>API Gateway: 200 OK
    API Gateway->>Database: Insert transaction
    Database-->>API Gateway: Transaction ID
    API Gateway-->>Frontend: 201 Created
    Frontend-->>User: Payment confirmed

    Note over API Gateway,Database: All DB calls use connection pooling
```

**Key syntax**:
- `->>` solid arrow (sync call)
- `-->>` dashed arrow (response)
- `actor` for human actors
- `Note over A,B:` for annotations

---

### C4 Context Diagram (system boundaries — using flowchart subgraphs)

```mermaid
flowchart TB
    subgraph External Users
        U1[👤 Customer]
        U2[👤 Admin]
    end

    subgraph "Payment Platform [System]"
        direction TB
        FE[Frontend App\nReact SPA]
        API[API Gateway\nNginx]
        SVC[Payment Service\nNode.js]
        DB[(Database\nPostgres)]
        FE --> API
        API --> SVC
        SVC --> DB
    end

    subgraph External Systems
        BANK[🏦 Banking Partner\nAPI]
        NOTIF[📧 Notification Service\nSendGrid]
    end

    U1 --> FE
    U2 --> FE
    SVC --> BANK
    SVC --> NOTIF
```

---

### Entity Relationship Diagram (data models)

```mermaid
erDiagram
    CUSTOMER {
        uuid id PK
        string email UK
        string name
        datetime created_at
    }
    ORDER {
        uuid id PK
        uuid customer_id FK
        decimal total_amount
        string status
        datetime created_at
    }
    ORDER_ITEM {
        uuid id PK
        uuid order_id FK
        uuid product_id FK
        int quantity
        decimal unit_price
    }

    CUSTOMER ||--o{ ORDER : "places"
    ORDER ||--|{ ORDER_ITEM : "contains"
```

**Relationship notation**:
- `||--||` one-to-one
- `||--o{` one-to-many (optional)
- `||--|{` one-to-many (mandatory)
- `}o--o{` many-to-many (optional)

---

## Common AIKit Diagram Patterns

### Risk Heat Map
Use quadrant chart with RISK-{NNN} items positioned by [impact, probability].

### Stakeholder Map
Use quadrant chart with stakeholder names positioned by [interest, influence].

### Delivery Timeline
Use Gantt with phases as sections and milestones at key gates.

### Escalation Path
Use flowchart TD with decision diamonds for escalation criteria.

### Sprint Burndown Context
Use Gantt or describe as table — Mermaid has no native burndown chart.

### Architecture
Use flowchart with subgraphs for system boundaries (C4 style).

## Tips

- Always add a `title` to charts
- Use `style` to color-code critical items (red = critical, amber = warning, green = good)
- Keep diagrams focused — one concept per diagram
- Add diagram after the narrative section that explains it
- Use `%%` for comments inside diagrams
