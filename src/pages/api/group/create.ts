import { NextApiRequest, NextApiResponse } from 'next'
import { UserGroup, User } from '@prisma/client'

import prisma from 'lib/prisma'
import { InviteStatus } from 'lib/prisma/constants'

import { CreateUserParams } from 'services/user/types'

type UserGroupToCreation = Pick<UserGroup, 'userEmail' | 'inviteStatus'>

export default async function Create(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { ownerUserEmail, name, description, emails } = req.body

    if (!ownerUserEmail || !name || !emails) {
      const message = 'Erro ao criar o grupo'
      console.log(message)
      return res.status(500).json({ error: 'Parâmetros inválidos', message })
    }

    let foundedUsers: User[]
    let createdUsers: any
    const usersToCreation: CreateUserParams[] = []

    try {
      foundedUsers = await prisma.user.findMany({
        where: {
          email: {
            in: emails
          }
        }
      })

      emails.forEach((email: string) => {
        const founded = foundedUsers.find((user) => user.email === email)

        if (!founded) {
          usersToCreation.push({
            email,
            name: '',
            description: '',
            password: '',
            photo: '',
            pix: ''
          })
        }
      })

      console.log('usersToCreation', usersToCreation)
    } catch (e) {
      const message = 'Erro ao buscar os usuários'

      console.log(e)
      console.log(message)

      return res.status(500).json({ error: e, message })
    }

    try {
      if (usersToCreation.length) {
        createdUsers = await prisma.user.createMany({
          data: usersToCreation
        })

        console.log('createdUsers', createdUsers)
      }
    } catch (e) {
      const message = 'Erro ao criar os usuários'

      console.log(e)
      console.log(message)

      return res.status(500).json({ error: e, message })
    }

    try {
      const usersGroup: UserGroupToCreation[] = emails.map((email: string) => ({
        userEmail: email,
        inviteStatus:
          email === ownerUserEmail ? InviteStatus.accept : InviteStatus.pending
      }))

      console.log('ownerUserEmail', ownerUserEmail)

      const createdGroup = await prisma.group.create({
        data: {
          ownerUserEmail,
          name,
          description: description || '',
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
