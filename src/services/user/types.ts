import { User as PrismaUser } from '@prisma/client'

export type User = Omit<PrismaUser, 'createdAt' | 'updatedAt'> & {
  createdAt: string
  updatedAt: string
}

export type CreateUserParams = Omit<
  PrismaUser,
  'id' | 'createdAt' | 'updatedAt'
>

export type SessionUser = {
  name?: string | null | undefined
  email?: string | null | undefined
  image?: string | null | undefined
}
