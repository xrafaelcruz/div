import { useRef, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { v4 as uuid } from 'uuid'
import { FaPlus, FaTimes } from 'react-icons/fa'

import Input from 'components/Input'
import Button from 'components/Button'
import Textarea from 'components/Textarea'

import { createGroup } from 'services/group'
import { required } from 'utils/validations'

import { NewGroupProps, UserField, FormData } from './types'

import * as s from './styles'
import { FooterButtons } from 'components/Button/styles'

export default function NewGroup({ user }: NewGroupProps) {
  const router = useRouter()

  const {
    register,
    unregister,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    mode: 'onBlur',
    defaultValues: {
      emailLoggedUser: user.email
    }
  })

  const [users, setUsers] = useState<UserField[]>([])

  const appendUser = () => {
    setUsers([...users, { id: uuid(), value: '' }])
  }

  const removeUser = (id: string) => {
    const NewUsers = users?.filter((user) => user.id !== id)
    unregister(`email.${id}`)
    setUsers(NewUsers)
  }

  const getUserError = (id: string) => {
    if (errors.email && errors.email[id]) {
      return errors.email[id].message
    }

    return ''
  }

  const onSubmit = async (data: FormData) => {
    try {
      const usersToCreation = [
        user.email,
        ...(data.email ? Object.values(data.email) : [])
      ]

      const createdGroup = await createGroup({
        ownerUserEmail: user.email,
        name: data.name,
        description: data.description,
        emails: usersToCreation
      })

      router.push(`/grupo?id=${createdGroup?.id}`)
    } catch (e) {
      console.log(e)
      alert(e)
    }
  }

  return (
    <s.Layout user={user}>
      <h1>Novo grupo</h1>

      <s.Form onSubmit={handleSubmit(onSubmit)}>
        <s.Fields>
          <Input
            placeholder="Nome"
            error={errors.name?.message}
            {...register('name', { required })}
          />

          <Textarea
            placeholder="Descrição (opcional)"
            {...register('description')}
          />

          <s.Users>
            <h2>Usuários</h2>

            <Input
              disabled
              type="email"
              placeholder="Digite o email do usuário"
              error={errors.emailLoggedUser?.message}
              {...register('emailLoggedUser', { required })}
            />

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
