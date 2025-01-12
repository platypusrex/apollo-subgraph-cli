import { join, parse } from 'node:path';
import { execSync } from 'node:child_process';
import type { ListrTask } from 'listr2';
import type { ListrInitContext } from '../types';
import { findFilesByFileName, isGitRepo } from '../utils';
import { existsSync, readFileSync } from 'node:fs';
import { commonIgnoreDirs } from '../constants';
import ignore from 'ignore';

const subTaskOptions = {
  concurrent: false,
  rendererOptions: { collapse: true },
};

export const addFilesToGitIndex: ListrTask<ListrInitContext> = {
  title: 'Add files to git',
  skip: ({ git = false }) => (!git ? 'Skipping add files to git' : false),
  task: ({ schema: { output } }, task) =>
    task.newListr(
      [
        {
          title: 'Performing git add...',
          task: (_, task) => {
            const gitRepo = isGitRepo();
            if (!gitRepo) {
              task.output = 'No git repo found.';
              return;
            }

            const { name, ext } = parse(output);
            const generatedSchemaFileName = `${name}.${ext}`;
            const fileNames = ['subgraph.config.ts', 'package.json', generatedSchemaFileName];

            const gitignorePath = join(process.cwd(), '.gitignore');
            const ig = ignore();

            if (existsSync(gitignorePath)) {
              const gitignoreContent = readFileSync(gitignorePath, 'utf-8');
              ig.add(gitignoreContent);
            } else {
              // If there's no `.gitignore`, use the common list of ignored directories
              ig.add([...commonIgnoreDirs].map((dir) => `/${dir}/`));
            }

            try {
              const filesPaths = findFilesByFileName(process.cwd(), fileNames, ig);
              if (!filesPaths.length) {
                task.output = 'No files found to add to git staging.';
                return;
              } else {
                execSync(`git add ${filesPaths.map((file) => `${file}`).join(' ')}`);
              }
            } catch (e) {
              throw new Error(`Error adding files to git: ${(e as Error).message}`);
            }
          },
        },
      ],
      subTaskOptions
    ),
};
