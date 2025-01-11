import { resolve } from 'node:path';
import { readFileSync, writeFileSync } from 'node:fs';
import fs from 'fs-extra';
import type { ListrTask } from 'listr2';
import type { ListrContext } from '../types';

const { outputFileSync, pathExists } = fs;

const subTaskOptions = {
  concurrent: false,
  rendererOptions: { collapse: true },
};

export const createRoverConfig: ListrTask<ListrContext> = {
  title: 'Create or update rover config',
  task: (_, task) =>
    task.newListr(
      [
        {
          title: 'Writing to rover config file...',
          task: async ({ schema: { output } }) => {
            try {
              const roverConfigPath = resolve(process.cwd(), 'rover.config');
              const exists = await pathExists(roverConfigPath);

              if (!exists) {
                outputFileSync(roverConfigPath, output);
              } else {
                const roverConfig = readFileSync(roverConfigPath).toString('utf-8');
                if (roverConfig !== output) {
                  writeFileSync(roverConfigPath, output);
                }
              }
            } catch (e) {
              throw new Error(`Error creating/updating rover.config: ${(e as Error).message}`);
            }
          },
        },
      ],
      subTaskOptions
    ),
};
