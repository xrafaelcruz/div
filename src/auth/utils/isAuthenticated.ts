import { getSession } from 'next-auth/react'
import { GetServerSidePropsContext } from 'next'

const isAuthenticated = async (context: GetServerSidePropsContext) => {
  const session = await getSession(context)

  console.log('isAuthenticated', isAuthenticated)

  if (!session) {
    context.res.writeHead(302, { Location: '/login' })
    context.res.end()

    return null
  }

  // @TODO buscar os dados do usuário no banco, de acordo com o email que deve ser unique
  // Se o usuário não existir, deve ser criado um

  return session.user
}

export default isAuthenticated
