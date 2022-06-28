import { useState, ChangeEvent, useEffect, useCallback, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useForm as useFormRHF } from 'react-hook-form'

import { currencyMask, removeCurrencyMask } from 'utils/masks/currency'
import { getDefaultValues } from './helpers'

import useUsersGroup from 'services/group/hooks/useMembersOfGroup'

import { getUserName } from 'utils/user'

import * as t from './types'

const defaultValuePerUser = 'R$ 0,00'

const useForm = ({ user, expense }: t.ExpenseFormProps) => {
  const router = useRouter()
  const { idGroup } = router.query

  const { usersGroup, getUsersGroup } = useUsersGroup(idGroup as string)
  const [userFields, setUserFields] = useState<t.UserField[]>([])
  const [valuePerUser, setValuePerUser] = useState(defaultValuePerUser)
  const [checkedUsers, setCheckedUsers] = useState(0)

  const defaultValues = useMemo(
    () => getDefaultValues(user, idGroup, expense),
    [user, idGroup, expense]
  )

  const form = useFormRHF<t.FormData>({
    mode: 'onBlur',
    defaultValues
  })

  const { watch } = form

  const resetValuePerUser = () => {
    setValuePerUser(defaultValuePerUser)
  }

  const updateValuePerUser = (checks: number, value: string) => {
    if (value) {
      const expenseValue = removeCurrencyMask(value)
      const divisionValue = checks ? expenseValue / checks : expenseValue
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
    let users: t.UserField[] = []
    let checkeds = 0

    if (usersGroup?.length) {
      users = usersGroup.map((userGroup) => {
        let checked = true

        if (expense) {
          const founded = expense.ExpenseUserGroup.find(
            (currentUser) => currentUser.userEmail === userGroup.userEmail
          )

          if (!founded) {
            checked = false
          }
        }

        if (checked) {
          checkeds++
        }

        return {
          id: userGroup.id,
          name: getUserName(userGroup.user),
          email: userGroup.user.email,
          checked
        }
      })
    }

    console.log('users', users)

    setCheckedUsers(checkeds)
    setUserFields(users)

    updateValuePerUser(checkeds, watch('value'))
  }, [expense, usersGroup, watch])

  useEffect(() => {
    createUserFields()
  }, [createUserFields, usersGroup])

  return {
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
  }
}

export default useForm
