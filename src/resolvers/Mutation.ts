import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient, User, Link, Vote } from '@prisma/client';
import { APP_SECRET } from '../utils.js';

interface AuthPayload {
  token: string;
  user: User;
}

interface SignupArgs {
  name: string;
  email: string;
  password: string;
}

interface LoginArgs {
  email: string;
  password: string;
}

interface PostArgs {
  url: string;
  description: string;
}

interface VoteArgs {
  linkId: number;
}

interface Context {
  prisma: PrismaClient;
  pubsub: any;
  userId?: number;
}

export async function signup(
  parent: unknown,
  args: SignupArgs,
  context: Context,
): Promise<AuthPayload> {
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

export async function login(
  parent: unknown,
  args: LoginArgs,
  context: Context,
): Promise<AuthPayload> {
  const user = await context.prisma.user.findUnique({
    where: { email: args.email },
  });

  if (!user) {
    throw new Error('No such user found');
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET, {
    algorithm: 'HS256',
    expiresIn: '7d',
  });

  return { token, user };
}

export async function post(
  parent: unknown,
  args: PostArgs,
  context: Context,
): Promise<Link> {
  if (!context.userId) {
    throw new Error('Not authenticated');
  }

  const newLink = await context.prisma.link.create({
    data: {
      url: args.url,
      description: args.description,
      postedBy: { connect: { id: context.userId } },
    },
  });

  context.pubsub.publish('NEW_LINK', { newLink });

  return newLink;
}

export async function vote(
  parent: unknown,
  args: VoteArgs,
  context: Context,
): Promise<Vote> {
  if (!context.userId) {
    throw new Error('Not authenticated');
  }

  const existingVote = await context.prisma.vote.findUnique({
    where: {
      linkId_userId: {
        linkId: args.linkId,
        userId: context.userId,
      },
    },
  });

  if (existingVote) {
    throw new Error(`Already voted for link: ${args.linkId}`);
  }

  const newVote = await context.prisma.vote.create({
    data: {
      user: { connect: { id: context.userId } },
      link: { connect: { id: args.linkId } },
    },
  });

  context.pubsub.publish('NEW_VOTE', { newVote });

  return newVote;
}
