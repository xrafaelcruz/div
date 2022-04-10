import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'

export default async function List(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { idGroup } = req.query
    console.log('idGroup', idGroup)

    try {
      const hasIdGroup = idGroup && typeof idGroup === 'string'

      console.log('hasIdGroup', hasIdGroup)

      if (hasIdGroup) {
        const expenses = await prisma.expense.findMany({
          where: {
            idGroup
          },
          orderBy: {
            createdAt: 'desc'
          }
        })

        return res.status(200).json(expenses)
      }
    } catch (e) {
      const message = `Erro ao buscar as despesas do grupo ${idGroup}`

      console.log(e)
      console.log(message)

      return res.status(500).json({ error: e, message })
    }
  }
}
