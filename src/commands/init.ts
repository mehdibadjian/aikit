import * as p from '@clack/prompts';
import pc from 'picocolors';
import path from 'path';
import { copyTemplate, processAgnosticAssets } from '../utils/fileSystem';

export async function initCommand() {
  p.intro(pc.bgCyan(pc.black(' AI Scaffolding CLI ')));

  const project = await p.group(
    {
      path: () =>
        p.text({
          message: 'Where should we scaffold the AI context? (default: current directory)',
          placeholder: '.',
          defaultValue: '.',
        }),
      name: () =>
        p.text({
          message: 'What is the name of this project?',
          placeholder: 'my-awesome-project',
          validate: (value) => {
            if (!value) return 'Please enter a project name.';
          },
        }),
      type: () =>
        p.select({
          message: 'What type of project is this?',
          options: [
            { value: 'frontend', label: 'Frontend / Web App' },
            { value: 'backend', label: 'Backend API / Service' },
            { value: 'fullstack', label: 'Fullstack' },
            { value: 'scripting', label: 'Scripts / Automation' },
            { value: 'general', label: 'General / Other' },
          ],
        }),
      tools: () =>
        p.multiselect({
          message: 'Which AI Tools are you setting up this project for? (Select all that apply)',
          options: [
            { value: 'copilot', label: 'GitHub Copilot' },
            { value: 'antigravity', label: 'Google Antigravity' },
          ],
          required: false,
        }),
    },
    {
      onCancel: () => {
        p.cancel('Operation cancelled.');
        process.exit(0);
      },
    }
  );

  const spinner = p.spinner();
  spinner.start('Scaffolding AI templates...');

  const targetPath = path.resolve(process.cwd(), project.path);
  const vars = {
    PROJECT_NAME: project.name,
    PROJECT_TYPE: project.type,
  };

  try {
    // 1. Shared context
    await copyTemplate('shared', targetPath, vars);

    // 2. Tools specific
    if (project.tools.includes('copilot')) {
      await copyTemplate('copilot', targetPath, vars);
    }
    
    if (project.tools.includes('antigravity')) {
      await copyTemplate('antigravity', targetPath, vars);
    }

    // 3. Process agnostic assets (Skills, Prompts, Agents, Instructions)
    await processAgnosticAssets(targetPath, project.tools as string[]);

    spinner.stop(pc.green('Successfully scaffolded AI templates!'));

    p.note(
      `Next steps:\n1. Open ${pc.cyan(project.path)} in your editor.\n2. Review the generated files in .ai/\n3. Start coding with your AI assistant!`,
      'Ready to go'
    );
  } catch (error: any) {
    spinner.stop(pc.red('Failed to scaffold templates.'));
    p.log.error(error.message);
    process.exit(1);
  }

  p.outro(pc.cyan('Happy coding!'));
}
