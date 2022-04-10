import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'

export default async function List(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { idUser } = req.query

    try {
      const hasUserId = idUser && typeof idUser === 'string'
      // const hasUserName = userName && typeof userName === 'string'

      if (hasUserId) {
        const groups = await prisma.group.findMany({
          where: {
            idOwnerUser: idUser
          }
        })

        return res.status(200).json(groups)
      }
    } catch (e) {
      const message = `Erro ao buscar os grupos do usuário ${idUser}`

      console.log(e)
      console.log(message)

      return res.status(500).json({ error: e, message })
    }
  }
}
