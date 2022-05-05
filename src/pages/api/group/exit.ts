import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'
import { InviteStatus } from 'lib/prisma/constants'
import { UserGroup } from '@prisma/client'

export default async function Exit(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    const { idGroup, userEmail } = req.query

    if (!idGroup || !userEmail) {
      const message = 'Erro ao sair do grupo'
      console.log(message)
      return res.status(500).json({ error: 'Parâmetros inválidos', message })
    }

    let userGroup: UserGroup | null

    try {
      userGroup = await prisma.userGroup.findFirst({
        where: {
          userEmail: userEmail as string,
          idGroup: idGroup as string
        }
      })

      if (!userGroup) {
        throw new Error('UserGroup não encontrado')
      }
    } catch (e) {
      const message = `Erro ao buscar o userGroup`

      console.log(e)
      console.log(message)

      return res.status(500).json({ error: e, message })
    }

    try {
      await prisma.userGroup.update({
        data: {
          inviteStatus: InviteStatus.canceled as string
        },
        where: {
          id: userGroup.id
        }
      })

      return res.status(200).json({})
    } catch (e) {
      const message = `Erro ao remover o usuário do grupo ${idGroup}`

      console.log(e)
      console.log(message)

      return res.status(500).json({ error: e, message })
    }
  }
}
