import { ApolloServer } from 'apollo-server';
import { PrismaClient } from '@prisma/client';
import { PubSub } from 'graphql-subscriptions';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { getUserId } from './utils.js';
import { postedBy, votes } from './resolvers/Link.js';
import { signup, login, post, vote } from './resolvers/Mutation.js';
import { feed } from './resolvers/Query.js';
import { links } from './resolvers/User.js';
import { voteLink, voteUser } from './resolvers/Vote.js';

const resolvers = {
  Link: {
    postedBy,
  },
  User: {
    links,
    votes,
  },
  Query: {
    feed,
  },
  Mutation: {
    signup,
    login,
    post,
    vote,
  },
  Subscription: {
    newLink: {
      subscribe: (_: unknown, __: unknown, { pubsub }: { pubsub: PubSub }) =>
        (pubsub as any).asyncIterator('NEW_LINK'),
    },
    newVote: {
      subscribe: (_: unknown, __: unknown, { pubsub }: { pubsub: PubSub }) =>
        (pubsub as any).asyncIterator('NEW_VOTE'),
    },
  },
  Vote: {
    voteLink,
    voteUser,
  },
};

const prisma = new PrismaClient();
const pubsub = new PubSub();

const typeDefs = `
type Query {
  info: String!
  feed(filter: String, skip: Int, take: Int, orderBy: LinkOrderByInput): Feed!
}

type Feed {
  links: [Link!]!
  count: Int!
}

type Link {
  id: ID!
  description: String!
  url: String!
  postedBy: User
  votes: [Vote!]!
  createdAt: String!
  updatedAt: String!
}

type Mutation {
  post(url: String!, description: String!): Link!
  signup(email: String!, password: String!, name: String!): AuthPayload
  login(email: String!, password: String!): AuthPayload
  vote(linkId: ID!): Vote
}

type AuthPayload {
  token: String
  user: User
}

type User {
  id: ID!
  name: String!
  email: String!
  links: [Link!]!
  votes: [Vote!]!
  createdAt: String!
  updatedAt: String!
}

type Subscription {
  newLink: Link
  newVote: Vote
}

type Vote {
  id: ID!
  voteLink: Link!
  voteUser: User!
}

input LinkOrderByInput {
  description: Sort
  url: Sort
  createdAt: Sort
}

enum Sort {
  asc
  desc
}
`;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    prisma,
    pubsub,
    userId: req?.headers.authorization ? getUserId(req) : null,
  }),
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
