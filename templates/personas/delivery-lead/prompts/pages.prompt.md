---
description: 'Publish delivery docs as a static HTML site with Mermaid diagram support and project navigation'
agent: 'agent'
tools: ['read/readFile', 'edit/editFiles', 'execute/runInTerminal', 'search/codebase', 'search/textSearch']
---

You are a tech delivery lead publishing project documentation as an interactive static website.

## User Input

```text
${input:topic:Enter project name or "all" to publish all projects (e.g., "001-payments" or "all")}
```

## Instructions

1. **Scan `delivery/`** for all project directories and artifacts.

2. **Determine scope** — specific project or all projects.

3. **Generate the static site**:

   **A. Create `docs/index.html`** — the main documentation portal:
   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>AIKit Delivery Docs</title>
     <script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
     <script>mermaid.initialize({startOnLoad: true, theme: 'default'});</script>
     <style>/* Clean, professional styling */</style>
   </head>
   ```
   Features:
   - Left sidebar: project tree with collapsible projects
   - Document list per project with type badges and version numbers
   - Document viewer: renders markdown + Mermaid diagrams inline
   - Search bar (client-side, searches loaded manifest)
   - Version selector for documents with multiple versions
   - Responsive layout

   **B. Create `docs/manifest.json`** — structured index of all artifacts:
   ```json
   {
     "generated": "YYYY-MM-DD",
     "projects": [
       {
         "id": "001",
         "name": "project-name",
         "artifacts": [
           {
             "id": "DLV-001-PLAN-v1.0",
             "type": "PLAN",
             "version": "1.0",
             "path": "delivery/001-project/DLV-001-PLAN-v1.0.md",
             "title": "Delivery Plan",
             "created": "YYYY-MM-DD",
             "status": "DRAFT"
           }
         ]
       }
     ]
   }
   ```

   **C. Create `docs/projects/{NNN}-{name}/` directories** with:
   - Rendered HTML version of each artifact
   - Mermaid diagrams rendered inline

4. **Deployment options** (include instructions in `docs/README.md`):

   **GitHub Pages** (simplest):
   ```yaml
   # .github/workflows/docs.yml
   name: Publish Docs
   on:
     push:
       paths: ['delivery/**']
   jobs:
     publish:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/deploy-pages@v4
   ```

   **Netlify**: Drop `docs/` folder in Netlify UI  
   **Vercel**: `vercel --prod docs/`  
   **Local preview**: `cd docs && python3 -m http.server 8080`

5. **Write output**:
   - `docs/index.html` — main portal
   - `docs/manifest.json` — artifact index
   - `docs/README.md` — deployment guide (if not exists)

6. **Show summary** — artifact count published, projects included, deployment instructions

## Suggested Next Steps

- Generate project narrative before publishing with `/aikit-story`
- Create a presentation for stakeholders with `/aikit-present`
- Set up GitHub Actions for auto-publish on every commit
