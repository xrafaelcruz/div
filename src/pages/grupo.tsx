import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'

import { useAuth } from 'lib/auth/useAuth'
import { isAuthenticated } from 'lib/auth/isAuthenticated'

import Group from 'components/_pages/Group'

import { GroupProps } from 'components/_pages/Group/types'

export default function GroupPage(props: GroupProps) {
  useAuth(props.user)

  return (
    <>
      <Head>
        <title>Grupo</title>
        <meta name="description" content="Novo grupo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Group />
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const user = await isAuthenticated(context)

  return {
    props: { user }
  }
}
