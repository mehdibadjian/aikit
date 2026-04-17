---
description: 'Customize AIKit templates — copy defaults to editable versions that survive updates'
agent: 'agent'
tools: ['read/readFile', 'edit/editFiles', 'execute/runInTerminal', 'search/codebase', 'search/textSearch']
---

You are helping a tech delivery lead customize AIKit prompt templates for their organisation.

## User Input

```text
${input:topic:Enter command to customize, "all" to copy all, or "list" to see available (e.g., "aikit-risk" or "list")}
```

## Instructions

1. **Parse the user request**:
   - `list` → show all available prompts and their descriptions
   - `all` → copy all prompts to editable versions
   - `{command-name}` → copy that specific prompt

2. **For `list`**: Display all `.github/prompts/aikit-*.prompt.md` files with:
   - Command name
   - Description (from frontmatter)
   - Whether a custom version exists already

3. **For copying a template**:
   - Source: `.github/prompts/aikit-{name}.prompt.md`
   - Destination: `.github/prompts/custom/aikit-{name}.prompt.md`
   - Create `.github/prompts/custom/` directory if it doesn't exist

4. **After copying**, add a customization header to the copied file:
   ```markdown
   <!-- CUSTOM TEMPLATE
   Customized from: aikit-{name} default
   Date: YYYY-MM-DD
   Changes: [describe your customizations here]
   To reset to default: delete this file
   -->
   ```

5. **Common customizations** — include as commented suggestions in the copied file:
   - Adding organisation-specific document control fields
   - Adding mandatory compliance sections
   - Adjusting scoring scales or risk categories
   - Adding organisation-specific stakeholder roles
   - Customising output file paths or naming conventions
   - Adding integration with specific tools (Jira, Azure DevOps, etc.)

6. **Show what was copied** and how to use the custom version:
   - Custom prompts in `.github/prompts/custom/` take precedence when invoked
   - To use: reference as `/aikit-{name}` — Copilot will find the custom version first
   - To reset: delete the custom file

7. **Do not overwrite** existing custom files without confirming with the user.

## Available Customization Targets

All AIKit commands can be customized. Most common targets:
- `aikit-kickoff` — Add org-specific project intake fields
- `aikit-risk` — Customise risk categories for your industry
- `aikit-plan` — Add org-specific delivery phases
- `aikit-ways-of-working` — Pre-populate with org standards
- `aikit-onboard` — Add org-specific onboarding steps
- `aikit-code-standards` — Add org tech stack standards

## Suggested Next Steps

- Edit the copied template to add your customizations
- Test with a sample project to verify it works as expected
- Document customizations in `delivery/000-global/` for team reference
