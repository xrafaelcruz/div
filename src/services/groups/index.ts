import { Group as PrismaGroup } from '@prisma/client'

import { POST, GET } from 'lib/api'

import { CreateGroupParams, UserGroupWithGroup } from './types'

export async function createGroup(params: CreateGroupParams) {
  let createdGroup: PrismaGroup | null = null

  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/groups/create`
    const response = await POST(url, params)

    createdGroup = await response.json()
  } catch (e) {
    console.log(e)
    throw new Error('Erro ao criar o grupo')
  }

  return createdGroup
}

export async function listGroups(userId: string, userName: string) {
  let groups: UserGroupWithGroup[] | null = null

  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/groups/list?userId=${userId}&userName=${userName}`
    const response = await GET(url)

    groups = await response.json()

    // if (groups !== null) {
    //   console.log('normalizeUserGroup', normalizeUserGroups(groups))
    // }
  } catch (e) {
    console.log(e)
    throw new Error('Erro ao buscar os grupos')
  }

  return groups
}
