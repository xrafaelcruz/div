import { useRouter } from 'next/router'

import useGroup from 'services/group/hooks/useGroup'

import Layout from 'components/Layout'
import Button from 'components/Button'
import GroupHeader from 'components/GroupHeader'
import GroupPayments from 'components/GroupPayments'

import * as s from './styles'
import * as t from './types'

export default function Payments({ user }: t.PaymentsProps) {
  const router = useRouter()
  const { idGroup } = router.query

  const { group, payments } = useGroup({
    idGroup: idGroup as string
  })

  return (
    <Layout user={user}>
      <s.Main>
        <GroupHeader user={user} group={group} />

        <s.Buttons>
          <Button
            type="button"
            variant="outlined"
            onClick={() => router.push(`/editar-grupo?id=${idGroup}`)}
          >
            Editar grupo
          </Button>
        </s.Buttons>

        <GroupPayments user={user} payments={payments} />
      </s.Main>
    </Layout>
  )
}
