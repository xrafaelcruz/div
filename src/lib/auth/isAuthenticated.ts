import { getSession } from 'next-auth/react'
import { GetServerSidePropsContext } from 'next'
import { User as PrismaUser } from '@prisma/client'

import { createUser, getUserByEmail } from 'services/user'
import { User } from 'services/user/types'

function normalizeUser(user: PrismaUser): User {
  return {
    ...user,
    createdAt: user?.createdAt.toISOString() || '',
    updatedAt: user?.updatedAt.toISOString() || ''
  }
}

function goToLogin(context: GetServerSidePropsContext) {
  context.res.writeHead(302, { Location: '/login' })
  context.res.end()

  return null
}

export async function isAuthenticated(context: GetServerSidePropsContext) {
  const session = await getSession(context)
  console.log('session.user?.email', session?.user?.email)

  if (!session || !session.user?.email) {
    return goToLogin(context)
  }

  try {
    const foundedUser = await getUserByEmail(session.user.email)

    console.log('foundedUser', foundedUser)

    if (foundedUser) {
      return normalizeUser(foundedUser)
    }
  } catch (e) {
    return goToLogin(context)
  }

  try {
    const createdUser = await createUser({
      email: session.user.email,
      name: session.user.name || '',
      description: '',
      password: '',
      photo: session.user.image || '',
      pix: ''
    })

    console.log('createdUser', createdUser)

    if (createdUser) {
      return normalizeUser(createdUser)
    }
  } catch (e) {
    return goToLogin(context)
  }
}
