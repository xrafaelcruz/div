import { User } from 'services/user/types'
import { API_URL, PUT, POST, GETClient } from 'lib/api'

import * as t from './types'

export async function updateUserService({
  idUser,
  name,
  pix,
  description
}: t.UpdateUserProps) {
  try {
    const url = `/api/user/edit`
    await PUT(url, { idUser, name, pix, description })
  } catch (e) {
    throw new Error('Erro ao atualizar o usuário')
  }
}

export async function getUserByEmailService(userEmail: string) {
  return GETClient<User>({
    url: `${API_URL}/user?userEmail=${userEmail}`,
    requiredParams: !!userEmail
  })
}

export async function createUserService(params: t.CreateUserParams) {
  let createdUser: User | null = null

  try {
    const url = `${API_URL}/user/create`
    const response = await POST(url, params)

    createdUser = await response.json()
  } catch (e) {
    window.location.href = '/login'
  }

  return createdUser
}
