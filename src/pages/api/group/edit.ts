import { NextApiRequest, NextApiResponse } from 'next'
import { UserGroup, User } from '@prisma/client'
import { InviteStatus } from 'lib/prisma/constants'
import prisma from 'lib/prisma'

import { CreateUserParams } from 'services/user/types'

type UserGroupToCreation = Pick<
  UserGroup,
  'idGroup' | 'userEmail' | 'inviteStatus'
>

export default async function Update(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'PUT') {
    const { id, name, description } = req.body
    const emails = req.body.emails as string[]

    if (!id || !name || !emails) {
      const message = 'Erro ao editar o grupo'
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

    let users: User[] = []

    try {
      const usersGroup = await prisma.userGroup.findMany({
        where: {
          idGroup: id as string
        },
        include: {
          user: true
        }
      })

      users = usersGroup.map((userGroup) => userGroup.user)
    } catch (e) {
      const message = `Erro ao buscar os usuários do grupo ${id}`

      console.log(e)
      console.log(message)

      return res.status(500).json({ error: e, message })
    }

    try {
      const emailsToCreation = uniqueEmails.filter((email) => {
        const founded = users.find((user) => user.email === email)
        return !founded
      })

      const usersGroup: UserGroupToCreation[] = emailsToCreation.map(
        (email: string) => ({
          idGroup: id,
          userEmail: email,
          inviteStatus: InviteStatus.pending
        })
      )

      await prisma.userGroup.createMany({
        data: usersGroup
      })
    } catch (e) {
      const message = 'Erro ao adicionar usuários ao grupo'

      console.log(e)
      console.log(message)

      return res.status(500).json({ error: e, message })
    }

    try {
      await prisma.group.update({
        data: {
          name,
          description
        },
        where: {
          id
        }
      })

      return res.status(200).json({})
    } catch (e) {
      const message = 'Erro ao atualizar o grupo'

      console.log(e)
      console.log(message)

      return res.status(500).json({ error: e, message })
    }
  }
}
