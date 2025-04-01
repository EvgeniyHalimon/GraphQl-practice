import { PrismaClient, Link } from '@prisma/client';

interface FeedArgs {
  filter?: string;
  skip?: number;
  take?: number;
  orderBy?: { [key: string]: 'asc' | 'desc' };
}

interface Context {
  prisma: PrismaClient;
}

interface FeedResponse {
  links: Link[];
  count: number;
}

export async function feed(
  _: unknown,
  args: FeedArgs,
  context: Context,
): Promise<FeedResponse> {
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
