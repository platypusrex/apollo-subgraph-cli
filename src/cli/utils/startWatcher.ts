import { spawn } from 'node:child_process';

export const startWatcher = async (gqlSchemaPaths: string[], outputPath: string): Promise<void> => {
  const watcherTemplate = `
import chalk from 'chalk';
import chokidar from 'chokidar';
import { parse } from 'path';
import { generateSubgraphSchema } from './generateSubgraphSchema';

// Get command-line arguments
const args = process.argv.slice(2);
if (args.length < 2) {
  console.error('Watcher Error: Missing required paths.');
  process.exit(1);
}

// Extract paths
const outputPath = args[args.length - 1];
const gqlSchemaPaths = args.slice(0, -1);

console.log(
  \`\${chalk.blue.bold('[INFO]')}: Watching for schema changes in ${gqlSchemaPaths.join(', ')}...\`
);

// Initialize the watcher
const watcher = chokidar.watch(gqlSchemaPaths, { persistent: true });

watcher.on('change', async (filePath) => {
  const { name, ext } = parse(filePath);
  try {
    await generateSubgraphSchema({ paths: gqlSchemaPaths, output: outputPath });
    console.info(
      \`\${chalk.green.bold('[CHANGE DETECTED]')}:[\${name}\${ext}] - Writing changes to ${outputPath}\`
    );
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    }
  }
});

watcher.on('error', async (e) => {
  await watcher?.close();
  console.error(e);
});
  `

  // Prepare arguments: schema paths followed by the output path
  const args = [...gqlSchemaPaths, outputPath];

  // Spawn the watcher process
  const watcherProcess = spawn('node', ['-e', watcherTemplate, ...args], {
    stdio: 'inherit',
    detached: true,
  });

  watcherProcess.on('error', (e: any) => {
    console.error(`Failed to start watcher: ${e.message}`);
  });

  watcherProcess.on('exit', (code) => {
    if (code !== 0) {
      console.error(`Watcher exited with code ${code}`);
    }
  });
}