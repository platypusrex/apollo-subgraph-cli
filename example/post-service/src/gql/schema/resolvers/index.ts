import { mergeResolvers } from '@graphql-tools/merge';
import type { GraphQLResolverMap } from '@apollo/subgraph/dist/schema-helper';
import { postResolvers } from './post';

export const resolvers = mergeResolvers([
  postResolvers
]) as GraphQLResolverMap<unknown>;
