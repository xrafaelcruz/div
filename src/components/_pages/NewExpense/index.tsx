import { useState, ChangeEvent } from 'react'
import { useRouter } from 'next/router'
import { useForm, Controller } from 'react-hook-form'

import Input from 'components/Input'
import Select from 'components/Select'
import Button from 'components/Button'

import { required } from 'utils/validations'
import { currencyMask, removeCurrencyMask } from 'utils/masks/currency'
import { createExpense } from 'services/expense'
import useGroup from 'services/group/hooks/useGroup'
import useMembersOfGroup from 'services/group/hooks/useMembersOfGroup'

import { NewExpenseProps, MemberField, FormData } from './types'

import * as s from './styles'
import { FooterButtons } from 'components/Button/styles'
import { MemberOfGroup } from 'services/group/types'

export default function NewExpense({ user }: NewExpenseProps) {
  const router = useRouter()

  const { groups } = useGroup({ user })
  const { membersOfGroup, getMembersOfGroup } = useMembersOfGroup()

  const createMemberFields = (members: MemberOfGroup[] | undefined) => {
    const membersObject: MemberField = {
      [user.id]: {
        userName: user.name,
        value: false
      }
    }

    members?.forEach((member) => {
      membersObject[member.id] = {
        userName: member.userName,
        value: false
      }
    })

    return membersObject
  }

  const updateMemberField =
    (id: string) => (e: ChangeEvent<HTMLInputElement>) => {
      memberFields[id].value = e.target.checked
      setMemberFields(memberFields)
    }

  const [memberFields, setMemberFields] = useState(
    createMemberFields(membersOfGroup)
  )

  const prepareMembersToCreation = (payerUserName: string) => {
    const members = Object.values(memberFields)
      .filter((member) => {
        if (member.userName !== payerUserName && member.value === true) {
          return true
        }
      })
      .map((member) => member.userName)

    members.push(payerUserName)

    return members
  }

  const handleChangeGroup =
    (onChange: any) => async (e: ChangeEvent<HTMLSelectElement>) => {
      onChange(e)
      const members = await getMembersOfGroup(e.target.value, user.name)
      setMemberFields(createMemberFields(members))
    }

  const {
    watch,
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({ mode: 'onBlur' })

  const canRenderMemberInList = (userName: string) => {
    return userName !== watch('payerUserName')
  }

  const onSubmit = async (data: FormData) => {
    try {
      const value = removeCurrencyMask(data.value)

      const members = prepareMembersToCreation(data.payerUserName)

      await createExpense({
        userName: data.payerUserName,
        // idPayerUser: '',
        idGroup: data.idGroup,
        name: data.name,
        value,
        description: data.description,
        type: '',
        members
      })

      router.back()
      // Abrir a modal para confirma se quer criar outra
      // se sim, reseta os campos
      // se não, router.back()
    } catch (e) {
      console.log(e)
      alert(e)
    }
  }

  // const getValuePerMember = () => {
  //   const prepareMembersToCreation
  //   const number = Number(watch('value')) /

  //   const maskedValue = currencyMask(number)

  //   return maskedValue;
  // }

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
                onChange={handleChangeGroup(onChange)}
              >
                <option value="">Selecione o grupo</option>
                {groups?.map((group) => (
                  <option value={group.id} key={group.id}>
                    {group.name}
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
            <h2>Selecione quem irá dividir</h2>

            <s.List>
              {canRenderMemberInList(user.name) && (
                <s.Label htmlFor={user.id}>
                  <span>{user.name}</span>
                  <Input
                    type="checkbox"
                    id={user.id}
                    defaultChecked={memberFields[user.id]?.value}
                    onChange={updateMemberField(user.id)}
                  />
                </s.Label>
              )}

              {membersOfGroup?.map((member) => {
                if (!canRenderMemberInList(member.userName)) {
                  return
                }

                return (
                  <s.Label key={member.id} htmlFor={member.id}>
                    <span>{member.userName}</span>
                    <Input
                      type="checkbox"
                      id={member.id}
                      defaultChecked={memberFields[member.id].value}
                      onChange={updateMemberField(member.id)}
                    />
                  </s.Label>
                )
              })}
            </s.List>
          </s.Members>

          <s.ValuePerMember>
            <span>R$ 60,00</span>
            por pessoa
          </s.ValuePerMember>
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
