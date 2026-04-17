import fs from 'fs-extra';
import path from 'path';

export async function copyTemplate(
  templateName: string,
  targetPath: string,
  variables: Record<string, string>
) {
  const rootDir = __dirname.includes('dist') 
    ? path.join(__dirname, '..') 
    : path.join(__dirname, '../..');
  const templateDir = path.join(rootDir, 'templates', templateName);
  
  if (!await fs.pathExists(templateDir)) {
    return; // template dir absent or empty — skip silently
  }

  // Copy everything directly to target path
  await fs.copy(templateDir, targetPath, {
    filter: (src) => !src.includes('.DS_Store')
  });

  // Process variables in .md files
  await processVariables(targetPath, variables);
}

async function processVariables(dir: string, variables: Record<string, string>) {
  const files = await fs.readdir(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = await fs.stat(fullPath);
    
    if (stat.isDirectory()) {
      await processVariables(fullPath, variables);
    } else if (fullPath.endsWith('.md')) {
      let content = await fs.readFile(fullPath, 'utf8');
      
      for (const [key, value] of Object.entries(variables)) {
        const regex = new RegExp(`{{${key}}}`, 'g');
        content = content.replace(regex, value);
      }
      
      await fs.writeFile(fullPath, content, 'utf8');
    }
  }
}

export async function getAllPersonaOptions(): Promise<{ value: string; label: string }[]> {
  const rootDir = __dirname.includes('dist')
    ? path.join(__dirname, '..')
    : path.join(__dirname, '../..');
  const personasDir = path.join(rootDir, 'templates', 'personas');

  if (!await fs.pathExists(personasDir)) return [];

  const options: { value: string; label: string }[] = [];
  const topLevel = await fs.readdir(personasDir, { withFileTypes: true });

  for (const entry of topLevel.filter((e) => e.isDirectory())) {
    const subDir = path.join(personasDir, entry.name);
    const subEntries = await fs.readdir(subDir, { withFileTypes: true });
    const subPersonas = subEntries.filter((e) => e.isDirectory() && !['agents', 'instructions', 'prompts', 'skills', 'references'].includes(e.name));

    if (subPersonas.length > 0) {
      // category with sub-personas (e.g. engineer/fullstack)
      for (const sub of subPersonas) {
        const label = `${capitalise(entry.name)} · ${capitalise(sub.name)}`;
        options.push({ value: `${entry.name}/${sub.name}`, label });
      }
    } else {
      // flat persona (e.g. delivery-lead)
      options.push({
        value: entry.name,
        label: entry.name.split('-').map(capitalise).join(' '),
      });
    }
  }

  return options;
}

function capitalise(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const VSCODE_AI_SETTINGS = {
  'chat.instructionsFilesLocations': { '.ai/instructions': true },
  'chat.promptFilesLocations': { '.ai/prompts': true },
  'chat.agentFilesLocations': { '.ai/agents': true },
};

export async function mergeVscodeSettings(targetPath: string) {
  const settingsPath = path.join(targetPath, '.vscode', 'settings.json');
  await fs.ensureDir(path.join(targetPath, '.vscode'));

  let existing: Record<string, unknown> = {};
  if (await fs.pathExists(settingsPath)) {
    try {
      existing = JSON.parse(await fs.readFile(settingsPath, 'utf8'));
    } catch {
      // malformed JSON — start fresh with merged keys only
    }
  }

  const merged = { ...existing, ...VSCODE_AI_SETTINGS };
  await fs.writeFile(settingsPath, JSON.stringify(merged, null, 2) + '\n', 'utf8');
}

export async function mergeGeminiSettings(targetPath: string) {
  const settingsPath = path.join(targetPath, '.gemini', 'settings.json');
  await fs.ensureDir(path.join(targetPath, '.gemini'));

  let existing: Record<string, unknown> = {};
  if (await fs.pathExists(settingsPath)) {
    try {
      existing = JSON.parse(await fs.readFile(settingsPath, 'utf8'));
    } catch {
      // malformed JSON — start fresh
    }
  }

  // No required keys for now — just ensure the file exists for user customisation
  const merged = { ...existing };
  await fs.writeFile(settingsPath, JSON.stringify(merged, null, 2) + '\n', 'utf8');
}

/**
 * Mirror skills already placed in .ai/skills/ (from shared template) into .gemini/skills/
 * so they are discoverable by Gemini CLI.
 */
export async function mirrorSharedSkillsToGemini(targetPath: string) {
  const src = path.join(targetPath, '.ai', 'skills');
  const dest = path.join(targetPath, '.gemini', 'skills');
  if (!await fs.pathExists(src)) return;
  await fs.ensureDir(dest);
  await fs.copy(src, dest, { filter: (s) => !s.includes('.DS_Store'), overwrite: false });
}

export async function processPersonaAssets(
  persona: string,
  targetPath: string,
  tools: string[]
) {
  const rootDir = __dirname.includes('dist')
    ? path.join(__dirname, '..')
    : path.join(__dirname, '../..');
  const personaDir = path.join(rootDir, 'templates', 'personas', persona);

  if (!await fs.pathExists(personaDir)) return;

  // Default to copilot if no tools selected
  const writeCopilot = tools.includes('copilot') || tools.length === 0;
  const writeGemini = tools.includes('antigravity');

  const assetTypes = ['skills', 'instructions', 'prompts', 'agents', 'references'] as const;

  for (const assetType of assetTypes) {
    const srcDir = path.join(personaDir, assetType);
    if (!await fs.pathExists(srcDir)) continue;

    const entries = await fs.readdir(srcDir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.name === '.gitkeep') continue;

      const srcPath = path.join(srcDir, entry.name);

      if (entry.isDirectory()) {
        // Skill subdirectory (e.g. delivery-workflow/SKILL.md)
        if (writeCopilot) {
          const dest = path.join(targetPath, '.ai', assetType, entry.name);
          await fs.ensureDir(dest);
          await fs.copy(srcPath, dest, { filter: (s) => !s.includes('.DS_Store') });
        }
        if (writeGemini && assetType === 'skills') {
          const dest = path.join(targetPath, '.gemini', 'skills', entry.name);
          await fs.ensureDir(dest);
          await fs.copy(srcPath, dest, { filter: (s) => !s.includes('.DS_Store') });
        }
      } else if (entry.name.endsWith('.md')) {
        const content = await fs.readFile(srcPath, 'utf8');
        const baseName = entry.name;

        if (writeCopilot) {
          const dest = path.join(targetPath, '.ai', assetType);
          await fs.ensureDir(dest);
          await fs.writeFile(path.join(dest, baseName), content, 'utf8');
        }

        if (writeGemini) {
          if (assetType === 'prompts') {
            // Convert .prompt.md → .toml command for Gemini CLI
            const tomlName = baseName.replace(/\.prompt\.md$/, '.toml');
            const dest = path.join(targetPath, '.gemini', 'commands');
            await fs.ensureDir(dest);
            await fs.writeFile(path.join(dest, tomlName), convertPromptToToml(baseName, content), 'utf8');
          } else if (assetType === 'skills') {
            // Flat skill .md — place directly in .gemini/skills/
            const dest = path.join(targetPath, '.gemini', 'skills');
            await fs.ensureDir(dest);
            await fs.writeFile(path.join(dest, baseName), content, 'utf8');
          } else if (assetType === 'instructions' || assetType === 'references') {
            const dest = path.join(targetPath, '.gemini', assetType);
            await fs.ensureDir(dest);
            await fs.writeFile(path.join(dest, baseName), content, 'utf8');
          }
          // agents have no Gemini CLI equivalent — skip
        }
      }
    }
  }
}

/**
 * Convert a Copilot .prompt.md file to a Gemini CLI custom command .toml file.
 * Extracts the description from YAML frontmatter and uses the body as the prompt.
 */
function convertPromptToToml(filename: string, content: string): string {
  const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  let description = filename.replace(/\.prompt\.md$/, '').replace(/-/g, ' ');
  let body = content;

  if (fmMatch) {
    const fm = fmMatch[1];
    body = fmMatch[2].trim();
    const descMatch = fm.match(/description:\s*['"](.+?)['"]/);
    if (descMatch) description = descMatch[1];
  }

  // Strip VS Code-specific input placeholder syntax: ${input:varName:hint}
  body = body.replace(/\$\{input:[^}]+\}/g, '');
  // Escape any triple-quote sequences inside the body so TOML doesn't break
  body = body.replace(/"""/g, '""\\u0022');

  return `description = ${JSON.stringify(description)}\n\nprompt = """\n${body}\n"""\n`;
}
