// import { NextApiRequest, NextApiResponse } from 'next'
// import prisma from 'lib/prisma'

// export default async function Get(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'GET') {
//     const { idExpense } = req.query

//     if (!idExpense) {
//       const message = 'Erro ao buscar a despesa'
//       console.log(message)
//       return res.status(500).json({ error: 'Parâmetros inválidos', message })
//     }

//     try {
//       const expense = await prisma.expense.findUnique({
//         where: {
//           id: idExpense as string
//         },
//         include: {
//           ExpenseUserGroup: true
//         }
//       })

//       if (!expense) {
//         return res
//           .status(500)
//           .json({ error: 404, message: 'Despesa não encontrada!' })
//       }

//       return res.status(200).json(expense)
//     } catch (e) {
//       const message = `Erro ao buscar a despesa ${idExpense}`

//       console.log(e)
//       console.log(message)

//       return res.status(500).json({ error: e, message })
//     }
//   }
// }
