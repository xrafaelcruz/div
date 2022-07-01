import Head from 'next/head'
import useIsAuthenticated from 'lib/auth/hooks/useIsAuthenticated'
import Home from 'components/_pages/Home'

export default function HomePage() {
  const { user } = useIsAuthenticated()

  if (!user) return

  return (
    <>
      <Head>
        <title>Div - Divisão fácil</title>
        <meta name="description" content="Home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Home user={user} />
    </>
  )
}
