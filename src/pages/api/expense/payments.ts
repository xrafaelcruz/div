import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'
import { PaymentStatus } from 'lib/prisma/constants'

export default async function Payments(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { idGroup } = req.query

    if (!idGroup) {
      const message = 'Erro ao buscar aos pagamentos do grupo'
      console.log(message)
      return res.status(500).json({ error: 'Parâmetros inválidos', message })
    }

    try {
      const hasIdGroup = idGroup && typeof idGroup === 'string'

      if (hasIdGroup) {
        // @TODO melhorar o retorno
        const payments = await prisma.expenseUserGroup.findMany({
          where: {
            idGroup,
            paymentStatus: {
              not: {
                equals: PaymentStatus.payer
              }
            }
          },
          include: {
            expense: true
          }
        })

        return res.status(200).json(payments)
      }
    } catch (e) {
      const message = `Erro ao buscar os pagamentos do grupo ${idGroup}`

      console.log(e)
      console.log(message)

      return res.status(500).json({ error: e, message })
    }
  }
}
