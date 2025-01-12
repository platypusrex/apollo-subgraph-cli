import { Listr, type ListrBaseClassOptions } from 'listr2';
import type { ListrContext, ListrInitContext } from '../types';
import { generateSubgraphConfig } from './generateSubgraphConfig';
import { generateSubgraphSchema } from './generateSubgraphSchema';
import { checkSubgraphSchema } from './checkSubgraphSchema';
import { updatePackageJSON } from './updatePackageJSON';
import { addFilesToGitIndex } from './addFilesToGitIndex';

const listrOptions: ListrBaseClassOptions = {
  concurrent: false,
  rendererOptions: { collapseSkips: false },
};

export const tasks = {
  init: new Listr<ListrInitContext>(
    [
      generateSubgraphConfig,
      generateSubgraphSchema,
      updatePackageJSON,
      addFilesToGitIndex,
    ],
    listrOptions
  ),
  print: new Listr<ListrContext>([generateSubgraphSchema], listrOptions),
  check: new Listr([checkSubgraphSchema], listrOptions),
};
