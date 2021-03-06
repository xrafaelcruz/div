import {
  User as PrismaUser,
  Group as PrismaGroup,
  UserGroup as PrismaUserGroup
} from '@prisma/client'

export type Group = Omit<PrismaGroup, 'createdAt' | 'updatedAt'> & {
  createdAt: string
  updatedAt: string
  total: number
}

export type GroupDetails = Group & {
  users: PrismaUserGroup[]
}

export type GroupInvite = Omit<PrismaUserGroup, 'createdAt' | 'updatedAt'> & {
  createdAt: string
  updatedAt: string
  group: Omit<PrismaGroup, 'createdAt' | 'updatedAt'> & {
    createdAt: string
    updatedAt: string
  }
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
  ownerUserEmail: string
  name: string
  description?: string
  emails: string[]
}

export type EditGroupParams = {
  id: string
  name: string
  description?: string
  emails: string[]
}

export type UserGroup = Omit<PrismaUserGroup, 'createdAt' | 'updatedAt'> & {
  createdAt: string
  updatedAt: string
  user: User
}
