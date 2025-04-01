import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { APP_SECRET } from '../utils.js';

export async function signup(parent, args, context) {
  const user = await context.prisma.user.create({
    data: {
      ...args,
      password: await bcrypt.hash(args.password, 10),
    },
  });

  const token = jwt.sign({ userId: user.id }, APP_SECRET, {
    algorithm: 'HS256',
    expiresIn: '7d',
  });

  return { token, user };
}

export async function login(parent, args, context, info) {
  // 1
  const user = await context.prisma.user.findUnique({
    where: { email: args.email },
  });
  console.log('🚀 ~ file: Mutation.js:26 ~ login ~ user:', user);
  if (!user) {
    throw new Error('No such user found');
  }

  // 2
  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);
  console.log('🚀 ~ file: Mutation.js:38 ~ login ~ token:', token);

  // 3
  return {
    token,
    user,
  };
}

export async function post(parent, args, context) {
  const { userId } = context;

  const newLink = await context.prisma.link.create({
    data: {
      url: args.url,
      description: args.description,
      postedBy: { connect: { id: userId } },
    },
  });

  context.pubsub.publish('NEW_LINK', { newLink });

  return newLink;
}

export async function vote(parent, args, context) {
  const userId = context.userId;

  const existingVote = await context.prisma.vote.findUnique({
    where: {
      linkId_userId: {
        linkId: Number(args.linkId),
        userId,
      },
    },
  });

  if (existingVote) {
    throw new Error(`Already voted for link: ${args.linkId}`);
  }

  const newVote = await context.prisma.vote.create({
    data: {
      user: { connect: { id: userId } },
      link: { connect: { id: Number(args.linkId) } },
    },
  });

  context.pubsub.publish('NEW_VOTE', { newVote });

  return newVote;
}
