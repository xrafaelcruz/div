import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'

export default async function Create(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { email } = req.body

      await prisma.user.create({
        data: {
          email,
          name: '',
          password: '',
          photo: '',
          pix: '',
          description: ''
        }
      })

      return res.status(201).json({})
    } catch (e) {
      const message = 'Erro ao criar o usuário'

      console.log(e)
      console.log(message)

      return res.status(500).json({ error: e, message })
    }
  }
}
