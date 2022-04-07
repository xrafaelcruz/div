import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'

export default async function Create(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { idOwnerUser, name, members } = req.body

    const usersGroup = members.map((value: string) => ({
      userName: value,
      inviteStatus: ''
    }))

    const createdGroup = await prisma.group.create({
      data: {
        idOwnerUser,
        name,
        photo: '',
        description: '',
        UserGroup: {
          create: usersGroup
        }
      }
    })

    return res.status(201).json(createdGroup)
  } catch (e) {
    const message = 'Erro ao criar o grupo'

    console.log(e)
    console.log(message)

    return res.status(500).json({ error: e, message })
  }
}
