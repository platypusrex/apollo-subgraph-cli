import { resolve } from 'node:path';
import fg from 'fast-glob';

type PathType = 'file' | 'directory';

export async function parseGlobPatterns(
  patterns: string[],
  type: PathType = 'file'
): Promise<string[]> {
  const entries = await fg(patterns, { dot: true, onlyFiles: type === 'file', onlyDirectories: type === 'directory' });
  return entries.map((entry) => resolve(process.cwd(), entry));
}