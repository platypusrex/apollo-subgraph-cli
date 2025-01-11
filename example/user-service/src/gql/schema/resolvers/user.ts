import type { Resolvers } from '../../../types/generated';
import { userData } from '../../../data';

export const userResolvers: Resolvers = {
  Query: {
    users: () => Array.from(userData.values()),
    user: (_, { id }) => userData.get(id) ?? null,
  },
  User: {
    __resolveReference: (user) => userData.get(user.id),
  },
};
