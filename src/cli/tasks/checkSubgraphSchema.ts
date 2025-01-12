import { join } from 'node:path';
import { printSubgraphSchema } from '@apollo/subgraph';
import type { ListrTask } from 'listr2';
import type { ListrContextCheckSchema } from '../types';
import { loadSchema } from '../utils';

const subTaskOptions = {
  concurrent: false,
  rendererOptions: { collapse: true },
};

export const checkSubgraphSchema: ListrTask<ListrContextCheckSchema> = {
  title: 'Check subgraph schema',
  task: (_, task) =>
    task.newListr<ListrContextCheckSchema>(
      [
        {
          title: 'Checking schema file output...',
          task: async ({ schema: { paths } }, task) => {
            try {
              const schemaPaths = paths.map((path) => join(process.cwd(), path));
              const loadedSchema = await loadSchema(schemaPaths);
              printSubgraphSchema(loadedSchema);

              task.output = 'No issues found with federated schema';
            } catch (e) {
              throw new Error(`Error found with federated schema: ${(e as Error).message}`);
            }
          },
        },
      ],
      subTaskOptions
    ),
};
