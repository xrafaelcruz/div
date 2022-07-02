import Head from 'next/head'

import useIsAuthenticated from 'lib/auth/hooks/useIsAuthenticated'
import useGetGroup from 'services/group/hooks/useGetGroup'

import EditGroup from 'components/_pages/EditGroup'

export default function EditGroupPage() {
  const { user } = useIsAuthenticated()
  const { group } = useGetGroup()

  return (
    <>
      <Head>
        <title>Novo grupo</title>
        <meta name="description" content="Novo grupo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {user && group && <EditGroup user={user} group={group} />}
    </>
  )
}
