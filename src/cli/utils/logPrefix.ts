import chalk from 'chalk';

const colorMap = {
  error: chalk.red,
  info: chalk.blue,
  success: chalk.green,
} as const;

export const logPrefix = (type: 'info' | 'success' | 'error', message: string) =>
  `[${colorMap[type].bold(message)}]`;
