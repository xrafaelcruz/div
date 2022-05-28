import { PaymentStatus } from 'lib/prisma/constants'
import { convertToMoney } from 'utils/normalize'
import { getUserName } from 'utils/user'

import { User } from 'services/user/types'

import * as t from './types'
import * as s from '../styles'

const PaymentsByExpenses = ({ payments, user }: t.PaymentsByExpensesProps) => {
  const getName = (currentUser: User) =>
    currentUser.id === user.id ? 'Você' : getUserName(currentUser)

  const getPaymentStatus = (paymentStatus: string) =>
    paymentStatus === PaymentStatus.pending ? 'deve' : paymentStatus

  const getStyle = (
    emailPaymentOwner: string,
    paymentStatus: string,
    emailExpensePayer: string
  ) => {
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

  const hasPayments = !!payments?.length

  return (
    <>
      {hasPayments && (
        <s.List>
          {payments.map((payment) => (
            <s.Item key={payment.id}>
              <s.Text>
                <s.Highlight>{getName(payment.user)}</s.Highlight>
              </s.Text>

              <s.Text>
                {getPaymentStatus(payment.paymentStatus)}{' '}
                <s.PaymentValue
                  status={getStyle(
                    payment.userEmail,
                    payment.paymentStatus,
                    payment.expense.userEmail
                  )}
                >
                  {convertToMoney(payment.paymentValue)}
                </s.PaymentValue>{' '}
                pela despesa <s.Highlight>{payment.expense.name}</s.Highlight>
              </s.Text>

              <s.Text>
                para <s.Highlight>{getName(payment.expense.user)}</s.Highlight>
              </s.Text>
            </s.Item>
          ))}
        </s.List>
      )}
    </>
  )
}

export default PaymentsByExpenses
