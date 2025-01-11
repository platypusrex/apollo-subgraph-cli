import { federationSchema } from './federation';
import { userSchema } from './user';
import { mergeTypeDefs } from '@graphql-tools/merge';

export const typeDefs = mergeTypeDefs([federationSchema, userSchema]);
