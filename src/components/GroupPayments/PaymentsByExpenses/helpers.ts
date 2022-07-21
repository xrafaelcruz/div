import { getUserName } from 'utils/user'

import { PaymentStatus } from 'lib/prisma/constants'
import { User } from 'services/user/types'

export const getName = (currentUser: User, loggedUser: User) =>
  currentUser.id === loggedUser.id ? 'Você' : getUserName(currentUser)

export const getPaymentStatus = (paymentStatus: string) =>
  paymentStatus === PaymentStatus.pending ? 'deve' : paymentStatus

export const getStyle = (
  userEmail: string,
  emailPaymentOwner: string,
  paymentStatus: string,
  emailExpensePayer: string
) => {
  if (
    emailPaymentOwner === userEmail &&
    paymentStatus === PaymentStatus.pending
  ) {
    return 'style2'
  }

  if (
    emailPaymentOwner !== userEmail &&
    paymentStatus === PaymentStatus.pending &&
    emailExpensePayer === userEmail
  ) {
    return 'style3'
  }

  if (
    emailPaymentOwner !== userEmail &&
    paymentStatus === PaymentStatus.pending
  ) {
    return 'style4'
  }
}
