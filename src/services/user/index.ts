import { User } from '@prisma/client'
import { CreateUserParams } from './types'

import prisma from 'lib/prisma'

export async function getUserByEmail(email: string) {
  let foundedUser: User | null = null

  try {
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (user) {
      foundedUser = user
    }
  } catch (e) {
    const message = 'Erro ao buscar um usuário por email'

    console.log(e)
    console.log(message)

    throw new Error(message)
  }

  return foundedUser
}

export async function createUser(data: CreateUserParams) {
  let createdUser: User | null = null

  try {
    createdUser = await prisma.user.create({ data })
  } catch (e) {
    console.log(e)
    console.log('Erro ao criar um usuário')
  }

  return createdUser
}
