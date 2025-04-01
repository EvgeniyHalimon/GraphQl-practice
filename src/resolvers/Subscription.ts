const newLinkSubscribe = (_parent: unknown, _args: unknown, context: any) => {
  return context.pubsub.asyncIterator('NEW_LINK');
};

export const newLink = {
  subscribe: newLinkSubscribe,
  resolve: (payload: unknown) => payload,
};

const newVoteSubscribe = (_parent: unknown, _args: unknown, context: any) => {
  return context.pubsub.asyncIterator('NEW_VOTE');
};

export const newVote = {
  subscribe: newVoteSubscribe,
  resolve: (payload: unknown) => payload,
};
