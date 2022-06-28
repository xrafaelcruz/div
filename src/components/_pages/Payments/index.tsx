import { useRouter } from 'next/router'

import Layout from 'components/Layout'
import Button from 'components/Button'
import GroupHeader from 'components/GroupHeader'
import GroupPayments from 'components/GroupPayments'

import * as s from './styles'
import * as t from './types'

export default function Payments({
  user,
  group,
  paymentsByExpenses,
  paymentsByUsers
}: t.PaymentsProps) {
  const router = useRouter()

  return (
    <Layout user={user}>
      <s.Main>
        <GroupHeader user={user} group={group} />

        {user.email === group?.ownerUserEmail && (
          <s.Buttons>
            <Button
              type="button"
              variant="outlined"
              onClick={() => router.push(`/editar-grupo?idGroup=${group.id}`)}
            >
              Editar grupo
            </Button>
          </s.Buttons>
        )}

        <GroupPayments
          user={user}
          paymentsByExpenses={paymentsByExpenses}
          paymentsByUsers={paymentsByUsers}
        />
      </s.Main>
    </Layout>
  )
}
