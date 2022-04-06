import { getSession } from 'next-auth/react'
import { GetServerSidePropsContext } from 'next'

import { createUser, getUserByEmail } from 'services/users'
import { normalizeUser } from 'auth/utils/normalize'

function goToLogin(context: GetServerSidePropsContext) {
  context.res.writeHead(302, { Location: '/login' })
  context.res.end()

  return null
}

export default async function isAuthenticated(
  context: GetServerSidePropsContext
) {
  const session = await getSession(context)
  console.log('session.user?.email', session?.user?.email)

  if (!session || !session.user?.email) {
    return goToLogin(context)
  }

  const foundedUser = await getUserByEmail(session.user.email)

  console.log('foundedUser', foundedUser)

  if (foundedUser) {
    return normalizeUser(foundedUser)
  }

  const createdUser = await createUser({
    email: session.user.email,
    name: session.user.name || '',
    description: '',
    password: '',
    photo: session.user.image || '',
    pix: ''
  })

  if (!createdUser) {
    return goToLogin(context)
  }

  return normalizeUser(createdUser)
}
