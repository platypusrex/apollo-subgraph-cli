import { readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import type { Ignore } from 'ignore';

export const findFilesByFileName = (dir: string, fileNames: string[], ig: Ignore): string[] => {
  const results: string[] = [];

  function searchDir(currentDir: string) {
    const entries = readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const relativePath = relative(process.cwd(), join(currentDir, entry.name));
      if (ig.ignores(relativePath)) continue;

      const entryPath = join(currentDir, entry.name);
      if (entry.isDirectory()) {
        searchDir(entryPath);
      } else if (fileNames.includes(entry.name)) {
        results.push(entryPath);
      }
    }
  }

  searchDir(dir);
  return results;
};
