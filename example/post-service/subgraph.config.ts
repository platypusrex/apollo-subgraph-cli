import type { SubgraphConfig } from 'apollo-subgraph-cli'

/**
 * @property schema - The location of your subgraph's typeDefs
 * @property output - The path to the printed schema file
 */

const config: SubgraphConfig = {
  schema: ['./src/gql/schema/typeDefs/*.graphql'],
  output: './src/gql/schema/schema.graphql'
}

export default config
