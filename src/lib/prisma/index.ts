import { PrismaClient } from '@prisma/client'
import { Prisma } from './types'

let prisma: Prisma

const globalAny: any = global

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!globalAny.prisma) {
    globalAny.prisma = new PrismaClient()
  }

  prisma = globalAny.prisma
}

export default prisma
