import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
    createdAt: String!
    updatedAt: String!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post!]!
    createdAt: String!
    updatedAt: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    posts: [Post!]!
    post(id: ID!): Post
    me: User
  }

  type Mutation {
    signup(name: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    createPost(title: String!, content: String!): Post!
    updatePost(id: ID!, title: String, content: String): Post!
    deletePost(id: ID!): Post!
  }
`;
