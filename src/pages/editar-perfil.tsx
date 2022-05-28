import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'

import { isAuthenticated } from 'lib/auth'

import EditProfile from 'components/_pages/EditProfile'

import { ProfileProps } from 'components/_pages/EditProfile/types'

export default function EditProfilePage(props: ProfileProps) {
  return (
    <>
      <Head>
        <title>Editar Perfil</title>
        <meta name="description" content="Editar Perfil" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <EditProfile {...props} />
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const user = await isAuthenticated(context)

  return {
    props: { user }
  }
}
