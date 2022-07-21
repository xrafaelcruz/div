import { useState } from 'react'
import { useRouter } from 'next/router'
import { Controller } from 'react-hook-form'
import { toast } from 'react-toastify'

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
import { getLoader } from 'lib/loader'

import * as t from './types'
import { ExpenseTypes } from 'constants/expenseTypes'
import { UserToCreationExpense } from 'services/expense/types'
import { User } from 'services/group/types'

import * as s from './styles'
import { FooterButtons } from 'components/Button/styles'

const ExpenseForm = ({ user, expense, groups }: t.ExpenseFormProps) => {
  const isEdit = !!expense

  const [modalOpen, setModalOpen] = useState(false)

  const router = useRouter()

  const {
    form,
    usersGroup,
    userFields,
    checkedUsers,
    valuePerUser,
    resetValuePerUser,
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

  const getName = (currentUser: t.UserField | User) => {
    if (currentUser.email === user.email) {
      return 'Você'
    }

    return getUserName(currentUser)
  }

  const modalOnClickYes = async () => {
    reset()
    resetValuePerUser()
    setModalOpen(false)

    document.getElementById('main')?.scrollTo(0, 0)
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
      getLoader()?.continuousStart()

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
      toast.error(`Não foi possível ${isEdit ? 'editar' : 'criar'}`)
    } finally {
      getLoader()?.complete()
    }
  }

  return (
    <s.Layout>
      <h1>{isEdit ? 'Editar despesa' : 'Nova despesa'}</h1>

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

          <Textarea
            label="Descrição"
            optional
            {...register('description')}
            maxLength={500}
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
                    aria-label="Quem pagou"
                    error={errors.payerUserEmail?.message}
                    onChange={handleChangePayerUserName(onChange)}
                    disabled={!watch('idGroup')}
                  >
                    {usersGroup?.map((userGroup) => (
                      <option value={userGroup.user.email} key={userGroup.id}>
                        {getName(userGroup.user)}
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
                      <span>{getName(userField)}</span>
                      <Input
                        aria-label="Marcar usuario que vai dividir"
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
          <RemoveExpense idExpense={expense?.id} />

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
