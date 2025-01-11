import fs from 'fs-extra';
import type { ListrTask } from 'listr2';
import type { ListrContext } from '../types';
import { scripts } from '../constants';
import { getPackageJson } from '../utils';

const { writeJSONSync } = fs;

const subTaskOptions = {
  concurrent: false,
  rendererOptions: { collapse: true },
};

export const updatePackageJSON: ListrTask<ListrContext> = {
  title: 'Update package.json',
  task: (_, task) =>
    task.newListr(
      [
        {
          title: 'Adding and updating npm scripts',
          task: async ({ printScriptName, checkScriptName }) => {
            try {
              const { output, path } = getPackageJson();

              output.scripts = {
                ...(output.scripts ?? {}),
                [printScriptName ?? 'schema:print']: scripts.print,
                [checkScriptName ?? 'schema:check']: scripts.check,
              };

              writeJSONSync(path, output, { spaces: 2 });
            } catch (e) {
              throw new Error(`Error writing to package.json: ${(e as Error).message}`);
            }
          },
        },
      ],
      subTaskOptions
    ),
};
