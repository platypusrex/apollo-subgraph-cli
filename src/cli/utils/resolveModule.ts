import { dirname, join } from 'node:path';
import { access } from 'node:fs/promises';

export const resolveModule = async (moduleName: string, startDir: string): Promise<string> => {
  const modulePath = join(startDir, 'node_modules', moduleName);
  try {
    await access(modulePath);
    return modulePath;
  } catch {
    const parentDir = dirname(startDir);
    if (parentDir === startDir) {
      throw new Error(`Cannot find module '${moduleName}'`);
    }
    return resolveModule(moduleName, parentDir);
  }
};
