import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'

import isAuthenticated from 'auth/utils/isAuthenticated'

import NewGroup from 'components/pages/NewGroup'

import { NewGroupProps } from 'components/pages/NewGroup/types'

export default function NewGroupPage(props: NewGroupProps) {
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
