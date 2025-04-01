export async function feed(_, args, context) {
  const where = args.filter
    ? {
        OR: [
          { description: { contains: args.filter } },
          { url: { contains: args.filter } },
        ],
      }
    : undefined;

  const [links, count] = await Promise.all([
    context.prisma.link.findMany({
      where,
      skip: args.skip,
      take: args.take,
      orderBy: args.orderBy,
    }),
    context.prisma.link.count({ where }),
  ]);

  return { links, count };
}
