import type { SubgraphConfig } from 'apollo-subgraph-cli'

/**
 * @property schema - The location of your subgraph's typeDefs
 * @property output - The path to the printed schema file
 */

const config: SubgraphConfig = {
  schema: ['./src/gql/schema/typeDefs/*.ts', '!./src/gql/schema/typeDefs/index.ts'],
  output: './schema.graphql'
}

export default config
