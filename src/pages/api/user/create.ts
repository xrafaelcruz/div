import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'
import { checkToken } from 'lib/auth'

export default async function Create(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    checkToken(req, res)

    const data = req.body

    if (!data.email) {
      const message = 'Erro ao atualizar o usuário'

      console.log(message)

      return res.status(500).json({ error: 'Parâmetros inválidos', message })
    }

    try {
      const user = await prisma.user.create({ data })

      return res.status(200).json(user)
    } catch (e) {
      const message = `Erro ao criar o usuário`

      console.log(e)
      console.log(message)

      return res.status(500).json({ error: e, message })
    }
  }
}
