import { useRef, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useForm, Controller } from 'react-hook-form'
import { FaPlus, FaTimes } from 'react-icons/fa'

import Input from 'components/Input'
import Select from 'components/Select'
import Button from 'components/Button'

import { required } from 'utils/validations'
import { currencyMask, removeCurrencyMask } from 'utils/masks/currency'
import { createExpense } from 'services/expense'
import useUserGroups from 'services/group/hooks/useUserGroups'
import useMembersOfGroup from 'services/group/hooks/useMembersOfGroup'

import { NewExpenseProps, MemberField, FormData } from './types'

import * as s from './styles'
import { FooterButtons } from 'components/Button/styles'

export default function NewExpense({ user }: NewExpenseProps) {
  const { userGroups } = useUserGroups({ user })
  const { membersOfGroup, getMembersOfGroup } = useMembersOfGroup()

  const [members, setMembers] = useState([])

  const router = useRouter()

  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({ mode: 'onBlur' })

  // const appendMember = () => {
  //   setMembers([...members, { id: uuid(), value: '' }])
  // }

  const onSubmit = async (data: FormData) => {
    try {
      const valueNumber = removeCurrencyMask(data.value)

      console.log({
        userName: data.payerUserName,
        // idPayerUser: '',
        idGroup: data.idGroup,
        name: data.name,
        value: valueNumber,
        description: data.description,
        type: '',
        members
      })
      // await createExpense({
      //   userName: data.payerUserName,
      //   // idPayerUser: '',
      //   idGroup: data.idGroup,
      //   name: data.name,
      //   value: valueNumber,
      //   description: data.description,
      //   type: '',
      //   members
      // })

      // Abrir a modal para confirma se quer criar outra
      // se sim, reseta os campos
      // se não, router.back()
    } catch (e) {
      console.log(e)
      alert(e)
    }
  }

  console.log('membersOfGroup', membersOfGroup)

  return (
    <s.Layout>
      <h1>Nova despesa</h1>

      <s.Form onSubmit={handleSubmit(onSubmit)}>
        <s.Fields>
          <Controller
            control={control}
            name="idGroup"
            rules={{ required }}
            render={({ field: { onChange, ...fieldProps } }) => (
              <Select
                {...fieldProps}
                error={errors.idGroup?.message}
                onChange={(event) => {
                  getMembersOfGroup(event.target.value, user.name)
                  onChange(event)
                }}
              >
                <option value="">Selecione o grupo</option>
                {userGroups?.map((userGroup) => (
                  <option value={userGroup.group.id} key={userGroup.group.id}>
                    {userGroup.group.name}
                  </option>
                ))}
              </Select>
            )}
          />

          <Input
            placeholder="Título"
            error={errors.name?.message}
            {...register('name', { required })}
          />

          <Input
            placeholder="Valor R$"
            error={errors.value?.message}
            {...register('value', { required })}
            onChange={(event) => {
              event.target.value = currencyMask(event.target.value)
            }}
          />

          <Input placeholder="Descrição" {...register('description')} />

          <s.PayerUser>
            <h2>Quem pagou</h2>

            <Select
              {...register('payerUserName', { required })}
              error={errors.payerUserName?.message}
            >
              <option value="">Selecione o membro</option>
              <option value={user.name}>{user.name}</option>
              {membersOfGroup?.map((member) => (
                <option value={member.userName} key={member.id}>
                  {member.userName}
                </option>
              ))}
            </Select>
          </s.PayerUser>

          <s.Members>
            <h2>Membros</h2>

            <s.List>
              <s.Item>{user.name}</s.Item>

              {membersOfGroup?.map((member) => (
                <s.Item key={member.id}>{member.userName}</s.Item>
              ))}
            </s.List>
          </s.Members>
        </s.Fields>

        {/* Membros com check */}
        {/* Valor para cada um */}

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
