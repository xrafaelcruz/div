import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'

export default async function Users(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { idGroup } = req.query

    try {
      if (!idGroup) {
        const message = 'Erro ao buscar os usuários do grupo'
        console.log(message)
        return res.status(500).json({ error: 'Parâmetros inválidos', message })
      }

      const groupWithUsers = await prisma.group.findUnique({
        where: {
          id: idGroup as string
        },
        include: {
          UserGroup: true
        }
      })

      return res.status(200).json(groupWithUsers?.UserGroup)
    } catch (e) {
      const message = `Erro ao buscar os usuários do grupo ${idGroup}`

      console.log(e)
      console.log(message)

      return res.status(500).json({ error: e, message })
    }
  }
}
