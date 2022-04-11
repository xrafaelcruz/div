import {
  User as PrismaUser,
  Group as PrismaGroup,
  UserGroup as PrismaUserGroup
} from '@prisma/client'

export type Group = Omit<PrismaGroup, 'createdAt' | 'updatedAt'> & {
  createdAt: string
  updatedAt: string
}

export type User = Omit<PrismaUser, 'createdAt' | 'updatedAt'> & {
  createdAt: string
  updatedAt: string
}

export type UserGroupComplete = Omit<
  PrismaUserGroup,
  'createdAt' | 'updatedAt'
> & {
  createdAt: string
  updatedAt: string
  group: Group
}

export type CreateGroupParams = {
  idOwnerUser: string
  name: string
  users: string[]
}

export type UserGroup = Omit<PrismaUserGroup, 'createdAt' | 'updatedAt'> & {
  createdAt: string
  updatedAt: string
  // user: User - Não terá no MVP
}
