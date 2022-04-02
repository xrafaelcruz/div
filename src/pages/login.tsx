import { signIn, getSession } from 'next-auth/react'
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'

export default function Login() {
  const handleSignin = () => {
    signIn()
  }

  return (
    <>
      <Head>
        <title>Div - Login</title>
        <meta name="description" content="Login" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <button onClick={handleSignin} type="button">
          Sign in
        </button>
      </main>
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
