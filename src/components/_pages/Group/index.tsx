import { useRouter } from 'next/router'

import useGroup from 'services/group/hooks/useGroup'

import Layout from 'components/Layout'
import Button from 'components/Button'
import GroupHeader from 'components/GroupHeader'
import GroupExpenses from 'components/GroupExpenses'

import * as s from './styles'

export default function Group() {
  const router = useRouter()
  const { id } = router.query

  const { group, expenses } = useGroup({
    idGroup: id as string,
    hasExpenses: true
  })

  return (
    <Layout>
      <s.Main>
        <GroupHeader group={group} />

        <s.Buttons>
          <Button type="button" variant="outlined">
            Membros
          </Button>
          <Button type="button" variant="outlined">
            Pagamentos
          </Button>
        </s.Buttons>

        <s.Button type="button" variant="primary" size="big">
          NOVA DESPESA
        </s.Button>

        <GroupExpenses expenses={expenses} />
      </s.Main>
    </Layout>
  )
}
