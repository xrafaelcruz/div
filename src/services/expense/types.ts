import {
  Expense as PrismaExpense,
  ExpenseUserGroup as PrismaExpenseUserGroup
} from '@prisma/client'

import { PaymentStatus } from 'lib/prisma/constants'

export type Payment = Omit<
  PrismaExpenseUserGroup,
  'createdAt' | 'updatedAt' | 'paymentValue' | 'paymentStatus'
> & {
  createdAt: string
  updatedAt: string
  paymentValue: string
  paymentStatus: keyof typeof PaymentStatus
  expense: Expense
}

export type Expense = Omit<
  PrismaExpense,
  'createdAt' | 'updatedAt' | 'value'
> & {
  createdAt: string
  updatedAt: string
  value: string
}

export type ExpenseWithUsers = Omit<
  PrismaExpense,
  'createdAt' | 'updatedAt' | 'value'
> & {
  createdAt: string
  updatedAt: string
  ExpenseUserGroup: Omit<Payment, 'expense'>
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
