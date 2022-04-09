import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'

export default async function Members(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const { idGroup } = req.query

      const hasIdGroup = idGroup && typeof idGroup === 'string'

      if (hasIdGroup) {
        const groupWithMembers = await prisma.group.findUnique({
          where: {
            id: idGroup
          },
          include: {
            UserGroup: true
          }
        })

        return res.status(200).json(groupWithMembers?.UserGroup)
      }
    } catch (e) {
      const message = 'Erro ao buscar os grupos'

      console.log(e)
      console.log(message)

      return res.status(500).json({ error: e, message })
    }
  }
}
