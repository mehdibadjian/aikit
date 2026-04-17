import { Command } from 'commander';
import { initCommand } from './commands/init';
import packageJson from '../package.json';

const program = new Command();

program
  .name('aikit')
  .description('Scaffolds specialized AI prompts, agents, and skills into your project.')
  .version(packageJson.version);

program
  .command('init')
  .description('Interactive setup for AI scaffold in the current or specific directory.')
  .action(async () => {
    await initCommand();
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  // Run init by default if no command is specified
  initCommand();
}
