import { PrismaClient } from '@prisma/client';

export function voteLink(
  parent: any,
  args: unknown,
  context: { prisma: PrismaClient },
): Promise<any | null> {
  return context.prisma.vote.findUnique({ where: { id: parent.id } }).link();
}

export function voteUser(
  parent: any,
  args: unknown,
  context: { prisma: PrismaClient },
): Promise<any | null> {
  return context.prisma.vote.findUnique({ where: { id: parent.id } }).user();
}
