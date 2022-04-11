import { NextApiRequest, NextApiResponse } from 'next'
import { UserGroup } from '@prisma/client'
import prisma from 'lib/prisma'

type UserGroupToCreation = Pick<UserGroup, 'userName' | 'inviteStatus'>

export default async function Create(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { idOwnerUser, name, users } = req.body

      if (!idOwnerUser || !name || !users) {
        const message = 'Erro ao criar o grupo'
        console.log(message)
        return res.status(500).json({ error: 'Parâmetros inválidos', message })
      }

      const usersGroup: UserGroupToCreation[] = users.map((value: string) => ({
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
}
