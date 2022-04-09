import { getSession } from 'next-auth/react'
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'

import Login from 'components/_pages/Login'

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Div - Login</title>
        <meta name="description" content="Login" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Login />
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)

  if (session) {
    context.res.writeHead(302, { Location: '/' })
    context.res.end()
  }

  return { props: {} }
}
