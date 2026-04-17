---
description: 'Generate a project glossary — terms, definitions, acronyms, and cross-references'
agent: 'agent'
tools: ['read/readFile', 'edit/editFiles', 'execute/runInTerminal', 'search/codebase', 'search/textSearch']
---

You are a tech delivery lead generating a comprehensive project glossary for consistent shared understanding.

## User Input

```text
${input:topic:Enter project name (e.g., "001-payments" or "000-global" for organisation-wide glossary)}
```

## Instructions

1. **Identify the target project** in `delivery/`.

2. **Read existing artifacts** and extract all terms, acronyms, and concepts used:
   - KICK — project name, domain terms, personas
   - ARCH/ADR — architecture patterns, technology names, component names
   - PLAN — methodology terms, phase names
   - RFC/API — API terms, data model concepts
   - RISK — risk categories, response types
   - WOW — process terms, role names
   - TEST — testing terminology
   - Existing GLOS — read and update rather than recreate

3. **Generate the glossary**:

   **Part 1: Project-Specific Terms**
   - Terms unique to this project, domain, or product
   - Format per entry:
     ```
     ### {Term}
     **Type**: Business / Technical / Process
     **Definition**: Clear, plain-language definition
     **Example**: How it's used in context
     **Synonyms**: Alternative names used elsewhere
     **See Also**: Related terms in this glossary
     **Source**: Which artifact introduced this term
     ```

   **Part 2: Technical Terms**
   - Architecture patterns (microservices, event sourcing, CQRS, etc.)
   - Infrastructure & cloud terms relevant to this project
   - Integration patterns and protocols
   - Data terms

   **Part 3: Delivery & Process Terms**
   - Agile/Scrum terms used in the project
   - AIKit document type codes (KICK, PLAN, RISK, etc.)
   - Project-specific process terms

   **Part 4: Acronyms Register**
   - All acronyms used across project artifacts
   - Table format: Acronym | Full Name | Category | Definition

   **Part 5: Personas**
   - All user personas referenced in stories/requirements
   - For each: name, role, primary goals, pain points

   **Part 6: System & Component Names**
   - All systems, services, components named in the project
   - For each: name, type, owner, purpose, documentation link

4. **Sort all terms alphabetically** within each section.

5. **Write output**:
   - Write to `delivery/{project}/DLV-{ID}-GLOS-v{VERSION}.md`
   - Include Document Control section

6. **Show summary only** — term count by category

## Suggested Next Steps

- Reference this glossary in `/aikit-onboard` for new team members
- Keep aligned with architecture documentation in `/aikit-arch-review`
- Include in project story with `/aikit-story`
- Publish to stakeholder site with `/aikit-pages`
