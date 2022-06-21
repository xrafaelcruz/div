import { Group as PrismaGroup } from '@prisma/client'

import { POST, GET, PUT, REMOVE } from 'lib/api'
import { InviteStatus } from 'lib/prisma/constants'

import * as t from './types'

export async function createGroup(params: t.CreateGroupParams) {
  let createdGroup: PrismaGroup | null = null

  try {
    const url = `/api/group/create`
    const response = await POST(url, params)

    createdGroup = await response.json()
  } catch (e) {
    throw new Error('Erro ao criar o grupo')
  }

  return createdGroup
}

export async function editGroupService(params: t.EditGroupParams) {
  try {
    const url = `/api/group/edit`
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
    const url = `/api/group?idGroup=${idGroup}`
    const response = await GET(url)

    group = await response.json()
  } catch (e) {
    throw new Error(`Erro ao buscar o grupo ${idGroup}`)
  }

  return group
}

export async function getGroupListService(userEmail: string, options: any) {
  let groups: t.Group[]

  if (!userEmail) {
    throw new Error(`userEmail vazio`)
  }

  try {
    const url = `${process.env.NEXTAUTH_URL}/api/group/slist?userEmail=${userEmail}`
    const response = await GET(url, options)

    groups = await response.json()
  } catch (e) {
    throw new Error('Erro ao buscar os grupos')
  }

  return groups
}

export async function getUsersGroupService(idGroup: string) {
  let usersGroup: t.UserGroup[]

  try {
    const url = `/api/group/users?idGroup=${idGroup}`
    const response = await GET(url)

    usersGroup = await response.json()
  } catch (e) {
    throw new Error('Erro ao buscar os usuários do grupo')
  }

  return usersGroup
}

export async function getGroupInvitesService(userEmail: string) {
  let groupInvites: t.GroupInvite[] | null = null

  try {
    const url = `/api/group/invites?userEmail=${userEmail}`
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
    const url = `/api/group/edit-invite`
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
    const url = `/api/group/remove-user?idGroup=${idGroup}&userEmail=${userEmail}`
    await REMOVE(url)
  } catch (e) {
    throw new Error('Erro ao excluir o usuário do grupo')
  }
}

export async function removeGroupService(idGroup: string) {
  try {
    const url = `/api/group/remove-group?idGroup=${idGroup}`
    await REMOVE(url)
  } catch (e) {
    throw new Error('Erro ao excluir o grupo')
  }
}

export async function exitGroupService(idGroup: string, userEmail: string) {
  try {
    const url = `/api/group/exit?idGroup=${idGroup}&userEmail=${userEmail}`
    await REMOVE(url)
  } catch (e) {
    throw new Error('Erro ao sair do grupo')
  }
}
