import { ApolloServer } from 'apollo-server';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PrismaClient } from '@prisma/client';
import { getUserId } from './utils.js';
import { feed } from './resolvers/Query.js';
import { signup, login, post, vote } from './resolvers/Mutation.js';
import { links } from './resolvers/User.js';
import { postedBy, votes } from './resolvers/Link.js';
import { voteLink, voteUser } from './resolvers/Vote.js';
import { PubSub } from 'graphql-subscriptions';

const prisma = new PrismaClient();
const pubsub = new PubSub();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const typeDefs = fs.readFileSync(
  path.join(__dirname, 'schema.graphql'),
  'utf8',
);

// 2
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
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_LINK'),
    },
    newVote: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_VOTE'),
    },
  },
  Vote: {
    voteLink,
    voteUser,
  },
};

// 3
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
