import Head from 'next/head'

import useIsAuthenticated from 'lib/auth/hooks/useIsAuthenticated'
import useGetExpense from 'services/expense/hooks/useGetExpense'

import Expense from 'components/_pages/EditExpense'

export default function EditExpensePage() {
  const { user } = useIsAuthenticated()
  const { expense } = useGetExpense()

  return (
    <>
      <Head>
        <title>Despesa</title>
        <meta name="description" content="Detalhes da despesa" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {user && expense && <Expense user={user} expense={expense} />}
    </>
  )
}
