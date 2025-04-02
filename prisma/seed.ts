import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Clean database
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  console.log('Seeding database...');

  // Create users
  const password = await bcrypt.hash('password123', 10);

  const alice = await prisma.user.create({
    data: {
      name: 'Alice Smith',
      email: 'alice@example.com',
      password,
    },
  });

  const bob = await prisma.user.create({
    data: {
      name: 'Bob Johnson',
      email: 'bob@example.com',
      password,
    },
  });

  // Create posts
  await prisma.post.create({
    data: {
      title: 'First Post by Alice',
      content:
        'This is my first post! I am excited to share my thoughts with you all.',
      authorId: alice.id,
    },
  });

  await prisma.post.create({
    data: {
      title: 'GraphQL is amazing',
      content:
        'I have been using GraphQL for a few weeks now and I am loving it!',
      authorId: alice.id,
    },
  });

  await prisma.post.create({
    data: {
      title: 'Hello from Bob',
      content:
        'Hey everyone, this is my introduction post. Looking forward to sharing more!',
      authorId: bob.id,
    },
  });

  console.log('Database has been seeded!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
