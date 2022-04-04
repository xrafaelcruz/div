import { GetServerSidePropsContext } from 'next'
import { signOut } from 'next-auth/react'
import Head from 'next/head'

import isAuthenticated from 'auth/utils/isAuthenticated'

import { HomeProps } from 'components/pages/Home/types'

export default function Home({ user }: HomeProps) {
  const handleSignout = () => {
    signOut()
  }

  console.log('user', user)

  return (
    <>
      <Head>
        <title>Div - Divisão fácil</title>
        <meta name="description" content="Home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Home</h1>

        <button onClick={handleSignout} type="button">
          Sign out
        </button>
      </main>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const user = await isAuthenticated(context)

  return {
    props: { user }
  }
}
