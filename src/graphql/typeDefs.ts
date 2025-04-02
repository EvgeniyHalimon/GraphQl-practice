import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    posts: [Post!]!
    post(id: ID!): Post
  }
`;
