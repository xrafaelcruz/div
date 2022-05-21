import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'

import { isAuthenticated } from 'lib/auth'

import Home from 'components/_pages/Home'

import { HomeProps } from 'components/_pages/Home/types'

export default function HomePage(props: HomeProps) {
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
