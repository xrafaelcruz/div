import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'
import { UserGroup } from '@prisma/client'

export default async function Update(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    const { userEmail, idGroup } = req.query

    if (!userEmail || !idGroup) {
      const message = 'Erro ao remover o usuário do grupo'
      console.log(message)
      return res.status(500).json({ error: 'Parâmetros inválidos', message })
    }

    let foundedUser: UserGroup | null

    try {
      foundedUser = await prisma.userGroup.findFirst({
        where: {
          idGroup: idGroup as string,
          userEmail: userEmail as string
        }
      })

      if (!foundedUser) {
        throw new Error('Usuário não encontrado')
      }
    } catch (e) {
      const message = 'Erro ao buscar o usuário do grupo'

      console.log(e)
      console.log(message)

      return res.status(500).json({ error: e, message })
    }

    try {
      await prisma.userGroup.delete({
        where: {
          id: foundedUser.id
        }
      })

      return res.status(200).json({})
    } catch (e) {
      const message = 'Erro ao remover o usuário do grupo'

      console.log(e)
      console.log(message)

      return res.status(500).json({ error: e, message })
    }
  }
}
