import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function run() {
  await prisma.user.create({
    data: {
      id: 1,
      email: 'admin@example.com',
      password: 'password',
    },
  });
}

run();
