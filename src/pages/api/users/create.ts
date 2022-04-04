import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'

export default async function Create(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
}
