import { GetServerSidePropsContext } from 'next'
import { Group as PrismaGroup } from '@prisma/client'

import { API_URL, POST, GET, PUT, REMOVE, GETSSR, GETClient } from 'lib/api'
import { InviteStatus } from 'lib/prisma/constants'

import * as t from './types'

export async function createGroup(params: t.CreateGroupParams) {
  let createdGroup: PrismaGroup | null = null

  try {
    const url = `${API_URL}/group/create`
    const response = await POST(url, params)

    createdGroup = await response.json()
  } catch (e) {
    throw new Error('Erro ao criar o grupo')
  }

  return createdGroup
}

export async function editGroupService(params: t.EditGroupParams) {
  try {
    const url = `${API_URL}/group/edit`
    await PUT(url, params)
  } catch (e) {
    throw new Error('Erro ao editar o grupo')
  }
}

export async function getGroupService(idGroup: string | string[] | undefined) {
  return GETClient<t.GroupDetails>({
    url: `${API_URL}/group?idGroup=${idGroup}`,
    requiredParams: !!idGroup
  })
}

export async function getGroupListService(userEmail?: string) {
  return GETClient<t.Group[]>({
    url: `${API_URL}/group/list?userEmail=${userEmail}`,
    requiredParams: !!userEmail
  })
}

export async function getUsersGroupService(
  idGroup: string,
  options?: RequestInit
) {
  let usersGroup: t.UserGroup[] | undefined

  try {
    const url = `${API_URL}/group/users?idGroup=${idGroup}`

    const response = await GET(url, options)

    if (!response.ok) {
      throw new Error()
    }

    usersGroup = await response.json()
  } catch (e) {
    throw new Error('Não foi possível buscar os usuários do grupo')
  }

  return usersGroup || null
}

export async function getUsersGroupServiceSSR(
  context: GetServerSidePropsContext
) {
  const { idGroup } = context.query

  return GETSSR<t.UserGroup[]>({
    context,
    url: `${API_URL}/group/users?idGroup=${idGroup}`,
    requiredParams: !!idGroup
  })
}

export async function getGroupInvitesService(
  context: GetServerSidePropsContext,
  userEmail?: string
) {
  return GETSSR<t.GroupInvite[]>({
    context,
    url: `${API_URL}/group/invites?userEmail=${userEmail}`,
    requiredParams: !!userEmail
  })
}

export async function updateUserGroupInvitesService(
  idUserGroup: string,
  status: keyof typeof InviteStatus
) {
  try {
    const url = `${API_URL}/group/edit-invite`
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
    const url = `${API_URL}/group/remove-user?idGroup=${idGroup}&userEmail=${userEmail}`
    await REMOVE(url)
  } catch (e) {
    throw new Error('Erro ao excluir o usuário do grupo')
  }
}

export async function removeGroupService(idGroup: string) {
  try {
    const url = `${API_URL}/group/remove-group?idGroup=${idGroup}`
    await REMOVE(url)
  } catch (e) {
    throw new Error('Erro ao excluir o grupo')
  }
}

export async function exitGroupService(idGroup: string, userEmail: string) {
  try {
    const url = `${API_URL}/group/exit?idGroup=${idGroup}&userEmail=${userEmail}`
    await REMOVE(url)
  } catch (e) {
    throw new Error('Erro ao sair do grupo')
  }
}
