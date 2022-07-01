import Head from 'next/head'

import useIsAuthenticated from 'lib/auth/hooks/useIsAuthenticated'

import Profile from 'components/_pages/Profile'

export default function ProfilePage() {
  const { user } = useIsAuthenticated()

  return (
    <>
      <Head>
        <title>Perfil</title>
        <meta name="description" content="Perfil" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {user && <Profile user={user} />}
    </>
  )
}
