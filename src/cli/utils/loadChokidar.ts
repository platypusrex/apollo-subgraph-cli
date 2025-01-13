import { resolveModule } from './resolveModule';

export const loadChokidar = async () => {
  try {
    await resolveModule('chokidar', process.cwd());
    return await import('chokidar');
  } catch (e) {
    throw new Error(
      'The "chokidar" package is required and needs to be installed if watching for file changes.'
    );
  }
};
