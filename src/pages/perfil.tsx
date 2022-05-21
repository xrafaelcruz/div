import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'

import { isAuthenticated } from 'lib/auth'

import Profile from 'components/_pages/Profile'

import { ProfileProps } from 'components/_pages/Profile/types'

export default function ProfilePage(props: ProfileProps) {
  return (
    <>
      <Head>
        <title>Perfil</title>
        <meta name="description" content="Perfil" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Profile {...props} />
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const user = await isAuthenticated(context)

  return {
    props: { user }
  }
}
