import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'

import isAuthenticated from 'auth/utils/isAuthenticated'

import Home from 'components/pages/Home'

import { HomeProps } from 'components/pages/Home/types'

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

  return {
    props: { user }
  }
}
