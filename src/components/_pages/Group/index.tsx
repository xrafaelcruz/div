import { useRouter } from 'next/router'

import { ButtonLink } from 'components/Button'
import GroupHeader from 'components/GroupHeader'
import GroupExpenses from 'components/GroupExpenses'

import * as s from './styles'
import * as t from './types'

export default function Group({ user, group, expenses }: t.GroupProps) {
  const router = useRouter()

  return (
    <s.Main>
      <GroupHeader group={group} user={user} />

      <s.Buttons>
        <ButtonLink
          variant="outlined"
          href={`/usuarios?idGroup=${group.id}`}
          key={group.id}
        >
          Usuários
        </ButtonLink>

        <ButtonLink
          type="button"
          variant="outlined"
          href={`/pagamentos?idGroup=${group.id}`}
        >
          Resultados
        </ButtonLink>

        {user.email === group?.ownerUserEmail && (
          <ButtonLink
            type="button"
            variant="outlined"
            href={`/editar-grupo?idGroup=${group.id}`}
          >
            Editar
          </ButtonLink>
        )}
      </s.Buttons>

      <s.Button
        type="button"
        variant="primary"
        size="medium"
        href={`/nova-despesa?idGroup=${group.id}`}
      >
        NOVA DESPESA
      </s.Button>

      <GroupExpenses user={user} expenses={expenses} />
    </s.Main>
  )
}
