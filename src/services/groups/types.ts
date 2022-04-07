import {
  Group as PrismaGroup,
  UserGroup as PrismaUserGroup
} from '@prisma/client'

export type Group = Omit<PrismaGroup, 'createdAt' | 'updatedAt'> & {
  createdAt: string
  updatedAt: string
}

export type UserGroupWithGroup = Omit<
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
  members: string[]
}
