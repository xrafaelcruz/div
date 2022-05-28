import {
  Expense as PrismaExpense,
  ExpenseUserGroup as PrismaExpenseUserGroup
} from '@prisma/client'

import { PaymentStatus } from 'lib/prisma/constants'
import { User } from 'services/user/types'

export type Payment = Omit<
  PrismaExpenseUserGroup,
  'createdAt' | 'updatedAt' | 'paymentValue' | 'paymentStatus'
> & {
  createdAt: string
  updatedAt: string
  paymentValue: string
  paymentStatus: keyof typeof PaymentStatus
  expense: Expense
  user: User
}

export type PaymentByUser = {
  from: string
  to: string
  total: number
  finalPayment: number
}

export type Expense = Omit<
  PrismaExpense,
  'createdAt' | 'updatedAt' | 'value'
> & {
  createdAt: string
  updatedAt: string
  value: string
  user: User
}

export type ExpenseWithUsers = Omit<
  PrismaExpense,
  'createdAt' | 'updatedAt' | 'value'
> & {
  createdAt: string
  updatedAt: string
  value: string
  ExpenseUserGroup: Omit<Payment, 'expense'>[]
}

export type UserToCreationExpense = {
  email: string
  value: number
}

export type CreateExpenseParams = {
  payerUserEmail: string
  idGroup: string
  name: string
  value: number
  description: string
  type: string
  users: UserToCreationExpense[]
}

export type UpdateExpenseParams = CreateExpenseParams & {
  id: string
}
