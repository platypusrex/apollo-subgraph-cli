import gql from 'graphql-tag';

export const userSchema = gql`
  type Post {
    id: ID!
    title: String!
    content: String!
  }

  type Query {
    posts: [Post!]
    post(id: ID!): Post
  }
`;