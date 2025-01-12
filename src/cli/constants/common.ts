export const commands = {
  init: 'init',
  print: 'print',
  check: 'check',
} as const;

export const scripts = {
  print: `subgraph schema ${commands.print} --config subgraph.config.ts`,
  check: `subgraph schema ${commands.check} --config subgraph.config.ts`,
} as const;

export const commonIgnoreDirs = new Set([
  'node_modules',
  '.git',
  'dist',
  'build',
  'out',
  'bin',
  'obj',
  '.cache',
  'tmp',
  'temp',
  '.idea',
  '.vscode',
  '__pycache__',
  '.venv',
  'coverage',
  'logs',
  'test-output',
  '.gradle',
  'target',
  'vendor',
  'migrations',
])
