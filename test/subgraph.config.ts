import { SubgraphConfig } from '../src/typings';

const config: SubgraphConfig = {
  schema: ['testSchema/*.ts'],
  output: 'testSchema/schema.graphql'
}

export default config;