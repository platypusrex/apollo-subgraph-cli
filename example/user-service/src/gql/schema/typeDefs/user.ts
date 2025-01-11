import gql from 'graphql-tag';

export const userSchema = gql`
  type User @key(fields: "id") {
    id: Int!
    name: String
  }
  
  type Query {
    users: [User!]
    user(id: Int!): User
  }
`;
