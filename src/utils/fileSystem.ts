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

export async function processAgnosticAssets(
  targetPath: string,
  tools: string[]
) {
  const rootDir = __dirname.includes('dist') 
    ? path.join(__dirname, '..') 
    : path.join(__dirname, '../..');
  const agnosticDir = path.join(rootDir, 'templates', 'agnostic');
  
  if (!await fs.pathExists(agnosticDir)) {
    return;
  }

  // 1. Process Skills
  const skillsDir = path.join(agnosticDir, 'skills');
  if (await fs.pathExists(skillsDir)) {
    const skills = await fs.readdir(skillsDir);
    for (const skillFile of skills) {
      if (!skillFile.endsWith('.md')) continue;
      const skillContent = await fs.readFile(path.join(skillsDir, skillFile), 'utf8');
      const skillName = path.basename(skillFile, '.md');
      
      if (tools.includes('copilot')) {
        const copilotPath = path.join(targetPath, 'copilot-instructions.md');
        let existingContent = '';
        if (await fs.pathExists(copilotPath)) {
          existingContent = await fs.readFile(copilotPath, 'utf8');
        }
        const newContent = `${existingContent}\n\n## Skill: ${skillName}\n\n${skillContent}`.trim();
        await fs.writeFile(copilotPath, newContent, 'utf8');
      }

      if (tools.includes('antigravity')) {
        const agSkillDir = path.join(targetPath, '.gemini', 'antigravity', 'skills', skillName);
        await fs.ensureDir(agSkillDir);
        const agSkillContent = `---\nname: ${skillName}\ndescription: Automatically scaffolded agnostic skill.\n---\n\n${skillContent}`;
        await fs.writeFile(path.join(agSkillDir, 'SKILL.md'), agSkillContent, 'utf8');
      }
    }
  }

  // 2. Process Instructions
  const instDir = path.join(agnosticDir, 'instructions');
  if (await fs.pathExists(instDir)) {
    const instructions = await fs.readdir(instDir);
    for (const file of instructions) {
      if (!file.endsWith('.md')) continue;
      const content = await fs.readFile(path.join(instDir, file), 'utf8');
      const name = path.basename(file, '.md');
      
      const contextPath = path.join(targetPath, 'AI_CONTEXT.md');
      let existing = await fs.pathExists(contextPath) ? await fs.readFile(contextPath, 'utf8') : '';
      await fs.writeFile(contextPath, `${existing}\n\n## Instruction: ${name}\n\n${content}`.trim(), 'utf8');
    }
  }

  // 3. Process Prompts
  const promptsDir = path.join(agnosticDir, 'prompts');
  if (await fs.pathExists(promptsDir)) {
    const targetPromptsDir = path.join(targetPath, '.ai', 'prompts');
    await fs.ensureDir(targetPromptsDir);
    const prompts = await fs.readdir(promptsDir);
    for (const file of prompts) {
      if (!file.endsWith('.md')) continue;
      const content = await fs.readFile(path.join(promptsDir, file), 'utf8');
      await fs.writeFile(path.join(targetPromptsDir, file), content, 'utf8');
    }
  }

  // 4. Process Agents
  const agentsDir = path.join(agnosticDir, 'agents');
  if (await fs.pathExists(agentsDir)) {
    const targetAgentsDir = path.join(targetPath, '.ai', 'agents');
    await fs.ensureDir(targetAgentsDir);
    const agents = await fs.readdir(agentsDir);
    for (const file of agents) {
      if (!file.endsWith('.md')) continue;
      const content = await fs.readFile(path.join(agentsDir, file), 'utf8');
      await fs.writeFile(path.join(targetAgentsDir, file), content, 'utf8');
      
      if (tools.includes('copilot')) {
         await fs.ensureDir(path.join(targetPath, '.github', 'copilot-agents'));
         await fs.writeFile(path.join(targetPath, '.github', 'copilot-agents', file), content, 'utf8');
      }
    }
  }
}
