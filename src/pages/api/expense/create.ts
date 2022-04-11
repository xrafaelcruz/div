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
  name: string // Será substituido pelo idUser
  // idUser: string - Não terá no MVP
  value: Decimal
}

export default async function Create(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const {
      userName, // Nome de quem pagou
      // idPayerUser,
      idGroup,
      name,
      value,
      description,
      type
    } = req.body

    let createdExpense: Expense

    if (!userName || !idGroup || !name || !value || !req.body.users) {
      const message = 'Erro ao criar a despesa'
      console.log(message)
      return res.status(500).json({ error: 'Parâmetros inválidos', message })
    }

    try {
      createdExpense = await prisma.expense.create({
        data: {
          userName, // Será substituido pelo idPayerUser
          // idPayerUser, Não terá no MVP
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

      const expenseUsers: ExpenseUserGroupToCreation[] = users.map(
        (user): ExpenseUserGroupToCreation => ({
          idExpense: createdExpense.id,
          userName: user.name, // Será substituido pelo idUser
          // idUser: '', Não terá no MVP
          idGroup,
          paymentValue: user.value,
          paymentStatus:
            user.name === userName ? PaymentStatus.payer : PaymentStatus.pending
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
