import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'

export default async function List(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { idGroup } = req.query

    if (!idGroup) {
      const message = 'Erro ao buscar as despesas do grupo'
      console.log(message)
      return res.status(500).json({ error: 'Parâmetros inválidos', message })
    }

    try {
      const expenses = await prisma.expense.findMany({
        where: {
          idGroup: idGroup as string
        },
        orderBy: {
          createdAt: 'desc'
        }
      })

      return res.status(200).json(expenses)
    } catch (e) {
      const message = `Erro ao buscar as despesas do grupo ${idGroup}`

      console.log(e)
      console.log(message)

      return res.status(500).json({ error: e, message })
    }
  }
}
