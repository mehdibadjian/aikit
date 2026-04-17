import * as p from '@clack/prompts';
import pc from 'picocolors';
import path from 'path';
import { copyTemplate, getAllPersonaOptions, mergeGeminiSettings, mergeVscodeSettings, mirrorSharedSkillsToGemini, processPersonaAssets } from '../utils/fileSystem';

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
      tools: () =>
        p.multiselect({
          message: 'Which AI Tools are you setting up this project for? (Select all that apply)',
          options: [
            { value: 'copilot', label: 'GitHub Copilot' },
            { value: 'antigravity', label: 'Google Antigravity' },
            { value: '__skip__', label: 'Skip' },
          ],
          required: true,
        }),
      personas: async () => {
        const options = await getAllPersonaOptions();
        if (options.length === 0) return [];
        return p.multiselect({
          message: 'Select team personas to include AI assets for:',
          options: [...options, { value: '__skip__', label: 'Skip' }],
          required: true,
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
  };

  try {
    // 1. Shared context
    await copyTemplate('shared', targetPath, vars);

    // 2. Tool-specific templates + settings
    const tools = (project.tools as string[]).filter(t => t !== '__skip__');

    if (tools.includes('copilot')) {
      await copyTemplate('copilot', targetPath, vars);
      await mergeVscodeSettings(targetPath);
    }

    if (tools.includes('antigravity')) {
      await copyTemplate('antigravity', targetPath, vars);
      await mergeGeminiSettings(targetPath);
      await mirrorSharedSkillsToGemini(targetPath);
    }

    // 3. Process selected persona assets into the correct tool paths
    const personas = (Array.isArray(project.personas) ? (project.personas as string[]) : []).filter(p => p !== '__skip__');
    for (const persona of personas) {
      await processPersonaAssets(persona, targetPath, tools);
    }

    spinner.stop(pc.green('Successfully scaffolded AI templates!'));

    const aiPaths = [
      ...(tools.includes('copilot') ? ['.ai/ and .github/'] : []),
      ...(tools.includes('antigravity') ? ['.gemini/'] : []),
    ].join(' · ') || '.ai/';

    p.note(
      `Next steps:\n1. Open ${pc.cyan(project.path)} in your editor.\n2. Review the generated files in ${aiPaths}\n3. Start coding with your AI assistant!`,
      'Ready to go'
    );
  } catch (error: any) {
    spinner.stop(pc.red('Failed to scaffold templates.'));
    p.log.error(error.message);
    process.exit(1);
  }

  p.outro(pc.cyan('Happy coding!'));
}
