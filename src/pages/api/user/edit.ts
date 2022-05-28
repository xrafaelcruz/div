import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'
import { checkToken } from 'lib/auth'

export default async function Update(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'PUT') {
    checkToken(req, res)

    const { idUser, name, pix, description } = req.body

    if (!idUser || !name) {
      const message = 'Erro ao atualizar o usuário'
      console.log(message)
      return res.status(500).json({ error: 'Parâmetros inválidos', message })
    }

    try {
      const user = await prisma.user.update({
        where: {
          id: idUser as string
        },
        data: {
          name: name as string,
          pix: pix as string,
          description: description as string
        }
      })

      return res.status(200).json(user)
    } catch (e) {
      const message = `Erro ao buscar atualizar o usuário ${idUser}`

      console.log(e)
      console.log(message)

      return res.status(500).json({ error: e, message })
    }
  }
}
