import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { FaPlus, FaTimes } from 'react-icons/fa'
import { toast } from 'react-toastify'

import Input from 'components/Input'
import Button from 'components/Button'
import Modal from 'components/Modal'

import { removeUserGroupService } from 'services/group'
import { required } from 'utils/validations'
import { getLoader } from 'lib/loader'

import * as s from './styles'
import * as t from './types'

const usersLimit = 12

const Users = ({
  idGroup,
  isEdit,
  users,
  setUsers,
  defaultUsers,
  watch,
  register,
  unregister,
  errors
}: t.UsersProps) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedUserToRemove, setSelectedUserToRemove] = useState('')

  const appendUser = () => {
    setUsers([...users, { id: uuid(), value: '' }])
  }

  const removeUserFromList = async (id: string) => {
    const NewUsers = users?.filter((user) => user.id !== id)
    unregister(`email.${id}`)
    setUsers(NewUsers)
  }

  const handleRemove = async (id: string) => {
    if (isEdit) {
      const founded = defaultUsers.find((user) => user.id === id)

      if (founded) {
        setSelectedUserToRemove(id)
        setModalOpen(true)
      } else {
        removeUserFromList(id)
      }
    } else {
      removeUserFromList(id)
    }
  }

  const getUserError = (id: string) => {
    if (errors.email && errors.email[id]) {
      return errors.email[id].message
    }

    return ''
  }

  const modalOnClickYes = async () => {
    try {
      getLoader()?.continuousStart()

      if (idGroup) {
        const id = selectedUserToRemove
        await removeUserGroupService(idGroup, watch(`email.${id}`))
        removeUserFromList(id)
      }
    } catch (e) {
      toast.error('Não foi possível excluir')
    } finally {
      getLoader()?.complete()
    }

    setModalOpen(false)
  }

  const modalOnClickNo = () => {
    setModalOpen(false)
  }

  const totalUsers = defaultUsers.length + users.length + 1
  const canShowButtonAdd = totalUsers < usersLimit

  return (
    <>
      <s.Users>
        <h2>
          Usuários <s.Max>({usersLimit} no máximo)</s.Max>
        </h2>

        <Input
          disabled
          type="email"
          placeholder="Digite o email do usuário"
          error={errors.emailLoggedUser?.message}
          {...register('emailLoggedUser', { required })}
        />

        {defaultUsers?.map((user) => (
          <s.NewUser key={user.id}>
            <Input type="email" defaultValue={user.value} disabled />
          </s.NewUser>
        ))}

        {users?.map((user) => (
          <s.NewUser key={user.id}>
            <Input
              type="email"
              placeholder="Digite o email do usuário"
              defaultValue={user.value}
              error={getUserError(user.id)}
              {...register(`email.${user.id}`, { required })}
            />

            <Button
              onClick={() => handleRemove(user.id)}
              type="button"
              variant="danger"
              size="icon"
            >
              <FaTimes />
            </Button>
          </s.NewUser>
        ))}

        {canShowButtonAdd && (
          <Button
            onClick={() => appendUser()}
            type="button"
            variant="primary"
            size="icon"
          >
            <FaPlus />
          </Button>
        )}
      </s.Users>

      {modalOpen && (
        <Modal
          text={`
            Tem certeza que quer excluir 
            ${watch(`email.${selectedUserToRemove}`)} 
            do grupo?
          `}
          onClickNo={modalOnClickNo}
          onClickYes={modalOnClickYes}
        />
      )}
    </>
  )
}

export default Users
