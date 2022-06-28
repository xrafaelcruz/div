import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'

import { isAuthenticated } from 'lib/auth'
import { getGroupService } from 'services/group'
import { getExpenseListService } from 'services/expense'

import Group from 'components/_pages/Group'

import { GroupProps } from 'components/_pages/Group/types'

export default function GroupPage(props: GroupProps) {
  return (
    <>
      <Head>
        <title>Grupo</title>
        <meta name="description" content="Detalhes do grupo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {props.group && props.expenses && <Group {...props} />}
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const user = await isAuthenticated(context)
  // const group = await getGroupService(context)
  // const expenses = await getExpenseListService(context)

  return {
    props: { user, group: null, expenses: null }
  }
}
