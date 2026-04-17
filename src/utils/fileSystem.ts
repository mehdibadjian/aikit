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

export async function processPersonaAssets(
  persona: string,
  targetPath: string
) {
  const rootDir = __dirname.includes('dist')
    ? path.join(__dirname, '..')
    : path.join(__dirname, '../..');
  // persona may be a nested path like "engineer/backend"
  const personaDir = path.join(rootDir, 'templates', 'personas', persona);

  if (!await fs.pathExists(personaDir)) return;

  const assetTypes = ['skills', 'instructions', 'prompts', 'agents', 'references'] as const;

  for (const assetType of assetTypes) {
    const srcDir = path.join(personaDir, assetType);
    if (!await fs.pathExists(srcDir)) continue;

    const entries = await fs.readdir(srcDir, { withFileTypes: true });
    const aiDir = path.join(targetPath, '.ai', assetType);

    for (const entry of entries) {
      if (entry.name === '.gitkeep') continue;

      if (entry.isDirectory()) {
        // Copy entire subdirectory (e.g. delivery-workflow/SKILL.md)
        const srcSubDir = path.join(srcDir, entry.name);
        const destSubDir = path.join(aiDir, entry.name);
        await fs.ensureDir(destSubDir);
        await fs.copy(srcSubDir, destSubDir, {
          filter: (src) => !src.includes('.DS_Store'),
        });
      } else if (entry.name.endsWith('.md')) {
        const content = await fs.readFile(path.join(srcDir, entry.name), 'utf8');
        await fs.ensureDir(aiDir);
        await fs.writeFile(path.join(aiDir, entry.name), content, 'utf8');
      }
    }
  }
}
