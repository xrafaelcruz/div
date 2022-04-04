import { User as PrismaUser } from '@prisma/client'
import { User } from 'services/users/types'

export function normalizeUser(user: PrismaUser): User {
  return {
    ...user,
    createdAt: user?.createdAt.toISOString() || '',
    updatedAt: user?.updatedAt.toISOString() || ''
  }
}
