import { PrismaClient } from '@prisma/client';
import { Random } from 'mockjs';

const prisma = new PrismaClient();

export async function user() {
  for (let i = 0; i < 10; i++) {
    await prisma.user.create({
      data: {
        name: Random.name(),
        email: Random.email(),
        password: Random.string('number', 8),
        avatar: Random.image('200x200', Random.color(), Random.string(5)),
      },
    });
  }
}
