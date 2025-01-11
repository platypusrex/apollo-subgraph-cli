export const commands = {
  init: 'init',
  print: 'print',
  check: 'check',
} as const;

export const scripts = {
  print: `subgraph schema ${commands.print} --config subgraph.config.ts`,
  check: `subgraph schema ${commands.check} --config subgraph.config.ts`,
} as const;
