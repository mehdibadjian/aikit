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
    throw new Error(`Template directory not found: ${templateDir}`);
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

  const assetTypes = ['skills', 'instructions', 'prompts', 'agents'] as const;

  for (const assetType of assetTypes) {
    const srcDir = path.join(personaDir, assetType);
    if (!await fs.pathExists(srcDir)) continue;

    const files = await fs.readdir(srcDir);

    for (const file of files) {
      if (!file.endsWith('.md')) continue;

      const content = await fs.readFile(path.join(srcDir, file), 'utf8');
      const name = path.basename(file, '.md');

      // Always write to .ai/<assetType>/
      const aiDir = path.join(targetPath, '.ai', assetType);
      await fs.ensureDir(aiDir);
      await fs.writeFile(path.join(aiDir, file), content, 'utf8');

      if (tools.includes('copilot')) {
        if (assetType === 'agents') {
          const copilotAgentsDir = path.join(targetPath, '.github', 'copilot-agents');
          await fs.ensureDir(copilotAgentsDir);
          await fs.writeFile(path.join(copilotAgentsDir, file), content, 'utf8');
        } else if (assetType === 'instructions' || assetType === 'skills') {
          const copilotPath = path.join(targetPath, '.github', 'copilot-instructions.md');
          await fs.ensureDir(path.dirname(copilotPath));
          const existing = await fs.pathExists(copilotPath) ? await fs.readFile(copilotPath, 'utf8') : '';
          const section = assetType === 'skills' ? `Skill: ${name}` : `Instruction: ${name}`;
          await fs.writeFile(copilotPath, `${existing}\n\n## ${section}\n\n${content}`.trim(), 'utf8');
        }
      }

      if (tools.includes('antigravity')) {
        if (assetType === 'skills') {
          const agSkillDir = path.join(targetPath, '.gemini', 'antigravity', 'skills', name);
          await fs.ensureDir(agSkillDir);
          await fs.writeFile(path.join(agSkillDir, 'SKILL.md'), content, 'utf8');
        } else {
          const agDir = path.join(targetPath, '.gemini', 'antigravity', assetType);
          await fs.ensureDir(agDir);
          await fs.writeFile(path.join(agDir, file), content, 'utf8');
        }
      }
    }
  }
}
