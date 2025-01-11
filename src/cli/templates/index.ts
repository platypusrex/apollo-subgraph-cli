import { scripts } from '../constants';

export const esBuildESMTemplate = `
const require = (await import("node:module")).createRequire(import.meta.url);
const __filename = (await import("node:url")).fileURLToPath(import.meta.url);
const __dirname = (await import("node:path")).dirname(__filename);
`;

export const subgraphConfigTemplate = (
  schemaPaths: string[],
  outputPath: string
  // moduleName?: string
) => {
  return `import type { SubgraphConfig } from 'apollo-subgraph-cli'

/**
 * @property schema - The location of your subgraph's typeDefs
 * @property output - The path to the printed schema file
 */

const config: SubgraphConfig = {
  schema: [${schemaPaths.map((path) => `'${path}'`).join(', ')}],
  output: '${outputPath}'
}

export default config
`;
};

export const postCommitHookTemplate = (commandOnly?: boolean) =>
  !commandOnly
    ? `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx --no-install ${scripts.commitAmend}
`
    : `npx --no-install ${scripts.commitAmend}`;

export const postCommitHookJSTemplate = (configStr: string) => `module.exports = ${configStr}`;
