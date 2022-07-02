import Head from 'next/head'
import useIsAuthenticated from 'lib/auth/hooks/useIsAuthenticated'
import NewExpense from 'components/_pages/NewExpense'

export default function NewExpensePage() {
  const { user } = useIsAuthenticated()

  return (
    <>
      <Head>
        <title>Nova despesa</title>
        <meta name="description" content="Nova despesa" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {user && <NewExpense user={user} />}
    </>
  )
}
