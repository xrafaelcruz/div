import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'

import { isAuthenticated } from 'lib/auth'

import Notifications from 'components/_pages/Notifications'

import { NotificationsProps } from 'components/_pages/Notifications/types'

export default function NotificationsPage(props: NotificationsProps) {
  return (
    <>
      <Head>
        <title>Notificações</title>
        <meta name="description" content="Notificações" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Notifications {...props} />
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const user = await isAuthenticated(context)

  return {
    props: { user }
  }
}
