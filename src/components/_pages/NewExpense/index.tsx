import { useState, ChangeEvent, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import { useForm, Controller } from 'react-hook-form'

import Input from 'components/Input'
import Select from 'components/Select'
import Button from 'components/Button'
import Modal from 'components/Modal'

import { required } from 'utils/validations'
import { currencyMask, removeCurrencyMask } from 'utils/masks/currency'

import { createExpense } from 'services/expense'
import useGroupList from 'services/group/hooks/useGroupList'
import useUsersGroup from 'services/group/hooks/useMembersOfGroup'

import { NewExpenseProps, UserField, FormData } from './types'
import { UserToCreationExpense } from 'services/expense/types'

import * as s from './styles'
import { FooterButtons } from 'components/Button/styles'
import { getUserName } from 'utils/user'
import { ExpenseTypes } from 'constants/expenseTypes'

const defaultValuePerUser = 'R$ 0,00'

export default function NewExpense({ user }: NewExpenseProps) {
  const router = useRouter()
  const { idGrupo } = router.query

  const [modalOpen, setModalOpen] = useState(false)

  const { groups } = useGroupList({ user })
  const { usersGroup, getUsersGroup } = useUsersGroup(idGrupo as string)
  const [userFields, setUserFields] = useState<UserField[]>([])
  const [valuePerUser, setValuePerUser] = useState(defaultValuePerUser)
  const [checkedUsers, setCheckedUsers] = useState(0)

  const {
    reset,
    watch,
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    mode: 'onBlur',
    defaultValues: {
      idGroup: (idGrupo as string) ?? ''
    }
  })

  const modalOnClickYes = async () => {
    reset()
    setModalOpen(false)
  }

  const modalOnClickNo = () => {
    router.back()
  }

  const prepareUsersToCreation = () => {
    const users: UserToCreationExpense[] = userFields
      .filter((userField) => userField.checked === true)
      .map((userField) => ({
        email: userField.email,
        value: removeCurrencyMask(valuePerUser)
      }))

    return users
  }

  const onSubmit = async (data: FormData) => {
    try {
      await createExpense({
        payerUserEmail: data.payerUserEmail,
        idGroup: data.idGroup,
        name: data.name,
        value: removeCurrencyMask(data.value),
        description: data.description,
        type: data.type,
        users: prepareUsersToCreation()
      })

      setModalOpen(true)
    } catch (e) {
      console.log(e)
      alert(e)
    }
  }

  const updateValuePerUser = (checks: number, value: string) => {
    if (checks && value) {
      const expenseValue = removeCurrencyMask(value)
      const divisionValue = expenseValue / checks
      const maskedValue = currencyMask(divisionValue.toFixed(2))

      setValuePerUser(maskedValue ? maskedValue : defaultValuePerUser)
    } else {
      setValuePerUser(defaultValuePerUser)
    }
  }

  const handleChangeGroup = (onChange: any) => {
    return async (e: ChangeEvent<HTMLSelectElement>) => {
      onChange(e)

      const idGroup = e.target.value
      const loggedUser = user.name

      await getUsersGroup(idGroup, loggedUser)
    }
  }

  const handleChangePayerUserName = (onChange: any) => {
    return async (e: ChangeEvent<HTMLSelectElement>) => {
      onChange(e)

      const { value } = e.target

      let newCheckedUsers = checkedUsers

      const newUserFields = userFields.map((userField) => {
        if (userField.email === value && !userField.checked) {
          userField.checked = true
          newCheckedUsers++
        }

        return userField
      })

      setUserFields(newUserFields)
      setCheckedUsers(newCheckedUsers)

      updateValuePerUser(newCheckedUsers, watch('value'))
    }
  }

  const handleToggleUserField = (value: string) => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      let newCheckedUsers = 0

      const newUserFields = userFields.map((userField) => {
        if (userField.email === value) {
          userField.checked = e.target.checked
        }

        if (userField.checked) newCheckedUsers++

        return userField
      })

      setUserFields(newUserFields)
      setCheckedUsers(newCheckedUsers)

      updateValuePerUser(newCheckedUsers, watch('value'))
    }
  }

  const createUserFields = useCallback(() => {
    let users: UserField[] = []

    if (usersGroup?.length) {
      users = usersGroup.map((userGroup) => ({
        id: userGroup.id,
        name: getUserName(userGroup.user),
        email: userGroup.user.email,
        checked: true
      }))
    }

    setCheckedUsers(users.length)
    setUserFields(users)

    updateValuePerUser(users.length, watch('value'))
  }, [usersGroup, watch])

  useEffect(() => {
    createUserFields()
  }, [createUserFields, usersGroup])

  return (
    <s.Layout user={user}>
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

          <Select
            placeholder="Tipo"
            error={errors.type?.message}
            {...register('type', { required })}
          >
            <option value="">Selecione o tipo da despesa</option>
            {ExpenseTypes.map(({ type }) => (
              <option value={type} key={type}>
                {type}
              </option>
            ))}
          </Select>

          <Input
            placeholder="Valor R$"
            error={errors.value?.message}
            {...register('value', { required })}
            onChange={(event) => {
              event.target.value = currencyMask(event.target.value)
              updateValuePerUser(checkedUsers, event.target.value)
            }}
          />

          <Input
            placeholder="Descrição (opcional)"
            {...register('description')}
          />

          {watch('idGroup') && (
            <s.PayerUser>
              <h2>Quem pagou</h2>

              <Controller
                control={control}
                name="payerUserEmail"
                rules={{ required }}
                render={({ field: { onChange, ...fieldProps } }) => (
                  <Select
                    {...fieldProps}
                    error={errors.payerUserEmail?.message}
                    onChange={handleChangePayerUserName(onChange)}
                    disabled={!watch('idGroup')}
                  >
                    <option value="">Selecione o membro</option>
                    {usersGroup?.map((userGroup) => (
                      <option value={userGroup.user.email} key={userGroup.id}>
                        {getUserName(userGroup.user)}
                      </option>
                    ))}
                  </Select>
                )}
              />
            </s.PayerUser>
          )}

          {watch('payerUserEmail') && watch('idGroup') && (
            <>
              <s.Users>
                <h2>Selecione quem irá dividir</h2>

                <s.List>
                  {userFields?.map((userField) => (
                    <s.Label key={userField.id} htmlFor={userField.id}>
                      <span>{getUserName(userField)}</span>
                      <Input
                        type="checkbox"
                        id={userField.id}
                        checked={userField.checked}
                        onChange={handleToggleUserField(userField.email)}
                      />
                    </s.Label>
                  ))}
                </s.List>
              </s.Users>

              <s.ValuePerUser>
                <span>{valuePerUser}</span>
                por pessoa
              </s.ValuePerUser>
            </>
          )}
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

      {modalOpen && (
        <Modal
          text="Deseja adicionar outra despesa?"
          onClickNo={modalOnClickNo}
          onClickYes={modalOnClickYes}
        />
      )}
    </s.Layout>
  )
}
