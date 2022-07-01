import { GetServerSidePropsContext } from 'next'
import { Expense as PrismaExpense } from '@prisma/client'

import { API_URL, POST, PUT, REMOVE, GETSSR, GETClient } from 'lib/api'

import {
  CreateExpenseParams,
  UpdateExpenseParams,
  Expense,
  Payment,
  PaymentByUser,
  ExpenseWithUsers
} from './types'

export async function deleteExpenseService(idExpense?: string) {
  if (!idExpense) {
    throw new Error(`idExpense vazio`)
  }

  try {
    const url = `${API_URL}/expense/delete?idExpense=${idExpense}`
    await REMOVE(url)
  } catch (e) {
    throw new Error(`Erro ao deletar a despesa ${idExpense}`)
  }
}

export async function createExpense(params: CreateExpenseParams) {
  let createdExpense: PrismaExpense | null = null

  try {
    const url = `${API_URL}/expense/create`
    const response = await POST(url, params)

    createdExpense = await response.json()
  } catch (e) {
    throw new Error('Erro ao criar a despesa')
  }

  return createdExpense
}

export async function updateExpense(params: UpdateExpenseParams) {
  let createdExpense: PrismaExpense | null = null

  try {
    const url = `${API_URL}/expense/update`
    const response = await PUT(url, params)

    createdExpense = await response.json()
  } catch (e) {
    throw new Error('Erro ao editar a despesa')
  }

  return createdExpense
}

export async function getExpenseService(context: GetServerSidePropsContext) {
  const { idExpense } = context.query

  return GETSSR<ExpenseWithUsers>({
    context,
    url: `${API_URL}/expense?idExpense=${idExpense}`,
    requiredParams: !!idExpense
  })
}

export async function getExpenseListService(
  idGroup: string | string[] | undefined
) {
  return GETClient<Expense[]>({
    url: `${API_URL}/expense/list?idGroup=${idGroup}`,
    requiredParams: !!idGroup
  })
}

export async function getPaymentsService(context: GetServerSidePropsContext) {
  const { idGroup } = context.query

  return GETSSR<Payment[]>({
    context,
    url: `${API_URL}/expense/payments?idGroup=${idGroup}`,
    requiredParams: !!idGroup
  })
}

export async function getPaymentsByUsersService(
  context: GetServerSidePropsContext
) {
  const { idGroup } = context.query

  return GETSSR<PaymentByUser[]>({
    context,
    url: `${API_URL}/expense/payments-by-users?idGroup=${idGroup}`,
    requiredParams: !!idGroup
  })
}
