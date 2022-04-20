import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'

export default async function List(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { userEmail } = req.query

    if (!userEmail) {
      const message = 'Erro ao buscar os grupos do usuário'
      console.log(message)
      return res.status(500).json({ error: 'Parâmetros inválidos', message })
    }

    try {
      const userGroups = await prisma.userGroup.findMany({
        where: {
          userEmail: userEmail as string
        },
        include: {
          group: true
        }
      })

      const groups = userGroups.map((userGroup) => userGroup.group)

      return res.status(200).json(groups)
    } catch (e) {
      const message = `Erro ao buscar os grupos do usuário ${userEmail}`

      console.log(e)
      console.log(message)

      return res.status(500).json({ error: e, message })
    }
  }
}
