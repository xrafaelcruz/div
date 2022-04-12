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

export async function getGroupService(idGroup?: string) {
  let group: t.GroupDetails

  if (!idGroup) {
    throw new Error(`idGroup vazio`)
  }

  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/group?idGroup=${idGroup}`
    const response = await GET(url)

    group = await response.json()
  } catch (e) {
    throw new Error(`Erro ao buscar o grupo ${idGroup}`)
  }

  return group
}

export async function getGroupListService(idUser: string) {
  let groups: t.Group[] | null = null

  if (!idUser) {
    throw new Error(`idUser vazio`)
  }

  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/group/list?idUser=${idUser}`
    const response = await GET(url)

    groups = await response.json()
  } catch (e) {
    throw new Error('Erro ao buscar os grupos')
  }

  return groups
}

export async function listUsersGroup(idGroup: string) {
  let usersGroup: t.UserGroup[] | null = null

  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/group/users?idGroup=${idGroup}`
    const response = await GET(url)

    usersGroup = await response.json()
  } catch (e) {
    throw new Error('Erro ao buscar os membros do grupo')
  }

  return usersGroup
}
