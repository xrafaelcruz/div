import { useRef, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { v4 as uuid } from 'uuid'
import { FaPlus, FaTimes } from 'react-icons/fa'

import Input from 'components/Input'
import Button from 'components/Button'

import { createGroup } from 'services/group'
import { required } from 'utils/validations'

import { NewGroupProps, UserField, FormData } from './types'

import * as s from './styles'
import { FooterButtons } from 'components/Button/styles'

export default function NewGroup({ user }: NewGroupProps) {
  const didMount = useRef(false)
  const router = useRouter()

  const {
    register,
    unregister,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({ mode: 'onBlur' })

  const [users, setUsers] = useState<UserField[]>([])

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true
      setUsers([{ id: user.id, value: user.name }])
    }
  }, [user, setUsers])

  const appendUser = () => {
    setUsers([...users, { id: uuid(), value: '' }])
  }

  const removeUser = (id: string) => {
    const NewUsers = users?.filter((user) => user.id !== id)
    unregister(`userName.${id}`)
    setUsers(NewUsers)
  }

  const getUserError = (id: string) => {
    if (errors.userName && errors.userName[id]) {
      return errors.userName[id].message
    }

    return ''
  }

  const onSubmit = async (data: FormData) => {
    try {
      const createdGroup = await createGroup({
        idOwnerUser: user.id,
        name: data.groupName,
        users: Object.values(data.userName)
      })

      router.push(`/grupo?id=${createdGroup?.id}`)
    } catch (e) {
      console.log(e)
      alert(e)
    }
  }

  return (
    <s.Layout>
      <h1>Novo grupo</h1>

      <s.Form onSubmit={handleSubmit(onSubmit)}>
        <s.Fields>
          <Input
            placeholder="Nome"
            error={errors.groupName?.message}
            {...register('groupName', { required })}
          />

          <s.Users>
            <h2>Usuários</h2>

            {users?.map((user) => (
              <s.NewUser key={user.id}>
                <Input
                  placeholder="Novo membro"
                  defaultValue={user.value}
                  error={getUserError(user.id)}
                  {...register(`userName.${user.id}`, { required })}
                />

                <Button
                  onClick={() => removeUser(user.id)}
                  type="button"
                  variant="danger"
                  size="icon"
                >
                  <FaTimes />
                </Button>
              </s.NewUser>
            ))}

            <Button
              onClick={() => appendUser()}
              type="button"
              variant="primary"
              size="icon"
            >
              <FaPlus />
            </Button>
          </s.Users>
        </s.Fields>

        <FooterButtons>
          <Button
            onClick={() => router.back()}
            type="button"
            variant="secondary"
          >
            CANCELAR
          </Button>

          <Button type="submit" variant="primary">
            CRIAR
          </Button>
        </FooterButtons>
      </s.Form>
    </s.Layout>
  )
}
