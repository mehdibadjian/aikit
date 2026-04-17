import { copyTemplate } from './src/utils/fileSystem';
import path from 'path';

async function run() {
  const target = path.join(__dirname, 'e2e-test');
  const vars = {
    PROJECT_NAME: 'E2E Validation Project',
    PROJECT_TYPE: 'AI Scaffold E2E'
  };

  try {
    await copyTemplate('shared', target, vars);
    await copyTemplate('copilot', target, vars);
    await copyTemplate('antigravity', target, vars);
    
    console.log('E2E templates copied successfully!');
  } catch (err) {
    console.error('E2E failed:', err);
    process.exit(1);
  }
}

run();
