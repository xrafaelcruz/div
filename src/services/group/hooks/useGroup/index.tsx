import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

import { getGroupService } from 'services/group'
import { listExpenses } from 'services/expense'

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
    const getGroup = async () => {
      try {
        const foundedGroup = await getGroupService(idGroup)
        setGroup(foundedGroup)
      } catch (e) {
        router.push('/')
      }
    }

    if (!group && !requestedGroups.current) {
      requestedGroups.current = true
      getGroup()
    }
  }, [idGroup, group, router])

  useEffect(() => {
    const requestListExpenses = async () => {
      try {
        const foundedExpenses = await listExpenses(idGroup)
        setExpenses(foundedExpenses)
      } catch (e) {
        router.push('/')
      }
    }

    if (hasExpenses && group && idGroup && !requestedExpenses.current) {
      requestedExpenses.current = true
      requestListExpenses()
    }
  }, [hasExpenses, group, idGroup, expenses, router])

  return { group, expenses }
}

export default useGroup
