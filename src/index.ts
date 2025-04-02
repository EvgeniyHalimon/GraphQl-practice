import { ApolloServer } from 'apollo-server';
import { PrismaClient } from '@prisma/client';
import { PubSub } from 'graphql-subscriptions';
import { getUserId } from './utils';
import { resolvers } from './graphql/resolvers';
import { typeDefs } from './graphql/typeDefs';

const prisma = new PrismaClient();
const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    let userId;
    try {
      userId = req && req.headers.authorization ? getUserId(req) : null;
    } catch (error) {
      console.error('Auth error:', error.message);
      userId = null;
    }

    return {
      prisma,
      pubsub,
      userId,
    };
  },
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
