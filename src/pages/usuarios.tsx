import Head from 'next/head'
import { useRouter } from 'next/router'

import useIsAuthenticated from 'lib/auth/hooks/useIsAuthenticated'
import useGetGroup from 'services/group/hooks/useGetGroup'
import useGetUsersGroup from 'services/group/hooks/useGetUsersGroup'

import GroupUsers from 'components/_pages/Users'

export default function UsersPage() {
  const router = useRouter()
  const { idGroup } = router.query

  const { user } = useIsAuthenticated()
  const { group } = useGetGroup()
  const { usersGroup } = useGetUsersGroup(idGroup as string)

  if (!user || !group || !usersGroup) return

  return (
    <>
      <Head>
        <title>Usuários do grupo</title>
        <meta name="description" content="Usuários do grupo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <GroupUsers user={user} group={group} usersGroup={usersGroup} />
    </>
  )
}
