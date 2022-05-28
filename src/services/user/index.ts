import { User } from '@prisma/client'

import prisma from 'lib/prisma'
import { PUT } from 'lib/api'

import * as t from './types'

export async function updateUserService({
  idUser,
  pix,
  description
}: t.UpdateUserProps) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/user/edit`
    await PUT(url, { idUser, pix, description })
  } catch (e) {
    throw new Error('Erro ao atualizar o usuário')
  }
}
