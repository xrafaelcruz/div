import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'
import { checkToken } from 'lib/auth'

export default async function Get(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    checkToken(req, res)

    const { userEmail } = req.query

    if (!userEmail) {
      const message = 'Erro ao buscar os detalhes do usuário'
      console.log(message)
      return res.status(500).json({ error: 'Parâmetros inválidos', message })
    }

    try {
      const user = await prisma.user.findUnique({
        where: {
          email: userEmail as string
        }
      })

      return res.status(200).json(user)
    } catch (e) {
      const message = `Erro ao buscar os detalhes do usuário ${userEmail}`

      console.log(e)
      console.log(message)

      return res.status(500).json({ error: e, message })
    }
  }
}
