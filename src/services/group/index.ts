import { Group as PrismaGroup } from '@prisma/client'

import { POST, GET } from 'lib/api'

import * as t from './types'

export async function createGroup(params: t.CreateGroupParams) {
  let createdGroup: PrismaGroup | null = null

  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/group/create`
    const response = await POST(url, params)

    console.log('response', response)

    createdGroup = await response.json()
    console.log('createdGroup', createdGroup)
  } catch (e) {
    throw new Error('Erro ao criar o grupo')
  }

  return createdGroup
}

export async function listGroups(idUser: string, userName: string) {
  let groups: t.UserGroupComplete[] | null = null

  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/group/list?idUser=${idUser}&userName=${userName}`
    const response = await GET(url)

    groups = await response.json()
  } catch (e) {
    throw new Error('Erro ao buscar os grupos')
  }

  return groups
}

export async function listMembersOfGroup(idGroup: string) {
  let membersOfGroup: t.MemberOfGroup[] | null = null

  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/group/members?idGroup=${idGroup}`
    const response = await GET(url)

    membersOfGroup = await response.json()
  } catch (e) {
    throw new Error('Erro ao buscar os membros do grupo')
  }

  return membersOfGroup
}
