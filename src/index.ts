import { ApolloServer } from 'apollo-server';
import { PrismaClient } from '@prisma/client';
import { PubSub } from 'graphql-subscriptions';
import { getUserId } from './utils';
import { resolvers } from './resolvers/resolvers';
import { typeDefs } from './typeDefs/typeDefs';

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
