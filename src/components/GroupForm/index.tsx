import { useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';

import Users from './Users'
import Input from 'components/Input'
import Button from 'components/Button'
import Textarea from 'components/Textarea'

import { createGroup, editGroupService } from 'services/group'
import { required } from 'utils/validations'
import { getDefaultValues } from './helpers'

import { GroupFormProps, UserField, FormData } from './types'

import * as s from './styles'
import { FooterButtons } from 'components/Button/styles'
import RemoveGroup from './RemoveGroup'

const GroupForm = ({ user, group }: GroupFormProps) => {
  const isEdit = !!group
  const router = useRouter()

  const { defaultValues, defaultUsers } = useMemo(
    () => getDefaultValues({ user, group }),
    [user, group]
  )

  const {
    watch,
    register,
    unregister,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    mode: 'onBlur',
    defaultValues
  })

  const [users, setUsers] = useState<UserField[]>([])

  const create = async (data: FormData) => {
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

    router.push(`/grupo?idGroup=${createdGroup?.id}`)
  }

  const edit = async (data: FormData) => {
    if (group) {
      const usersToEdit = data.email ? Object.values(data.email) : []

      await editGroupService({
        id: group?.id,
        name: data.name,
        description: data.description,
        emails: usersToEdit
      })

      router.push(`/grupo?idGroup=${group.id}`)
    }
  }

  const onSubmit = async (data: FormData) => {
    try {
      if (isEdit) {
        if (user.email === group?.ownerUserEmail) {
          edit(data)
        }
      } else {
        create(data)
      }
    } catch (e) {
      toast.error('Não foi possível excluir')
    }
  }

  return (
    <s.Layout user={user}>
      <h1>{isEdit ? 'Editar grupo' : 'Criar grupo'}</h1>

      <s.Form onSubmit={handleSubmit(onSubmit)}>
        <s.Fields>
          <Input
            label="Nome"
            error={errors.name?.message}
            {...register('name', { required })}
          />

          <Textarea
            label="Descrição"
            optional
            maxLength={500}
            {...register('description')}
          />

          <Users
            idGroup={group?.id}
            isEdit={isEdit}
            users={users}
            setUsers={setUsers}
            defaultUsers={defaultUsers}
            watch={watch}
            register={register}
            unregister={unregister}
            errors={errors}
          />
        </s.Fields>

        <FooterButtons>
          <RemoveGroup idGroup={group?.id} />

          <Button
            onClick={() => router.back()}
            type="button"
            variant="secondary"
          >
            CANCELAR
          </Button>

          <Button type="submit" variant="primary">
            {isEdit ? 'SALVAR' : 'CRIAR'}
          </Button>
        </FooterButtons>
      </s.Form>
    </s.Layout>
  )
}

export default GroupForm
