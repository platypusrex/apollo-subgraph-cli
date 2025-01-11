import { join } from 'node:path';
import { writeFileSync } from 'node:fs';
import type { ListrTask } from 'listr2';
import type { ListrContext } from '../types';
import { subgraphConfigTemplate } from '../templates';


const subTaskOptions = {
  concurrent: false,
  rendererOptions: { collapse: true },
};

export const generateSubgraphConfig: ListrTask<ListrContext> = {
  title: 'Generate subgraph config file',
  task: (_, task) =>
    task.newListr(
      [
        {
          title: 'Writing subgraph config to project root...',
          task: async ({ schema: { paths, output } }) => {
            try {
              const configFilePath = join(process.cwd(), 'subgraph.config.ts');
              const configContent = subgraphConfigTemplate(paths, output);
              writeFileSync(configFilePath, configContent);
            } catch (e) {
              throw new Error(`Error generating subgraph config file: ${(e as Error).message}`);
            }
          },
        },
      ],
      subTaskOptions
    ),
};
