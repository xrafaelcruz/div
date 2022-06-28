import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'

export default async function Update(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    const { idGroup } = req.query

    if (!idGroup) {
      const message = 'Erro ao remover o grupo'
      console.log(message)
      return res.status(500).json({ error: 'Parâmetros inválidos', message })
    }

    try {
      await prisma.expenseUserGroup.deleteMany({
        where: {
          idGroup: idGroup as string
        }
      })
    } catch (e) {
      const message =
        'Erro ao remover o vínculo das despesas e usuários do grupo'

      console.log(e)
      console.log(message)

      return res.status(500).json({ error: e, message })
    }

    try {
      await prisma.expense.deleteMany({
        where: {
          idGroup: idGroup as string
        }
      })
    } catch (e) {
      const message = 'Erro ao remover as despesas do grupo'

      console.log(e)
      console.log(message)

      return res.status(500).json({ error: e, message })
    }

    try {
      await prisma.userGroup.deleteMany({
        where: {
          idGroup: idGroup as string
        }
      })
    } catch (e) {
      const message = 'Erro ao remover os usuários do grupo'

      console.log(e)
      console.log(message)

      return res.status(500).json({ error: e, message })
    }

    try {
      await prisma.group.deleteMany({
        where: {
          id: idGroup as string
        }
      })

      return res.status(200).json({})
    } catch (e) {
      const message = 'Erro ao remover o grupo'

      console.log(e)
      console.log(message)

      return res.status(500).json({ error: e, message })
    }
  }
}
