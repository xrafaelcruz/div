import { NextApiRequest, NextApiResponse } from 'next'
import { Expense, ExpenseUserGroup } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime'

import prisma from 'lib/prisma'

import { PaymentStatus } from 'lib/prisma/constants'

type ExpenseUserGroupToCreation = Omit<
  ExpenseUserGroup,
  'id' | 'createdAt' | 'updatedAt'
>

type UserToCreation = {
  email: string
  value: Decimal
}

export default async function Create(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { payerUserEmail, idGroup, name, value, description, type } = req.body

    let createdExpense: Expense

    if (
      !payerUserEmail ||
      !idGroup ||
      !name ||
      !value ||
      !type ||
      !req.body.users
    ) {
      const message = 'Erro ao criar a despesa'
      console.log(message)
      return res.status(500).json({ error: 'Parâmetros inválidos', message })
    }

    try {
      createdExpense = await prisma.expense.create({
        data: {
          userEmail: payerUserEmail,
          idGroup,
          name,
          value,
          description,
          type
        }
      })
    } catch (e) {
      const message = 'Erro ao criar a despesa'

      console.log(e)
      console.log(message)

      return res.status(500).json({ error: e, message })
    }

    try {
      const users: UserToCreation[] = req.body.users

      console.log('users', users)

      const expenseUsers: ExpenseUserGroupToCreation[] = users.map(
        (user): ExpenseUserGroupToCreation => ({
          idExpense: createdExpense.id,
          userEmail: user.email,
          idGroup,
          paymentValue: user.value,
          paymentStatus:
            user.email === payerUserEmail
              ? PaymentStatus.payer
              : PaymentStatus.pending
        })
      )

      await prisma.expenseUserGroup.createMany({
        data: expenseUsers
      })

      return res.status(201).json(createdExpense)
    } catch (e) {
      // @TODO se falhar, deve remover essa despesa criada
      const message = 'Erro ao vincular a despesa aos membros'

      console.log(e)
      console.log(message)

      return res.status(500).json({ error: e, message })
    }
  }
}
