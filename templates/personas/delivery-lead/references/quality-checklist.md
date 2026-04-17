# AIKit Artifact Quality Checklist

Use this checklist when reviewing any generated AIKit artifact before finalising.

## Document Control ✅

- [ ] Document ID follows `DLV-{NNN}-{TYPE}-v{VERSION}` format
- [ ] Document Control table present at top of file
- [ ] All fields populated (no `{PLACEHOLDER}` values remaining)
- [ ] Revision History table present and populated
- [ ] Status set to `DRAFT` (until reviewed)
- [ ] Created Date and Last Modified Date set to today

## Content Quality ✅

- [ ] All section headings are present (per command specification)
- [ ] No placeholder text left in document (e.g., `[TODO]`, `[ENTER HERE]`)
- [ ] All IDs (RISK-NNN, ADR-NNN, etc.) are properly sequenced
- [ ] Mermaid diagram(s) present where required by command
- [ ] Mermaid diagram syntax is valid (no unclosed brackets, correct keywords)

## Cross-References ✅

- [ ] References to other artifacts use correct Document IDs
- [ ] Links to previous artifacts are accurate (right project, right version)
- [ ] Traceability items (RISK-NNN, STORY-NNN) are correctly ID'd

## Suggested Next Steps ✅

- [ ] `## Suggested Next Steps` section at end of document
- [ ] Next steps are specific AIKit commands, not vague suggestions
- [ ] Next steps are appropriate to what was just created

## File Output ✅

- [ ] File written to correct `delivery/{project}/` path
- [ ] Filename matches Document ID (e.g., `DLV-001-PLAN-v1.0.md`)
- [ ] For sprint artifacts: written to `delivery/{project}/sprints/`
- [ ] For release artifacts: written to `delivery/{project}/releases/`
- [ ] Version incremented if a previous version existed

## Diagram-Specific ✅

- [ ] Gantt: has title, sections, and at least one milestone
- [ ] Flowchart: direction specified (TD/LR), all paths lead somewhere
- [ ] Quadrant: x-axis, y-axis, and quadrant labels present
- [ ] Sequence: actors defined, all arrows have labels
- [ ] ERD: all entities have at least `id PK`, relationships defined

## Summary Output ✅

- [ ] Only a summary shown to user (full document written to file)
- [ ] Summary includes: what was created, file path, key highlights
- [ ] Summary includes Suggested Next Steps reference
