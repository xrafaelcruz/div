import Head from 'next/head'

import useIsAuthenticated from 'lib/auth/hooks/useIsAuthenticated'
import useGetGroup from 'services/group/hooks/useGetGroup'

import Group from 'components/_pages/Group'
import useGetExpenseList from 'services/expense/hooks/useGetExpenseList'

export default function GroupPage() {
  const { user } = useIsAuthenticated()
  const { group } = useGetGroup()
  const { expenses } = useGetExpenseList()

  return (
    <>
      <Head>
        <title>Grupo</title>
        <meta name="description" content="Detalhes do grupo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {user && group && expenses && (
        <Group user={user} group={group} expenses={expenses} />
      )}
    </>
  )
}
