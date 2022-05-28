import { User } from '@prisma/client'
import prisma from 'lib/prisma'
import * as t from './types'

async function updateUserEmail(user: t.SessionUser) {
  let result: User | null = null

  if (!user.email || !user.name) {
    return null
  }

  try {
    result = await prisma.user.update({
      where: {
        email: user.email
      },
      data: {
        name: user.name,
        photo: user.image || ''
      }
    })
  } catch (e) {
    const message = 'Erro ao atualizar o usuário'

    console.log(e)
    console.log(message)

    throw new Error(message)
  }

  return result
}

export async function getUserByEmail(user: t.SessionUser) {
  let result: User | null = null

  if (!user.email || !user.name) {
    return null
  }

  let foundedUser

  try {
    foundedUser = await prisma.user.findUnique({
      where: { email: user.email }
    })
  } catch (e) {
    const message = 'Erro ao buscar o usuário por email'

    console.log(e)
    console.log(message)

    throw new Error(message)
  }

  if (foundedUser && !foundedUser.name) {
    await updateUserEmail(user)
  } else if (foundedUser) {
    result = foundedUser
  }

  return result
}

export async function createUser(data: t.CreateUserParams) {
  let createdUser: User | null = null

  try {
    createdUser = await prisma.user.create({ data })
  } catch (e) {
    const message = 'Erro ao criar o usuário'

    console.log(e)
    console.log(message)

    throw new Error(message)
  }

  return createdUser
}
