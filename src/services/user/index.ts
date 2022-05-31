import { User } from '@prisma/client'

import prisma from 'lib/prisma'
import { PUT } from 'lib/api'

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
