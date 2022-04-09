import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'

import { useAuth } from 'lib/auth/useAuth'
import { isAuthenticated } from 'lib/auth/isAuthenticated'

import NewGroup from 'components/_pages/NewGroup'

import { NewGroupProps } from 'components/_pages/NewGroup/types'

export default function NewGroupPage(props: NewGroupProps) {
  useAuth(props.user)

  return (
    <>
      <Head>
        <title>Novo grupo</title>
        <meta name="description" content="Novo grupo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NewGroup {...props} />
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const user = await isAuthenticated(context)

  return {
    props: { user }
  }
}
