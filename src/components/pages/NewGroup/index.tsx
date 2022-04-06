import { useRef, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { v4 as uuid } from 'uuid'

import Layout from 'components/Layout'
import Input from 'components/Input'
import Button from 'components/Button'

import { required } from 'utils/validations'

import { NewGroupProps, MemberField } from './types'

import * as s from './styles'

export default function NewGroup({ user }: NewGroupProps) {
  const didMount = useRef(false)
  const router = useRouter()

  const {
    register,
    unregister,
    handleSubmit,
    formState: { errors }
  } = useForm<any>()

  const [members, setMembers] = useState<MemberField[]>([])

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true
      setMembers([{ id: uuid(), value: '' }])
    }
  }, [setMembers])

  const appendMember = () => {
    setMembers([...members, { id: uuid(), value: '' }])
  }

  const removeMember = (id: string) => {
    const newMembers = members?.filter((member) => member.id !== id)
    unregister(`memberName.${id}`)
    setMembers(newMembers)
  }

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <Layout>
      <s.Main>
        <h1>Novo grupo</h1>

        <s.Form onSubmit={handleSubmit(onSubmit)}>
          <s.Fields>
            <Input
              placeholder="Nome"
              error={errors.groupName?.message}
              {...register('groupName', { required })}
            />

            <h2>Membros</h2>

            {members?.map((member) => (
              <s.NewMember key={member.id}>
                <Input
                  placeholder="Novo membro"
                  defaultValue={member.value}
                  error={
                    errors.memberName && errors.memberName[member.id]
                      ? errors.memberName[member.id].message
                      : ''
                  }
                  {...register(`memberName.${member.id}`, { required })}
                />
                <Button
                  onClick={() => removeMember(member.id)}
                  type="button"
                  variant="secondary"
                >
                  X
                </Button>
              </s.NewMember>
            ))}

            <Button
              onClick={() => appendMember()}
              type="button"
              variant="primary"
            >
              +
            </Button>
          </s.Fields>

          <s.Buttons>
            <Button
              onClick={() => router.back()}
              type="button"
              variant="secondary"
            >
              CANCELAR
            </Button>

            <Button type="submit" variant="primary">
              SALVAR
            </Button>
          </s.Buttons>
        </s.Form>
      </s.Main>
    </Layout>
  )
}
