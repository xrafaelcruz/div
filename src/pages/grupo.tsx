import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

import isAuthenticated from 'auth/utils/isAuthenticated'

import { GroupProps } from 'components/pages/Group/types'

export default function GroupPage(props: GroupProps) {
  const router = useRouter()
  console.log('router.query', router.query)

  return (
    <>
      <Head>
        <title>Grupo</title>
        <meta name="description" content="Novo grupo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const user = await isAuthenticated(context)

  return {
    props: { user }
  }
}
