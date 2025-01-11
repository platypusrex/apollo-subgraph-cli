import type { SubgraphConfig } from 'apollo-subgraph-cli'

/**
 * @property schema - The location of your subgraph's typeDefs
 * @property output - The path to the printed schema file
 */

const config: SubgraphConfig = {
  schema: ['./src/gql/schema/typeDefs/*.ts', '!*/index.ts'],
  output: './schema.graphql'
}

export default config
