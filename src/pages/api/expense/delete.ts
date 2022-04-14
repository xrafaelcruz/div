import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'

export default async function Remove(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    const { idExpense } = req.query

    if (!idExpense) {
      const message = 'Erro ao excluir a despesa'
      console.log(message)
      return res.status(500).json({ error: 'Parâmetros inválidos', message })
    }

    try {
      console.log('expenseUserGroup', idExpense)

      const users = await prisma.expenseUserGroup.findMany({
        where: {
          idExpense: idExpense as string
        }
      })

      console.log('users', users)

      const usersName = users.map((user) => user.userName) // @TODO deve ser user.id

      await prisma.expenseUserGroup.deleteMany({
        where: {
          // @TODO deve ser id
          idExpense: idExpense as string,
          AND: {
            userName: {
              in: usersName
            }
          }
        }
      })
    } catch (e) {
      const message = `Erro ao desvincular os usuários da despesa ${idExpense}`

      console.log(e)
      console.log(message)

      return res.status(500).json({ error: e, message })
    }

    try {
      await prisma.expense.delete({
        where: {
          id: idExpense as string
        }
      })

      return res.status(200).json({})
    } catch (e) {
      const message = `Erro ao excluir a despesa ${idExpense}`

      console.log(e)
      console.log(message)

      return res.status(500).json({ error: e, message })
    }
  }
}
