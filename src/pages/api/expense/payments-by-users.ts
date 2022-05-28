import { NextApiRequest, NextApiResponse } from 'next'
import { Prisma } from 'prisma/prisma-client'

import prisma from 'lib/prisma'
import { PaymentStatus } from 'lib/prisma/constants'
import { checkToken } from 'lib/auth'

import { PaymentByUser } from 'services/expense/types'

export default async function PaymentsByUsers(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    checkToken(req, res)

    const { idGroup } = req.query

    if (!idGroup) {
      const message = 'Erro ao buscar o resultado final dos pagamentos'
      console.log(message)
      return res.status(500).json({ error: 'Parâmetros inválidos', message })
    }

    try {
      const payments = (await prisma.$queryRaw(
        Prisma.sql`select foo.from, foo.to, SUM(foo.valor) as total from (select eug."userEmail" as from, e."userEmail" as to, eug."paymentValue" as valor from "ExpenseUserGroup" eug
        join "Expense" e ON eug."idExpense" = e.id
        where eug."idGroup" = ${idGroup} and eug."paymentStatus" != ${PaymentStatus.payer}) as foo
        group by foo.from, foo.to`
      )) as PaymentByUser[]

      const finalPayments = payments.map((current) => {
        const { from, to, total } = current
        let finalPayment = total

        payments.forEach((paymentByUser) => {
          if (
            from !== paymentByUser.from &&
            from === paymentByUser.to &&
            to === paymentByUser.from
          ) {
            if (total > paymentByUser.total) {
              finalPayment = total - paymentByUser.total
            } else {
              finalPayment = 0
            }
          }
        })

        return {
          ...current,
          finalPayment
        }
      })

      return res.status(200).json(finalPayments)
    } catch (e) {
      const message = `Erro ao buscar o resultado final dos pagamentos`

      console.log(e)
      console.log(message)

      return res.status(500).json({ error: e, message })
    }
  }
}
