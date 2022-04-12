import { Expense as PrismaExpense } from '@prisma/client'

import { POST, GET } from 'lib/api'

import { CreateExpenseParams, Expense } from './types'

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

export async function listExpenses(idGroup?: string) {
  let result: Expense[]

  if (!idGroup) {
    throw new Error(`idGroup vazio`)
  }

  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/expense/list?idGroup=${idGroup}`
    const response = await GET(url)

    result = await response.json()
  } catch (e) {
    throw new Error(`Erro ao buscar as despesas do grupo ${idGroup}`)
  }

  return result
}
