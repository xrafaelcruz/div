import { User as PrismaUser } from '@prisma/client'

export type User = Omit<PrismaUser, 'createdAt' | 'updatedAt'> & {
  createdAt: string
  updatedAt: string
}

export type CreateUserParams = Omit<
  PrismaUser,
  'id' | 'createdAt' | 'updatedAt'
>
