import { useRouter } from 'next/router'

import Layout from 'components/Layout'
import Button from 'components/Button'
import GroupHeader from 'components/GroupHeader'
import GroupExpenses from 'components/GroupExpenses'

import * as s from './styles'
import * as t from './types'

export default function Group({ user, group, expenses }: t.GroupProps) {
  const router = useRouter()

  return (
    <Layout user={user}>
      <s.Main>
        <GroupHeader group={group} user={user} />

        <s.Buttons>
          <Button
            type="button"
            variant="outlined"
            onClick={() => router.push(`/usuarios?idGroup=${group.id}`)}
          >
            Usuários
          </Button>

          <Button
            type="button"
            variant="outlined"
            onClick={() => router.push(`/pagamentos?idGroup=${group.id}`)}
          >
            Resultados
          </Button>

          {user.email === group?.ownerUserEmail && (
            <Button
              type="button"
              variant="outlined"
              onClick={() => router.push(`/editar-grupo?idGroup=${group.id}`)}
            >
              Editar
            </Button>
          )}
        </s.Buttons>

        <s.Button
          type="button"
          variant="primary"
          size="medium"
          onClick={() => router.push(`/nova-despesa?idGroup=${group.id}`)}
        >
          NOVA DESPESA
        </s.Button>

        <GroupExpenses user={user} expenses={expenses} />
      </s.Main>
    </Layout>
  )
}
