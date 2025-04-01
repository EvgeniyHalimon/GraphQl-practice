import { PrismaClient, Vote, Link, User } from '@prisma/client';

export function voteLink(
  parent: Vote,
  args: unknown,
  context: { prisma: PrismaClient },
): Promise<Link | null> {
  return context.prisma.vote.findUnique({ where: { id: parent.id } }).link();
}

export function voteUser(
  parent: Vote,
  args: unknown,
  context: { prisma: PrismaClient },
): Promise<User | null> {
  return context.prisma.vote.findUnique({ where: { id: parent.id } }).user();
}
