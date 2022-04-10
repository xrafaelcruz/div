import { useEffect, useState } from 'react'
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import { getSession, signOut } from 'next-auth/react'
import { Session } from 'next-auth'
import { useRouter } from 'next/router'

import Login from 'components/_pages/Login'

import { clearAuth } from 'lib/auth/utils'

type LoginPageProps = {
  session: Session
}

export default function LoginPage({ session }: LoginPageProps) {
  const [renderPage, setRenderPage] = useState(false)

  const router = useRouter()
  const { forceLogout } = router.query

  console.log('forceLogout', forceLogout)
  console.log('session', session)

  useEffect(() => {
    const didMountFunction = async () => {
      if (!renderPage) {
        if (forceLogout) {
          clearAuth()
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

  return { props: { session } }
}
