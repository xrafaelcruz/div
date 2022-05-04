import { useRouter } from 'next/router'

import useGroup from 'services/group/hooks/useGroup'

import Layout from 'components/Layout'
import Button from 'components/Button'
import GroupHeader from 'components/GroupHeader'
import GroupExpenses from 'components/GroupExpenses'

import * as s from './styles'
import * as t from './types'

export default function Group({ user }: t.GroupProps) {
  const router = useRouter()
  const { id } = router.query

  const { group, expenses } = useGroup({
    idGroup: id as string,
    hasExpenses: true
  })

  return (
    <Layout user={user}>
      <s.Main>
        <GroupHeader group={group} />

        <s.Buttons>
          {/* <Button type="button" variant="outlined">
            Membros
          </Button> */}
          <Button
            type="button"
            variant="outlined"
            onClick={() => router.push(`/pagamentos?idGrupo=${id}`)}
          >
            Resultados
          </Button>

          {user.email === group?.ownerUserEmail && (
            <Button
              type="button"
              variant="outlined"
              onClick={() => router.push(`/editar-grupo?id=${id}`)}
            >
              Editar
            </Button>
          )}
        </s.Buttons>

        <s.Button
          type="button"
          variant="primary"
          size="big"
          onClick={() => router.push(`/nova-despesa?idGrupo=${id}`)}
        >
          NOVA DESPESA
        </s.Button>

        <GroupExpenses user={user} expenses={expenses} />
      </s.Main>
    </Layout>
  )
}
