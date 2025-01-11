import { parse } from 'path';
import chalk from 'chalk';
import chokidar from 'chokidar';
import { logPrefix } from './logPrefix';
import { parseGlobPatterns } from './parseGlobPatterns';
import { generateSubgraphSchema } from './generateSubgraphSchema';

export const buildFileWatcher = async (gqlSchemaPath: string[], outputPath: string) => {
  const schemaPaths = await parseGlobPatterns(gqlSchemaPath, 'file');
  const watcher = chokidar.watch(schemaPaths, { persistent: true });

  const printedPaths = schemaPaths
    .map((path) => {
      const { name, ext } = parse(path);
      return ` - ${chalk.green(name + ext)}`;
    })
    .join('\n');
  console.log(`${logPrefix('info', 'INFO')}: Watching for schema changes in`);
  console.log(printedPaths);

  watcher.on('change', async (filePath) => {
    const { name, ext } = parse(filePath);
    try {
      await generateSubgraphSchema({ paths: gqlSchemaPath, output: outputPath });
      console.info(
        `${logPrefix('success', 'CHANGE DETECTED')}:${logPrefix('success', name + ext)} Writing changes to ${chalk.green(outputPath)}`
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
};
