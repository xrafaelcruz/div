import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

import { getGroupService } from 'services/group'
import { getExpenseListService } from 'services/expense'

import { GroupDetails } from 'services/group/types'
import { Expense } from 'services/expense/types'
import { UseGroupReturn, UseGroupProps } from './types'

const useGroup = ({ idGroup, hasExpenses }: UseGroupProps): UseGroupReturn => {
  const requestedGroups = useRef(false)
  const requestedExpenses = useRef(false)

  const router = useRouter()
  const [group, setGroup] = useState<GroupDetails>()
  const [expenses, setExpenses] = useState<Expense[]>()

  useEffect(() => {
    const request = async () => {
      try {
        const result = await getGroupService(idGroup)
        setGroup(result)
      } catch (e) {
        router.push('/')
      }
    }

    if (!group && !requestedGroups.current) {
      requestedGroups.current = true
      request()
    }
  }, [idGroup, group, router])

  useEffect(() => {
    const request = async () => {
      try {
        const result = await getExpenseListService(idGroup)
        setExpenses(result)
      } catch (e) {
        router.push('/')
      }
    }

    if (hasExpenses && group && idGroup && !requestedExpenses.current) {
      requestedExpenses.current = true
      request()
    }
  }, [hasExpenses, group, idGroup, expenses, router])

  return { group, expenses }
}

export default useGroup
