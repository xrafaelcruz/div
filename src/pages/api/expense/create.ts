import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'
import { Expense, ExpenseUser } from '@prisma/client'

type ExpenseUserToCreation = Omit<ExpenseUser, 'id' | 'createdAt' | 'updatedAt'>

export default async function Create(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const {
      userName,
      // idPayerUser,
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
      const expenseUsers: ExpenseUserToCreation[] = members.map(
        (name: string) => ({
          idExpense: createdExpense.id,
          userName: name, // Será substituido pelo idUser
          // idUser: '', Não terá no MVP
          paymentStatus: ''
        })
      )

      await prisma.expenseUser.createMany({
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
