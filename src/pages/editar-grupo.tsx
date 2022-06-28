import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'

import { isAuthenticated } from 'lib/auth'
import { getGroupService } from 'services/group'

import EditGroup from 'components/_pages/EditGroup'

import * as t from 'components/_pages/EditGroup/types'

export default function EditGroupPage(props: t.EditGroupProps) {
  return (
    <>
      <Head>
        <title>Novo grupo</title>
        <meta name="description" content="Novo grupo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <EditGroup {...props} />
    </>
  )
}

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const user = await isAuthenticated(context)
//   // const group = await getGroupService(context)

//   return {
//     props: { user, group: null }
//   }
// }
