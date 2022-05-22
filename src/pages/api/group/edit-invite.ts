import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'
import { checkToken } from 'lib/auth'
import { InviteStatus } from 'lib/prisma/constants'

export default async function Invites(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'PUT') {
    checkToken(req, res)

    const { idUserGroup, inviteStatus } = req.body

    if (!idUserGroup || !inviteStatus) {
      const message = 'Erro ao atualizar o status do convite'
      console.log(message)
      return res.status(500).json({ error: 'Parâmetros inválidos', message })
    }

    const newInviteStatus = InviteStatus[
      inviteStatus as keyof typeof InviteStatus
    ] as string

    try {
      const userGroup = await prisma.userGroup.update({
        where: {
          id: idUserGroup as string
        },
        data: {
          inviteStatus: newInviteStatus || InviteStatus.pending
        }
      })

      return res.status(200).json(userGroup)
    } catch (e) {
      const message = `Erro ao atualizar o status do convite ${idUserGroup}`

      console.log(e)
      console.log(message)

      return res.status(500).json({ error: e, message })
    }
  }
}
