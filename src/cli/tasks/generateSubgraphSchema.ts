import { join, parse } from 'node:path';
import { writeFileSync } from 'node:fs';
import fs from 'fs-extra';
import type { ListrTask } from 'listr2';
import { printSubgraphSchema } from '@apollo/subgraph';
import type { ListrContext } from '../types';
import { loadSchema } from '../utils';

const { pathExists, mkdir } = fs;

const subTaskOptions = {
  concurrent: false,
  rendererOptions: { collapse: true },
};

export const generateSubgraphSchema: ListrTask<ListrContext> = {
  title: 'Generate subgraph schema file',
  task: (_, task) =>
    task.newListr(
      [
        {
          title: 'Printing schema file output...',
          task: async ({ schema: { paths, output } }) => {
            try {
              const schemaPaths = paths.map((path) => join(process.cwd(), path));
              const loadedSchema = await loadSchema(schemaPaths);

              const schemaFilePath = join(process.cwd(), output);
              const { dir } = parse(schemaFilePath);
              const exists = await pathExists(dir);

              if (!exists) {
                await mkdir(dir, { recursive: true });
              }

              writeFileSync(schemaFilePath, printSubgraphSchema(loadedSchema));
            } catch (e) {
              throw new Error(`Error generating subgraph schema file: ${(e as Error).message}`);
            }
          },
        },
      ],
      subTaskOptions
    ),
};
