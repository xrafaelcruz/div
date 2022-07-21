import { convertToMoney } from 'utils/normalize'

import * as t from './types'
import * as h from './helpers'
import * as s from '../styles'

const PaymentsByExpenses = ({ payments, user }: t.PaymentsByExpensesProps) => {
  const hasPayments = !!payments?.length

  return (
    <>
      {hasPayments && (
        <s.List data-testid="payments-by-expenses">
          {payments.map((payment) => (
            <s.Item key={payment.id}>
              <s.Text>
                <s.Highlight>{h.getName(payment.user, user)}</s.Highlight>
              </s.Text>

              <s.Text>
                {h.getPaymentStatus(payment.paymentStatus)}{' '}
                <s.PaymentValue
                  status={h.getStyle(
                    user.email,
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
                para{' '}
                <s.Highlight>
                  {h.getName(payment.expense.user, user)}
                </s.Highlight>
              </s.Text>
            </s.Item>
          ))}
        </s.List>
      )}
    </>
  )
}

export default PaymentsByExpenses
