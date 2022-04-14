import { Expense as PrismaExpense } from '@prisma/client'

import { POST, GET, REMOVE } from 'lib/api'

import {
  CreateExpenseParams,
  Expense,
  Payment,
  ExpenseWithUsers
} from './types'

export async function getExpenseService(idExpense?: string) {
  let result: ExpenseWithUsers

  if (!idExpense) {
    throw new Error(`idExpense vazio`)
  }

  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/expense?idExpense=${idExpense}`
    const response = await GET(url)

    result = await response.json()
  } catch (e) {
    throw new Error(`Erro ao buscar a despesa ${idExpense}`)
  }

  return result
}

export async function deleteExpenseService(idExpense?: string) {
  if (!idExpense) {
    throw new Error(`idExpense vazio`)
  }

  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/expense/delete?idExpense=${idExpense}`
    await REMOVE(url)
  } catch (e) {
    throw new Error(`Erro ao deletar a despesa ${idExpense}`)
  }
}

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

export async function getExpenseListService(idGroup?: string) {
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

export async function getPaymentsService(idGroup?: string) {
  let result: Payment[]

  if (!idGroup) {
    throw new Error(`idGroup vazio`)
  }

  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/expense/payments?idGroup=${idGroup}`
    const response = await GET(url)

    result = await response.json()
  } catch (e) {
    throw new Error(`Erro ao buscar os pagamentos do grupo ${idGroup}`)
  }

  return result
}
