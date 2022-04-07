import { Group as PrismaGroup } from '@prisma/client'

export type Group = Omit<PrismaGroup, 'createdAt' | 'updatedAt'> & {
  createdAt: string
  updatedAt: string
}

export type CreateGroupParams = {
  idOwnerUser: string
  name: string
  members: string[]
}
