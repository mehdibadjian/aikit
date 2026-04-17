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
