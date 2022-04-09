import { Expense as PrismaExpense } from '@prisma/client'

import { POST, GET } from 'lib/api'

import { CreateExpenseParams, ExpenseUserGroupComplete } from './types'

export async function createExpense(params: CreateExpenseParams) {
  let createdExpense: PrismaExpense | null = null

  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/expense/create`
    const response = await POST(url, params)

    createdExpense = await response.json()
  } catch (e) {
    throw new Error('Erro ao criar a despesa')
  }

  return createdExpense
}

export async function listExpenses(idUser: string, userName: string) {
  let expenses: ExpenseUserGroupComplete[] | null = null

  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/expense/list?idUser=${idUser}&userName=${userName}`
    const response = await GET(url)

    expenses = await response.json()

    // if (expenses !== null) {
    //   console.log('normalizeUserGroup', normalizeUserexpenses(expenses))
    // }
  } catch (e) {
    throw new Error('Erro ao buscar as despesas')
  }

  return expenses
}
