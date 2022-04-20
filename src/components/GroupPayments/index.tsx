import { PaymentStatus } from 'lib/prisma/constants'
import { convertToMoney } from 'utils/normalize'
import { getUserName } from 'utils/user'

import { User } from 'services/user/types'

import * as t from './types'
import * as s from './styles'

const GroupPayments = ({ payments, user }: t.GroupPaymentsProps) => {
  const getName = (currentUser: User) => {
    if (currentUser.id === user.id) {
      return 'Você'
    }

    return getUserName(currentUser)
  }

  const getPaymentStatus = (paymentStatus: string) => {
    if (paymentStatus === PaymentStatus.pending) {
      return 'deve'
    }

    return paymentStatus
  }

  const highlightPaymentValue = (
    emailPaymentOwner: string,
    paymentStatus: string,
    emailExpensePayer: string
  ) => {
    if (paymentStatus === PaymentStatus.paid) {
      return 'style1'
    }

    if (
      emailPaymentOwner === user.email &&
      paymentStatus === PaymentStatus.pending
    ) {
      return 'style2'
    }

    if (
      emailPaymentOwner !== user.email &&
      paymentStatus === PaymentStatus.pending &&
      emailExpensePayer === user.email
    ) {
      return 'style3'
    }

    if (
      emailPaymentOwner !== user.email &&
      paymentStatus === PaymentStatus.pending
    ) {
      return 'style4'
    }
  }

  return (
    <section>
      <h2>{payments?.length ? 'Resultados' : ''}</h2>

      <s.List>
        {payments?.map((payment) => (
          <s.Item key={payment.id}>
            <s.Text>
              <s.Highlight>{getName(payment.user)}</s.Highlight>
            </s.Text>

            <s.Text
              status={highlightPaymentValue(
                payment.userEmail,
                payment.paymentStatus,
                payment.expense.userEmail
              )}
            >
              {getPaymentStatus(payment.paymentStatus)}{' '}
              <s.PaymentValue>
                {convertToMoney(payment.paymentValue)}
              </s.PaymentValue>
            </s.Text>

            <s.Text>
              para <s.Highlight>{getName(payment.expense.user)}</s.Highlight>
            </s.Text>
          </s.Item>
        ))}
      </s.List>
    </section>
  )
}

export default GroupPayments
