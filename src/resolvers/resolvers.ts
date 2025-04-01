import { postedBy, votes } from './Link';
import { signup, login, post, vote } from './Mutation';
import { feed } from './Query';
import { links } from './User';
import { voteLink, voteUser } from './Vote';

export const resolvers = {
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
