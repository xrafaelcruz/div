import { useState } from 'react'
import { useRouter } from 'next/router'
import { Controller } from 'react-hook-form'

import Input from 'components/Input'
import Select from 'components/Select'
import Button from 'components/Button'
import Modal from 'components/Modal'
import Textarea from 'components/Textarea'
import RemoveExpense from './RemoveExpense'

import useForm from './hooks/useForm'
import { getUserName } from 'utils/user'
import { required } from 'utils/validations'
import { currencyMask, removeCurrencyMask } from 'utils/masks/currency'
import { createExpense, updateExpense } from 'services/expense'

import * as t from './types'
import { ExpenseTypes } from 'constants/expenseTypes'
import { UserToCreationExpense } from 'services/expense/types'

import * as s from './styles'
import { FooterButtons } from 'components/Button/styles'

const ExpenseForm = ({ user, expense }: t.ExpenseFormProps) => {
  const isEdit = !!expense

  const [modalOpen, setModalOpen] = useState(false)

  const router = useRouter()

  const {
    form,
    groups,
    usersGroup,
    userFields,
    checkedUsers,
    valuePerUser,
    updateValuePerUser,
    handleChangeGroup,
    handleToggleUserField,
    handleChangePayerUserName
  } = useForm({ user, expense })

  const {
    reset,
    watch,
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = form

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

  const onSubmit = async (data: t.FormData) => {
    try {
      const payload = {
        payerUserEmail: data.payerUserEmail,
        idGroup: data.idGroup,
        name: data.name,
        value: removeCurrencyMask(data.value),
        description: data.description,
        type: data.type,
        users: prepareUsersToCreation()
      }

      if (isEdit) {
        await updateExpense({ id: expense.id, ...payload })
        router.back()
      } else {
        await createExpense(payload)
        setModalOpen(true)
      }
    } catch (e) {
      console.log(e)
      alert(e)
    }
  }

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
                label="Grupo"
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
            id="name"
            label="Nome"
            error={errors.name?.message}
            {...register('name', { required })}
          />

          <Input
            label="Valor R$"
            error={errors.value?.message}
            {...register('value', { required })}
            onChange={(event) => {
              event.target.value = currencyMask(event.target.value)
              updateValuePerUser(checkedUsers, event.target.value)
            }}
          />

          <Select
            label="Tipo da despesa"
            optional
            error={errors.type?.message}
            {...register('type', { required })}
          >
            {ExpenseTypes.map(({ type }) => (
              <option value={type} key={type}>
                {type}
              </option>
            ))}
          </Select>

          <Textarea label="Descrição" optional {...register('description')} />

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
                para cada responsável
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
            {isEdit ? 'EDITAR' : 'CRIAR'}
          </Button>

          <RemoveExpense idExpense={expense?.id} />
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

export default ExpenseForm