import { PaymentStatus } from 'lib/prisma/constants'
import { convertToMoney } from 'utils/normalize'

import * as t from './types'
import * as s from './styles'

const GroupPayments = ({ payments, user }: t.GroupPaymentsProps) => {
  const getName = (name: string) => {
    if (name === user.name) {
      return 'Você'
    }

    return name
  }

  const getPaymentStatus = (paymentStatus: string) => {
    if (paymentStatus === PaymentStatus.pending) {
      return 'deve'
    }

    return paymentStatus
  }

  const highlightPaymentValue = (
    paymentOwner: string,
    paymentStatus: string,
    expensePayer: string
  ) => {
    if (paymentStatus === PaymentStatus.paid) {
      return 'style1'
    }

    if (paymentOwner === user.name && paymentStatus === PaymentStatus.pending) {
      return 'style2'
    }

    if (
      paymentOwner !== user.name &&
      paymentStatus === PaymentStatus.pending &&
      expensePayer === user.name
    ) {
      return 'style3'
    }

    if (paymentOwner !== user.name && paymentStatus === PaymentStatus.pending) {
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
              <s.Highlight>{getName(payment.userName)}</s.Highlight>
            </s.Text>

            <s.Text
              status={highlightPaymentValue(
                payment.userName,
                payment.paymentStatus,
                payment.expense.userName
              )}
            >
              {getPaymentStatus(payment.paymentStatus)}{' '}
              <s.PaymentValue>
                {convertToMoney(payment.paymentValue)}
              </s.PaymentValue>
            </s.Text>

            <s.Text>
              para{' '}
              <s.Highlight>{getName(payment.expense.userName)}</s.Highlight>
            </s.Text>
          </s.Item>
        ))}
      </s.List>
    </section>
  )
}

export default GroupPayments
