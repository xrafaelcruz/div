import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'
import { checkToken } from 'lib/auth'
import { InviteStatus } from 'lib/prisma/constants'

export default async function List(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    checkToken(req, res)

    const { userEmail } = req.query

    if (!userEmail) {
      const message = 'Erro ao buscar os grupos do usuário'
      console.log(message)
      return res.status(500).json({ error: 'Parâmetros inválidos', message })
    }

    let groups = []

    try {
      const userGroups = await prisma.userGroup.findMany({
        where: {
          userEmail: userEmail as string,
          inviteStatus: InviteStatus.accept as string
        },
        include: {
          group: true
        }
      })

      groups = userGroups.map((userGroup) => userGroup.group)
    } catch (e) {
      const message = `Erro ao buscar os grupos do usuário ${userEmail}`

      console.log(e)
      console.log(message)

      return res.status(500).json({ error: e, message })
    }

    try {
      const groupsSum = await prisma.expense.groupBy({
        by: ['idGroup'],
        where: {
          idGroup: {
            in: groups.map((group) => group.id)
          }
        },
        _sum: {
          value: true
        }
      })

      const finalGroups = groups.map((group) => {
        const founded = groupsSum.find(
          (groupSum) => groupSum.idGroup === group.id
        )

        return {
          ...group,
          total: Number(founded?._sum.value)
        }
      })

      return res.status(200).json(finalGroups)
    } catch (e) {
      const message = `Erro ao buscar o total de despesas dos grupos`

      console.log(e)
      console.log(message)

      return res.status(500).json({ error: e, message })
    }
  }
}
