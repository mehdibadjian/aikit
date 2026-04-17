---
description: 'Search across all project artifacts by keyword, document type, or ID'
agent: 'agent'
tools: ['read/readFile', 'search/codebase', 'search/textSearch']
---

You are a tech delivery assistant searching across all AIKit project artifacts.

## User Input

```text
${input:topic:Enter search query (e.g., "authentication risk", "RISK-003", "ADR", or "001-payments")}
```

## Instructions

1. **Parse the search query** to determine search type:
   - If it matches `DLV-{NNN}-{TYPE}-v{VER}` or `{TYPE}-{NNN}` → search by ID
   - If it matches a document type code (KICK, PLAN, RISK, etc.) → search by type
   - If it matches a project pattern (e.g., `001-payments`) → search by project
   - Otherwise → full-text keyword search

2. **Search across `delivery/`**:
   - Scan all files recursively
   - For ID searches: find exact document or item IDs (RISK-001, ADR-003, STORY-045, etc.)
   - For type searches: list all artifacts of that type across all projects
   - For project searches: list all artifacts in that project
   - For keyword searches: find all occurrences across all artifacts

3. **Present results**:

   **Search Summary**:
   - Query: what was searched
   - Scope: how many projects and files searched
   - Results found: count

   **Results** (sorted by relevance):
   For each match:
   - **File**: `delivery/{project}/DLV-{ID}-{TYPE}-v{VER}.md`
   - **Document Type**: Full name
   - **Project**: Project name
   - **Match**: The matching content (excerpt, 2-3 lines of context)
   - **Line**: Where in the document

   **Related Items** (if searching for an ID):
   - Find cross-references to this ID in other documents
   - E.g., if searching for RISK-003, find all ADRs and plans that reference it

4. **Do not write any file** — this is a read-only search command.

5. **Show results directly** — no file output needed.

## Search Tips

- Search by document ID: `DLV-001-RISK-v1.0`
- Search by item ID: `RISK-003` or `ADR-007` or `STORY-042`
- Search by document type: `RISK` (all risk registers) or `ADR` (all decisions)
- Search by keyword: `authentication` or `performance bottleneck`
- Search by project: `001-payments`
- Search by status: `🔴` (critical items) or `PENDING` (items awaiting action)

## Suggested Next Steps

- Open the relevant artifact directly
- Update a found item using the appropriate AIKit command
- Run `/aikit-traceability` for structured cross-reference analysis
