import { toast } from 'react-toastify';

import { updateUserGroupInvitesService } from 'services/group'
import { InviteStatus } from 'lib/prisma/constants'

import Button from 'components/Button'
import Layout from 'components/Layout'

import * as s from './styles'
import * as t from './types'
import { useState } from 'react'

const Notifications = ({ user, invites }: t.NotificationsProps) => {
  const [groupInvites, setGroupInvites] = useState(invites)

  const removeGroupFromList = (idUserGroup: string) => {
    setGroupInvites((old) =>
      old.filter((userGroup) => userGroup.id !== idUserGroup)
    )
  }

  const handleUpdateInvite = async (
    idUserGroup: string,
    status: keyof typeof InviteStatus
  ) => {
    try {
      await updateUserGroupInvitesService(idUserGroup, status)
      removeGroupFromList(idUserGroup)
    } catch (e) {
      toast.error('Não foi possível executar essa operação')
    }
  }

  return (
    <Layout user={user}>
      <s.Wrapper>
        <h1>Convites</h1>

        {!!groupInvites?.length && (
          <s.List>
            {groupInvites.map((userGroup) => (
              <s.Item key={userGroup.id}>
                <strong>{userGroup.group.name}</strong>

                <s.Owner>Enviado por {userGroup.group.ownerUserEmail}</s.Owner>

                <s.Buttons>
                  <Button
                    type="button"
                    size="small"
                    variant="danger"
                    onClick={() => handleUpdateInvite(userGroup.id, 'canceled')}
                  >
                    Recusar
                  </Button>

                  <Button
                    type="button"
                    size="small"
                    variant="primary"
                    onClick={() => handleUpdateInvite(userGroup.id, 'accept')}
                  >
                    Aceitar
                  </Button>
                </s.Buttons>
              </s.Item>
            ))}
          </s.List>
        )}

        {!groupInvites?.length && (
          <s.NotFound>Você não possui convites</s.NotFound>
        )}
      </s.Wrapper>
    </Layout>
  )
}

export default Notifications
