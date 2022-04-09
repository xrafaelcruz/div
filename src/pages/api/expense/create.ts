import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'
import { Expense, ExpenseUserGroup } from '@prisma/client'

type ExpenseUserGroupToCreation = Omit<
  ExpenseUserGroup,
  'id' | 'createdAt' | 'updatedAt'
>

export default async function Create(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const {
      userName,
      idPayerUser,
      idGroup,
      name,
      value,
      description,
      type,
      members
    } = req.body

    let createdExpense: Expense

    try {
      createdExpense = await prisma.expense.create({
        data: {
          userName,
          idPayerUser,
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
      const expenseUsersGroup: ExpenseUserGroupToCreation[] = members.map(
        (name: string) => ({
          idExpense: createdExpense.id,
          userName: name,
          idUser: '',
          idGroup,
          paymentStatus: ''
        })
      )

      await prisma.expenseUserGroup.createMany({
        data: expenseUsersGroup
      })

      return res.status(201).json(createdExpense)
    } catch (e) {
      // @TODO se falhar, deve remover essa despesa criada
      const message = 'Erro ao vincular a despesa a um grupo e a membros'

      console.log(e)
      console.log(message)

      return res.status(500).json({ error: e, message })
    }
  }
}
