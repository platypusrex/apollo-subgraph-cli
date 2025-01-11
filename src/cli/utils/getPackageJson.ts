import { join } from 'node:path';
import fs from 'fs-extra';

const { readJsonSync } = fs;

export const getPackageJson = () => {
  const packageJsonPath = join(process.cwd(), 'package.json');
  const packageJson = readJsonSync(packageJsonPath);
  return { output: packageJson, path: packageJsonPath };
};
