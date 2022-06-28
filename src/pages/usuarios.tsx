import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'

import { isAuthenticated } from 'lib/auth'
import { getGroupService, getUsersGroupServiceSSR } from 'services/group'

import GroupUsers from 'components/_pages/Users'

import { UsersProps } from 'components/_pages/Users/types'

export default function UsersPage(props: UsersProps) {
  return (
    <>
      <Head>
        <title>Usuários do grupo</title>
        <meta name="description" content="Usuários do grupo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <GroupUsers {...props} />
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const user = await isAuthenticated(context)
  const group = await getGroupService(context)
  const usersGroup = await getUsersGroupServiceSSR(context)

  return {
    props: { user, group, usersGroup }
  }
}
