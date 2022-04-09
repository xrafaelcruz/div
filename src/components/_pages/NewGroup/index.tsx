import { useRef, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { v4 as uuid } from 'uuid'
import { FaPlus, FaTimes } from 'react-icons/fa'

import Input from 'components/Input'
import Button from 'components/Button'

import { createGroup } from 'services/group'
import { required } from 'utils/validations'

import { NewGroupProps, MemberField, FormData } from './types'

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

  const [members, setMembers] = useState<MemberField[]>([])

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true
      setMembers([{ id: user.id, value: user.name }])
    }
  }, [user, setMembers])

  const appendMember = () => {
    setMembers([...members, { id: uuid(), value: '' }])
  }

  const removeMember = (id: string) => {
    const newMembers = members?.filter((member) => member.id !== id)
    unregister(`memberName.${id}`)
    setMembers(newMembers)
  }

  const getMemberError = (id: string) => {
    if (errors.memberName && errors.memberName[id]) {
      return errors.memberName[id].message
    }

    return ''
  }

  const onSubmit = async (data: FormData) => {
    try {
      const createdGroup = await createGroup({
        idOwnerUser: user.id,
        name: data.groupName,
        members: Object.values(data.memberName)
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

          <s.Members>
            <h2>Membros</h2>

            {members?.map((member) => (
              <s.NewMember key={member.id}>
                <Input
                  placeholder="Novo membro"
                  defaultValue={member.value}
                  error={getMemberError(member.id)}
                  {...register(`memberName.${member.id}`, { required })}
                />

                <Button
                  onClick={() => removeMember(member.id)}
                  type="button"
                  variant="danger"
                  size="icon"
                >
                  <FaTimes />
                </Button>
              </s.NewMember>
            ))}

            <Button
              onClick={() => appendMember()}
              type="button"
              variant="primary"
              size="icon"
            >
              <FaPlus />
            </Button>
          </s.Members>
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
