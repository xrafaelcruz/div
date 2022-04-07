import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'

export default async function List(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { userId, userName } = req.query

      const hasUserId = userId && typeof userId === 'string'
      const hasUserName = userName && typeof userName === 'string'

      if (hasUserId && hasUserName) {
        const groups = await prisma.userGroup.findMany({
          where: {
            userName,
            AND: {
              group: {
                idOwnerUser: userId
              }
            }
          },
          include: {
            group: true
          }
        })

        return res.status(200).json(groups)
      }
    } catch (e) {
      const message = 'Erro ao buscar os grupos'

      console.log(e)
      console.log(message)

      return res.status(500).json({ error: e, message })
    }
  }
}
