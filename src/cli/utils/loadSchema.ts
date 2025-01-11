import type { GraphQLSchema } from 'graphql';
import { CodeFileLoader } from '@graphql-tools/code-file-loader';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import type { LoadSchemaOptions } from '@graphql-tools/load/typings/schema';
import {
  loadSchema as loadSchemaToolkit,
  type UnnormalizedTypeDefPointer,
} from '@graphql-tools/load';

export const defaultSchemaLoadOptions = {
  assumeValidSDL: true,
  sort: true,
  convertExtensions: true,
  includeSources: true,
};

export async function loadSchema(
  schemaPointers: UnnormalizedTypeDefPointer | UnnormalizedTypeDefPointer[],
  config: Partial<LoadSchemaOptions> = {}
): Promise<GraphQLSchema> {
  try {
    const loaders = [new CodeFileLoader(), new GraphQLFileLoader()];

    const schema = await loadSchemaToolkit(schemaPointers, {
      ...defaultSchemaLoadOptions,
      loaders,
      ...config,
      ...config.config,
    });
    return schema;
  } catch (e: any) {
    throw new Error(
      `
        Failed to load schema from ${Object.keys(schemaPointers).join(',')}:

        ${e.message || e}
        ${e.stack || ''}

        Apollo Subgraph CLI supports all extensions for:
          - GraphQL files
          - TS/JS files

        Try to use one of above options and run codegen again.

      `
    );
  }
}
