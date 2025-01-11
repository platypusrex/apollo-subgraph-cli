import { cosmiconfig } from 'cosmiconfig';
import { TypeScriptLoader } from 'cosmiconfig-typescript-loader';
import type { SubgraphConfig } from '../../typings';

export const getSubgraphArgsFromCosmicConfigFile = async (
  search?: string
): Promise<SubgraphConfig | undefined> => {
  const moduleName = 'subgraph';
  const searchPlaces = search
    ? [search]
    : [
        'package.json',
        `.${moduleName}rc`,
        `.${moduleName}rc.json`,
        `.${moduleName}rc.yaml`,
        `.${moduleName}rc.yml`,
        `.${moduleName}rc.js`,
        `.${moduleName}rc.ts`,
        `${moduleName}.config.js`,
        `${moduleName}.config.ts`,
      ];

  const result = await cosmiconfig(moduleName, {
    searchPlaces,
    loaders: { '.ts': TypeScriptLoader() },
  }).search();

  return result?.config;
};
