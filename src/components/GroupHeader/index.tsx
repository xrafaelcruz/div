import { useState } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify';

import Modal from 'components/Modal'

import { exitGroupService } from 'services/group'
import { convertToMoney } from 'utils/normalize'

import Button from 'components/Button'

import * as t from './types'
import * as s from './styles'

const GroupHeader = ({ user, group }: t.GroupHeaderProps) => {
  const router = useRouter()

  const [modalOpen, setModalOpen] = useState(false)

  if (!group) return <></>

  const handleExitGroup = () => {
    setModalOpen(true)
  }

  const modalOnClickYes = async () => {
    try {
      await exitGroupService(group.id, user.email)
      router.push('/')
    } catch (e) {
      toast.error('Não foi possível sair do grupo')
    }
  }

  const modalOnClickNo = () => {
    setModalOpen(false)
  }

  return (
    <>
      <s.Header>
        <s.Wrapper>
          <h1>{group?.name}</h1>

          <s.UsersCount>
            {group?.users.length}{' '}
            {`membro${group?.users.length !== 1 ? 's' : ''}`}
          </s.UsersCount>

          <s.Total>
            {group?.total ? `${convertToMoney(group?.total)}` : ''}
          </s.Total>

          <s.Description>{group?.description}</s.Description>
        </s.Wrapper>

        {user.email !== group.ownerUserEmail && (
          <Button type="button" variant="outlined" onClick={handleExitGroup}>
            Sair do grupo
          </Button>
        )}
      </s.Header>

      {group.id && modalOpen && (
        <Modal
          text="Tem certeza que quer sair do grupo"
          onClickNo={modalOnClickNo}
          onClickYes={modalOnClickYes}
        />
      )}
    </>
  )
}

export default GroupHeader
