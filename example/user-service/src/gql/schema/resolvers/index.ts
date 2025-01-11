import { mergeResolvers } from '@graphql-tools/merge';
import type { GraphQLResolverMap } from '@apollo/subgraph/dist/schema-helper';
import { userResolvers } from './user';

export const resolvers = mergeResolvers([
  userResolvers,
]) as GraphQLResolverMap;
