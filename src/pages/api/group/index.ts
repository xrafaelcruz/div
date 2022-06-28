import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'
import { getToken } from 'next-auth/jwt'

export default async function Get(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const token = await getToken({ req, secret: process.env.GOOGLE_SECRET })

    if (!token) {
      return res.status(401).json({})
    }

    const { idGroup } = req.query

    if (!idGroup) {
      const message = 'Erro ao buscar os detalhes do grupo'
      console.log(message)
      return res.status(500).json({ error: 'Parâmetros inválidos', message })
    }

    // Verificar se o usuário está vinculado com o grupo para saber se ele poder fazer essa request

    let total = 0

    try {
      const result = await prisma.expense.groupBy({
        by: ['idGroup'],
        where: {
          idGroup: idGroup as string
        },
        _sum: {
          value: true
        }
      })

      if (result[0] && result[0]._sum && result[0]._sum.value) {
        total = Number(result[0]._sum.value)
      }
    } catch (e) {
      const message = `Erro ao buscar o total de despesas do grupo ${idGroup}`

      console.log(e)
      console.log(message)

      return res.status(500).json({ error: e, message })
    }

    try {
      const group = await prisma.group.findUnique({
        where: {
          id: idGroup as string
        },
        include: {
          UserGroup: true
        }
      })

      if (!group) {
        return res
          .status(404)
          .json({ error: 404, message: 'Grupo não encontrado!' })
      }

      const { UserGroup, ...rest } = group
      return res.status(200).json({ ...rest, users: UserGroup, total })
    } catch (e) {
      const message = `Erro ao buscar os detalhes do grupo ${idGroup}`

      console.log(e)
      console.log(message)

      return res.status(500).json({ error: e, message })
    }
  }
}
