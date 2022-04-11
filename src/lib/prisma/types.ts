import { PrismaClient, Prisma } from '@prisma/client'

export type Prisma = PrismaClient<
  Prisma.PrismaClientOptions,
  never,
  Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
>
