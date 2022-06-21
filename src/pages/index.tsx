import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'

import { isAuthenticated } from 'lib/auth'
import { getGroupListService } from 'services/group'

import Home from 'components/_pages/Home'

import { HomeProps } from 'components/_pages/Home/types'
import { Group } from 'services/group/types'

export default function HomePage(props: HomeProps) {
  return (
    <>
      <Head>
        <title>Div - Divisão fácil</title>
        <meta name="description" content="Home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Home {...props} />
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const user = await isAuthenticated(context)

  let groups: Group[] = []

  try {
    if (user) {
      groups = await getGroupListService(user.email, {
        headers: { Cookie: context.req.headers.cookie } as HeadersInit
      })
    }
  } catch (e) {
    context.res.writeHead(302, { Location: '/500' }).end()
  }

  return {
    props: { user, groups }
  }
}
