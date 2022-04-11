import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'

export default async function List(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { idUser } = req.query

    if (!idUser) {
      const message = 'Erro ao buscar os grupos do usuário'
      console.log(message)
      return res.status(500).json({ error: 'Parâmetros inválidos', message })
    }

    try {
      const groups = await prisma.group.findMany({
        where: {
          idOwnerUser: idUser as string
        }
      })

      return res.status(200).json(groups)
    } catch (e) {
      const message = `Erro ao buscar os grupos do usuário ${idUser}`

      console.log(e)
      console.log(message)

      return res.status(500).json({ error: e, message })
    }
  }
}
