import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const typesArr = loadFilesSync(path.join(__dirname), {
  ignoreIndex: true,
  extensions: ['graphql']
});

export const typeDefs = mergeTypeDefs(typesArr);
