import { execSync } from 'node:child_process';
import type { ListrTask } from 'listr2';
import type { ListrContext } from '../types';

const subTaskOptions = {
  concurrent: false,
  rendererOptions: { collapse: true },
};

export const addFilesToGitIndex: ListrTask<ListrContext> = {
  title: 'Add files to git',
  task: (_, task) =>
    task.newListr(
      [
        {
          title: 'Performing git add...',
          task: () => {
            try {
              execSync('git add .');
            } catch (e) {
              throw new Error(`Error adding files to git: ${(e as Error).message}`);
            }
          },
        },
      ],
      subTaskOptions
    ),
};
