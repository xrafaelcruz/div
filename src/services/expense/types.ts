import { Expense as PrismaExpense } from '@prisma/client'
import { Group } from 'services/group/types'

export type Expense = Omit<
  PrismaExpense,
  'createdAt' | 'updatedAt' | 'value'
> & {
  createdAt: string
  updatedAt: string
  value: number
}

export type UserToCreationExpense = {
  name: string
  value: number
}

export type CreateExpenseParams = {
  userName: string
  // idPayerUser: string
  idGroup: string
  name: string
  value: number
  description: string
  type: string
  users: UserToCreationExpense[]
}
