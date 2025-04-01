import { PrismaClient, User } from '@prisma/client';

export function links(
  parent: User,
  args: unknown,
  context: { prisma: PrismaClient },
) {
  return context.prisma.user.findUnique({ where: { id: parent.id } }).links();
}
