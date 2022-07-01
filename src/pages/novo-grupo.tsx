import Head from 'next/head'
import useIsAuthenticated from 'lib/auth/hooks/useIsAuthenticated'
import NewGroup from 'components/_pages/NewGroup'

export default function NewGroupPage() {
  const { user } = useIsAuthenticated()

  return (
    <>
      <Head>
        <title>Novo grupo</title>
        <meta name="description" content="Novo grupo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {user && <NewGroup user={user} />}
    </>
  )
}
