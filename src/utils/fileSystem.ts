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

export async function getAvailablePersonas(): Promise<string[]> {
  const rootDir = __dirname.includes('dist')
    ? path.join(__dirname, '..')
    : path.join(__dirname, '../..');
  const personasDir = path.join(rootDir, 'templates', 'personas');

  if (!await fs.pathExists(personasDir)) return [];

  const entries = await fs.readdir(personasDir, { withFileTypes: true });
  return entries.filter((e) => e.isDirectory()).map((e) => e.name);
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
  const personaDir = path.join(rootDir, 'templates', 'personas', persona);

  if (!await fs.pathExists(personaDir)) return;

  const assetTypes = ['skills', 'instructions', 'prompts', 'agents'] as const;

  for (const assetType of assetTypes) {
    const srcDir = path.join(personaDir, assetType);
    if (!await fs.pathExists(srcDir)) continue;

    const files = await fs.readdir(srcDir);

    for (const file of files) {
      if (!file.endsWith('.md')) continue;

      const content = await fs.readFile(path.join(srcDir, file), 'utf8');

      // Write to .ai/<assetType>/
      const aiDir = path.join(targetPath, '.ai', assetType);
      await fs.ensureDir(aiDir);
      await fs.writeFile(path.join(aiDir, file), content, 'utf8');
    }
  }
}
