import { useEffect, useState } from 'react'
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import { getSession, signOut } from 'next-auth/react'
import { Session } from 'next-auth'
import { useRouter } from 'next/router'

import Login from 'components/_pages/Login'

type LoginPageProps = {
  session: Session
  envs: any
}

export default function LoginPage({ session, envs }: LoginPageProps) {
  const [renderPage, setRenderPage] = useState(false)

  console.log('envs', envs)

  const router = useRouter()
  const { forceLogout } = router.query

  useEffect(() => {
    const didMountFunction = async () => {
      if (!renderPage) {
        if (forceLogout) {
          await router.replace('/login', undefined, { shallow: true })
          await signOut({ callbackUrl: '/login' })
        } else if (session && typeof window !== undefined) {
          router.push('/')
        }

        if (!session) {
          setRenderPage(true)
        }
      }
    }

    didMountFunction()
  }, [renderPage, forceLogout, router, session])

  return (
    <>
      <Head>
        <title>Div - Login</title>
        <meta name="description" content="Login" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {renderPage && <Login />}
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)

  return {
    props: {
      session,
      envs: {
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        GOOGLE_SECRET: process.env.GOOGLE_SECRET,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        DATABASE_URL: process.env.DATABASE_URL
      }
    }
  }
}
