import {
  Expense as PrismaExpense,
  ExpenseUserGroup as PrismaExpenseUserGroup
} from '@prisma/client'
import { User } from 'services/user/types'
import { Group } from 'services/group/types'

export type Expense = Omit<PrismaExpense, 'createdAt' | 'updatedAt'> & {
  createdAt: string
  updatedAt: string
}

export type ExpenseUserGroupComplete = Omit<
  PrismaExpenseUserGroup,
  'createdAt' | 'updatedAt'
> & {
  createdAt: string
  updatedAt: string
  expense: Expense
  user: User
  group: Group
}

export type CreateExpenseParams = {
  userName: string
  // idPayerUser: string
  idGroup: string
  name: string
  value: number
  description: string
  type: string
  members: string[]
}
