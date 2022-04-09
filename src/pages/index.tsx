import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'

import { useAuth } from 'lib/auth/useAuth'
import { isAuthenticated } from 'lib/auth/isAuthenticated'

import Home from 'components/_pages/Home'

import { HomeProps } from 'components/_pages/Home/types'

export default function HomePage(props: HomeProps) {
  useAuth(props.user)

  return (
    <>
      <Head>
        <title>Div - Divisão fácil</title>
        <meta name="description" content="Home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Home {...props} />
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const user = await isAuthenticated(context)

  // @TODO buscar os grupos aqui

  return {
    props: { user }
  }
}
