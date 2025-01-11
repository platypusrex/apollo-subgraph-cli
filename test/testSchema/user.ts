import gql from 'graphql-tag';

export const userSchema = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
  }

  type Query {
    users: [User!]
    user(id: ID!): User
  }
`;