import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'
import { checkToken } from 'lib/auth'
import { InviteStatus } from 'lib/prisma/constants'

export default async function Invites(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    checkToken(req, res)

    const { userEmail } = req.query

    if (!userEmail) {
      const message = 'Erro ao buscar os convites para grupos do usuário'
      console.log(message)
      return res.status(500).json({ error: 'Parâmetros inválidos', message })
    }

    try {
      const userGroups = await prisma.userGroup.findMany({
        where: {
          userEmail: userEmail as string,
          inviteStatus: InviteStatus.pending as string
        },
        include: {
          group: true
        }
      })

      return res.status(200).json(userGroups)
    } catch (e) {
      const message = `Erro ao buscar os convites para grupos do usuário ${userEmail}`

      console.log(e)
      console.log(message)

      return res.status(500).json({ error: e, message })
    }
  }
}
