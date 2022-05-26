import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'

import { getUsersGroupService } from 'services/group'

import { UserGroup } from 'services/group/types'

import * as t from './types'
import * as s from './styles'

const GroupUsers = ({ user, ownerUserEmail }: t.GroupUsersProps) => {
  const router = useRouter()
  const { idGroup } = router.query

  const requestedUsers = useRef(false)
  const [usersGroup, setUsersGroup] = useState<UserGroup[]>()

  useEffect(() => {
    const request = async () => {
      try {
        const result = await getUsersGroupService(idGroup as string)
        setUsersGroup(result)
      } catch (e) {
        router.push('/')
      }
    }

    if (idGroup && !requestedUsers.current) {
      requestedUsers.current = true
      request()
    }
  }, [idGroup, router])

  return (
    <s.Section>
      <h2>Usuários do grupo</h2>

      <s.List>
        {usersGroup?.map((userGroup) => (
          <s.Item key={userGroup.user.id}>
            <s.Wrapper>
              {userGroup.user.email === ownerUserEmail && (
                <s.Info>
                  <s.Label>Administrador do grupo</s.Label>
                </s.Info>
              )}

              {userGroup.user.name ? (
                <s.Info>
                  <s.Label>Nome</s.Label> {userGroup.user.name}
                </s.Info>
              ) : (
                <s.Info>
                  <s.OBS>O usuário ainda não possuí conta no sistema</s.OBS>
                </s.Info>
              )}

              <s.Info>
                <s.Label>Email</s.Label> {userGroup.user.email}
              </s.Info>

              {userGroup.user.description && (
                <s.Info>
                  <s.Label>Descrição</s.Label> {userGroup.user.description}
                </s.Info>
              )}

              {userGroup.user.pix && (
                <s.Info>
                  <s.Label>PIX</s.Label> {userGroup.user.pix}
                </s.Info>
              )}
            </s.Wrapper>

            {userGroup.user?.photo && <s.Image src={userGroup.user.photo} />}
          </s.Item>
        ))}
      </s.List>
    </s.Section>
  )
}

export default GroupUsers
