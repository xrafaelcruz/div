import Head from 'next/head'

import useIsAuthenticated from 'lib/auth/hooks/useIsAuthenticated'

import Notifications from 'components/_pages/Notifications'

export default function NotificationsPage() {
  const { user } = useIsAuthenticated()

  return (
    <>
      <Head>
        <title>Notificações</title>
        <meta name="description" content="Notificações" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {user && <Notifications user={user} />}
    </>
  )
}
