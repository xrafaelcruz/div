import { useState } from 'react'
import { useRouter } from 'next/router'

import Modal from 'components/Modal'
import { deleteExpenseService } from 'services/expense'

import * as s from './styles'
import * as t from './types'

const RemoveExpense = ({ idExpense }: t.RemoveExpenseProps) => {
  const router = useRouter()

  const [modalOpen, setModalOpen] = useState(false)

  const handleRemoveExpense = () => {
    setModalOpen(true)
  }

  const modalOnClickYes = async () => {
    try {
      if (idExpense) {
        await deleteExpenseService(idExpense)
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
      {idExpense && (
        <s.Button type="button" variant="danger" onClick={handleRemoveExpense}>
          Excluir
        </s.Button>
      )}

      {idExpense && modalOpen && (
        <Modal
          text="Tem certeza que quer excluir a despesa"
          onClickNo={modalOnClickNo}
          onClickYes={modalOnClickYes}
        />
      )}
    </>
  )
}

export default RemoveExpense
