import { PrismaClient as PrismaClientType } from '@prisma/client';

const PrismaClient = (PrismaClientType as any);

declare global {
  var prisma: any;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}
