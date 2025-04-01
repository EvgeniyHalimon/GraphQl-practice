import { PrismaClient } from '@prisma/client';

export function links(
  parent: any,
  args: unknown,
  context: { prisma: PrismaClient },
) {
  return context.prisma.user.findUnique({ where: { id: parent.id } }).links();
}
