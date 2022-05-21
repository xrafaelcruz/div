import { NextApiRequest, NextApiResponse } from 'next'
import { Expense, ExpenseUserGroup } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime'

import prisma from 'lib/prisma'

import { PaymentStatus } from 'lib/prisma/constants'
import { checkToken } from 'lib/auth'

type ExpenseUserGroupToCreation = Omit<
  ExpenseUserGroup,
  'id' | 'createdAt' | 'updatedAt'
>

type UserToCreation = {
  email: string
  value: Decimal
}

export default async function Update(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'PUT') {
    checkToken(req, res)

    const { id, payerUserEmail, idGroup, name, value, description, type } =
      req.body

    let createdExpense: Expense

    if (
      !id ||
      !payerUserEmail ||
      !idGroup ||
      !name ||
      !value ||
      !type ||
      !req.body.users
    ) {
      const message = 'Erro ao editar a despesa'
      console.log(message)
      return res.status(500).json({ error: 'Parâmetros inválidos', message })
    }

    try {
      createdExpense = await prisma.expense.update({
        where: {
          id: id
        },
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
      const message = 'Erro ao editar a despesa'

      console.log(e)
      console.log(message)

      return res.status(500).json({ error: e, message })
    }

    try {
      await prisma.expenseUserGroup.deleteMany({
        where: {
          idExpense: id
        }
      })
    } catch (e) {
      const message = `Erro ao excluir todos os usuários vinculados a despesa ${id}`

      console.log(e)
      console.log(message)

      return res.status(500).json({ error: e, message })
    }

    try {
      const users: UserToCreation[] = req.body.users

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
      const message = 'Erro ao vincular a despesa aos membros'

      console.log(e)
      console.log(message)

      return res.status(500).json({ error: e, message })
    }
  }
}
