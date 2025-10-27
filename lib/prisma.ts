import { PrismaClient } from '@/lib/generated/prisma-client/client'

// Declaração para anexar o PrismaClient ao objeto global em desenvolvimento
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

// Instância única do Prisma Client
export const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') global.prisma = prisma