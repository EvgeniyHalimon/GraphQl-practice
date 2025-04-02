import prisma from '../database';
import { IResolvers } from '../types/generated/resolvers';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { APP_SECRET } from '../utils';

export const resolvers: IResolvers = {
  Query: {
    post: (root, args, context) => {
      const { id } = args;
      return prisma.post.findUnique({
        where: { id },
      });
    },
    posts: () => {
      return prisma.post.findMany();
    },
    me: (root, args, context) => {
      if (!context.userId) {
        throw new Error('Not authenticated');
      }
      return prisma.user.findUnique({
        where: { id: context.userId },
      });
    },
  },
  Mutation: {
    signup: async (root, args) => {
      const { name, email, password } = args;

      // Check if user already exists
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        throw new Error('User already exists');
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the user
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      // Generate a token
      const token = jwt.sign({ userId: user.id }, APP_SECRET);

      return {
        token,
        user,
      };
    },
    login: async (root, args) => {
      const { email, password } = args;

      // Find the user
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new Error('No such user found');
      }

      // Check password
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error('Invalid password');
      }

      // Generate a token
      const token = jwt.sign({ userId: user.id }, APP_SECRET);

      return {
        token,
        user,
      };
    },
    createPost: async (root, args, context) => {
      // Authentication check
      if (!context.userId) {
        throw new Error('Not authenticated');
      }

      const { title, content } = args;

      return prisma.post.create({
        data: {
          title,
          content,
          author: { connect: { id: context.userId } },
        },
      });
    },
    updatePost: async (root, args, context) => {
      if (!context.userId) {
        throw new Error('Not authenticated');
      }

      const { id, title, content } = args;

      // Check if user owns the post
      const post = await prisma.post.findUnique({
        where: { id },
        include: { author: true },
      });

      if (!post) {
        throw new Error('Post not found');
      }

      if (post.authorId !== context.userId) {
        throw new Error('Not authorized to update this post');
      }

      return prisma.post.update({
        where: { id },
        data: {
          title,
          content,
        },
      });
    },
    deletePost: async (root, args, context) => {
      if (!context.userId) {
        throw new Error('Not authenticated');
      }

      const { id } = args;

      // Check if user owns the post
      const post = await prisma.post.findUnique({
        where: { id },
      });

      if (!post) {
        throw new Error('Post not found');
      }

      if (post.authorId !== context.userId) {
        throw new Error('Not authorized to delete this post');
      }

      return prisma.post.delete({
        where: { id },
      });
    },
  },
  Post: {
    author: root => {
      return prisma.user.findUnique({
        where: {
          id: root.authorId,
        },
      });
    },
  },
  User: {
    posts: root => {
      return prisma.post.findMany({
        where: {
          authorId: root.id,
        },
      });
    },
  },
};
