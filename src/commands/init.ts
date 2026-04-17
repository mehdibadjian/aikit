import * as p from '@clack/prompts';
import pc from 'picocolors';
import path from 'path';
import { copyTemplate, getAvailablePersonas, getEngineerSubPersonas, mergeVscodeSettings, processPersonaAssets } from '../utils/fileSystem';

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
      type: (): Promise<string | symbol> =>
        p.select({
          message: 'What type of project is this?',
          options: [
            { value: 'frontend', label: 'Frontend / Web App' },
            { value: 'backend', label: 'Backend API / Service' },
            { value: 'fullstack', label: 'Fullstack' },
            { value: 'scripting', label: 'Scripts / Automation' },
            { value: 'general', label: 'General / Other' },
          ] as { value: string; label: string }[],
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
      personas: async () => {
        const available = await getAvailablePersonas();
        if (available.length === 0) return [];
        return p.multiselect({
          message: 'Select team personas to include AI assets for:',
          options: available.map((name) => ({
            value: name,
            label: name
              .split('-')
              .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
              .join(' '),
          })),
          required: false,
        });
      },
      engineerSpecializations: async ({ results }) => {
        const personas = results.personas as string[] | symbol;
        if (
          !Array.isArray(personas) ||
          !personas.includes('engineer')
        ) return [];
        const subs = await getEngineerSubPersonas();
        if (subs.length === 0) return [];
        return p.multiselect({
          message: 'Select engineer specializations:',
          options: subs.map((name) => ({
            value: name,
            label: name.charAt(0).toUpperCase() + name.slice(1),
          })),
          required: false,
        });
      },
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
    PROJECT_TYPE: project.type as string,
  };

  try {
    // 1. Shared context
    await copyTemplate('shared', targetPath, vars);

    // 2. Merge .vscode/settings.json (safe merge — preserves existing user settings)
    await mergeVscodeSettings(targetPath);

    // 3. Tools specific
    if (project.tools.includes('copilot')) {
      await copyTemplate('copilot', targetPath, vars);
    }
    
    if (project.tools.includes('antigravity')) {
      await copyTemplate('antigravity', targetPath, vars);
    }

    // 4. Process selected persona assets
    const personas = Array.isArray(project.personas) ? (project.personas as string[]) : [];
    for (const persona of personas) {
      if (persona === 'engineer') {
        // engineer is a category — process selected specializations
        const subs = Array.isArray(project.engineerSpecializations)
          ? (project.engineerSpecializations as string[])
          : [];
        for (const sub of subs) {
          await processPersonaAssets(`engineer/${sub}`, targetPath);
        }
      } else {
        await processPersonaAssets(persona, targetPath);
      }
    }

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
