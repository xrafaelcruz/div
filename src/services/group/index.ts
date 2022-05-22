import { Group as PrismaGroup } from '@prisma/client'

import { POST, GET, PUT, REMOVE } from 'lib/api'
import { InviteStatus } from 'lib/prisma/constants'

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

export async function editGroupService(params: t.EditGroupParams) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/group/edit`
    await PUT(url, params)
  } catch (e) {
    throw new Error('Erro ao editar o grupo')
  }
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

export async function getGroupListService(userEmail: string) {
  let groups: t.Group[] | null = null

  if (!userEmail) {
    throw new Error(`userEmail vazio`)
  }

  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/group/list?userEmail=${userEmail}`
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

export async function getGroupInvitesService(userEmail: string) {
  let groupInvites: t.GroupInvite[] | null = null

  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/group/invites?userEmail=${userEmail}`
    const response = await GET(url)

    groupInvites = await response.json()
  } catch (e) {
    throw new Error('Erro ao buscar os convites de grupos do usuário')
  }

  return groupInvites
}

export async function updateUserGroupInvitesService(
  idUserGroup: string,
  status: keyof typeof InviteStatus
) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/group/edit-invite`
    await PUT(url, { idUserGroup, inviteStatus: status })
  } catch (e) {
    throw new Error('Erro ao atualizar o convite')
  }
}

export async function removeUserGroupService(
  idGroup: string,
  userEmail: string
) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/group/remove-user?idGroup=${idGroup}&userEmail=${userEmail}`
    await REMOVE(url)
  } catch (e) {
    throw new Error('Erro ao excluir o usuário do grupo')
  }
}

export async function removeGroupService(idGroup: string) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/group/remove-group?idGroup=${idGroup}`
    await REMOVE(url)
  } catch (e) {
    throw new Error('Erro ao excluir o grupo')
  }
}

export async function exitGroupService(idGroup: string, userEmail: string) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/group/exit?idGroup=${idGroup}&userEmail=${userEmail}`
    await REMOVE(url)
  } catch (e) {
    throw new Error('Erro ao sair do grupo')
  }
}
