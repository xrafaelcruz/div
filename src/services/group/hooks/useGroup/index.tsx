import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

import { getGroupService } from 'services/group'
import { getExpenseListService, getPaymentsService } from 'services/expense'

import { GroupDetails } from 'services/group/types'
import { Expense, Payment } from 'services/expense/types'
import { UseGroupReturn, UseGroupProps } from './types'

const useGroup = ({
  idGroup,
  hasExpenses,
  hasPayments
}: UseGroupProps): UseGroupReturn => {
  const requestedGroups = useRef(false)
  const requestedExpenses = useRef(false)
  const requestedPayments = useRef(false)

  const router = useRouter()
  const [group, setGroup] = useState<GroupDetails>()
  const [expenses, setExpenses] = useState<Expense[]>()
  const [payments, setPayments] = useState<Payment[]>()

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

  useEffect(() => {
    const request = async () => {
      try {
        const result = await getPaymentsService(idGroup)
        setPayments(result)
      } catch (e) {
        router.push('/')
      }
    }

    if (hasPayments && group && idGroup && !requestedPayments.current) {
      requestedPayments.current = true
      request()
    }
  }, [hasPayments, group, idGroup, expenses, router])

  return { group, expenses, payments }
}

export default useGroup
