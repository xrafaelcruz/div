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
    const { ownerUserEmail, name, description } = req.body
    const emails = req.body.emails as string[]

    if (!ownerUserEmail || !name || !emails) {
      const message = 'Erro ao criar o grupo'
      console.log(message)
      return res.status(500).json({ error: 'Parâmetros inválidos', message })
    }

    let foundedUsers: User[]
    const usersToCreation: CreateUserParams[] = []
    const uniqueEmails = emails.filter((v, i, a) => a.indexOf(v) == i)

    try {
      foundedUsers = await prisma.user.findMany({
        where: {
          email: {
            in: uniqueEmails
          }
        }
      })

      uniqueEmails.forEach((email: string) => {
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
    } catch (e) {
      const message = 'Erro ao buscar os usuários'

      console.log(e)
      console.log(message)

      return res.status(500).json({ error: e, message })
    }

    try {
      if (usersToCreation.length) {
        await prisma.user.createMany({
          data: usersToCreation
        })
      }
    } catch (e) {
      const message = 'Erro ao criar os usuários'

      console.log(e)
      console.log(message)

      return res.status(500).json({ error: e, message })
    }

    try {
      const usersGroup: UserGroupToCreation[] = uniqueEmails.map(
        (email: string) => ({
          userEmail: email,
          inviteStatus:
            email === ownerUserEmail
              ? InviteStatus.accept
              : InviteStatus.pending
        })
      )

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
