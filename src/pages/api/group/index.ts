import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'

export default async function Get(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { idGroup } = req.query

    if (!idGroup) {
      const message = 'Erro ao buscar os detalhes do grupo'
      console.log(message)
      return res.status(500).json({ error: 'Parâmetros inválidos', message })
    }

    // Verificar se o usuário está vinculado com o grupo para saber se ele poder fazer essa request

    try {
      const result = await prisma.group.findUnique({
        where: {
          id: idGroup as string
        },
        include: {
          UserGroup: true
        }
      })

      if (result) {
        const { UserGroup, ...details } = result

        return res.status(200).json({
          details: details,
          usersCount: UserGroup.length,
          total: 0 // @TODO
        })
      }

      throw new Error('Grupo não encontrado')
    } catch (e) {
      const message = `Erro ao buscar os detalhes do grupo ${idGroup}`

      console.log(e)
      console.log(message)

      return res.status(500).json({ error: e, message })
    }
  }
}
