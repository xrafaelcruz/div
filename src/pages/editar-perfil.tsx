import Head from 'next/head'
import useIsAuthenticated from 'lib/auth/hooks/useIsAuthenticated'
import EditProfile from 'components/_pages/EditProfile'

export default function EditProfilePage() {
  const { user } = useIsAuthenticated()

  return (
    <>
      <Head>
        <title>Editar Perfil</title>
        <meta name="description" content="Editar Perfil" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {user && <EditProfile user={user} />}
    </>
  )
}
