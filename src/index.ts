import { ApolloServer, gql } from 'apollo-server';
import { PrismaClient } from '@prisma/client';
import { PubSub } from 'graphql-subscriptions';
import { getUserId } from './utils.js';
import { resolvers } from './graphql/resolvers.js';
import { typeDefs } from './graphql/typeDefs.js';

const prisma = new PrismaClient();
const pubsub = new PubSub();

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
