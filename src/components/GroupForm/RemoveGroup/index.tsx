import { useState } from 'react'
import { useRouter } from 'next/router'

import Modal from 'components/Modal'
import { removeGroupService } from 'services/group'

import * as s from './styles'
import * as t from './types'

const RemoveGroup = ({ idGroup }: t.RemoveGroupProps) => {
  // @TODO verificar se o usuário logado é o dono do gurpo para executar essa ação
  const router = useRouter()

  const [modalOpen, setModalOpen] = useState(false)

  const handleRemoveGroup = () => {
    setModalOpen(true)
  }

  const modalOnClickYes = async () => {
    try {
      if (idGroup) {
        await removeGroupService(idGroup)
        router.push('/')
      }
    } catch (e) {
      console.log(e)
      alert(e)
    }
  }

  const modalOnClickNo = () => {
    setModalOpen(false)
  }

  return (
    <>
      {idGroup && (
        <s.Button type="button" variant="danger" onClick={handleRemoveGroup}>
          Excluir
        </s.Button>
      )}

      {idGroup && modalOpen && (
        <Modal
          text="Tem certeza que quer excluir o grupo"
          onClickNo={modalOnClickNo}
          onClickYes={modalOnClickYes}
        />
      )}
    </>
  )
}

export default RemoveGroup