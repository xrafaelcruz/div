import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'

import { isAuthenticated } from 'lib/auth'
import { getGroupListService } from 'services/group'

import Home from 'components/_pages/Home'

import { HomeProps } from 'components/_pages/Home/types'

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
  // const groups = await getGroupListService(context, user?.email)

  return {
    props: { user, groups: [] }
  }
}
