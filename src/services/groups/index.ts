import { Group } from '@prisma/client'

import { POST } from 'lib/api'

import { CreateGroupParams } from './types'

export async function createGroup(data: CreateGroupParams) {
  let createdGroup: Group | null = null

  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/groups/create`
    const response = await POST(url, data)

    createdGroup = await response.json()
  } catch (e) {
    console.log(e)
    throw new Error('Erro ao criar o grupo')
  }

  return createdGroup
}
