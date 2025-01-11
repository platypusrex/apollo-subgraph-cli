import type { Resolvers } from '../../../types/generated';
import { postData } from '../../../data';

export const postResolvers: Resolvers = {
  Query: {
    posts: () => Array.from(postData.values()),
    post: (_, { id }) => postData.get(id) ?? null,
  },
};
