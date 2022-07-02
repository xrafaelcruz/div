import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'
import { checkToken } from 'lib/auth'

import { User as PrismaUser } from '@prisma/client'
import { User } from 'services/user/types'

function normalizeUser(user: PrismaUser): User {
  return {
    ...user,
    createdAt: user?.createdAt.toISOString() || '',
    updatedAt: user?.updatedAt.toISOString() || ''
  }
}

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

      if (user) {
        return res.status(200).json(normalizeUser(user))
      }

      return res.status(200).json({})
    } catch (e) {
      const message = `Erro ao buscar os detalhes do usuário ${userEmail}`

      console.log(e)
      console.log(message)

      return res.status(500).json({ error: e, message })
    }
  }
}
