import { convertToMoney } from 'utils/normalize'

import * as t from './types'
import * as s from '../styles'

const PaymentsByUsers = ({ payments, user }: t.PaymentsByUsersProps) => {
  const getName = (email: string) => (email === user.email ? 'Você' : email)

  const getStyle = (from: string, to: string) => {
    if (from === user.email) {
      return 'style2'
    }

    if (to === user.email) {
      return 'style3'
    }

    return 'style4'
  }

  const getStyleByValue = (from: string, to: string, finalPayment: number) => {
    if (from === user.email && finalPayment === 0) {
      return 'style3'
    }

    if (to === user.email) {
      return 'style3'
    }

    if (from === user.email && finalPayment > 0) {
      return 'style2'
    }

    return 'style4'
  }

  const hasPayments = !!payments?.length

  return (
    <>
      {hasPayments && (
        <s.List>
          {payments.map((payment, i) => (
            <s.Item key={i}>
              <s.Text>
                <s.Highlight>{getName(payment.from)}</s.Highlight>
              </s.Text>

              <s.Text>
                está devendo{' '}
                <s.PaymentValue status={getStyle(payment.from, payment.to)}>
                  {convertToMoney(payment.total)}
                </s.PaymentValue>{' '}
                {payment.total !== payment.finalPayment && (
                  <>
                    mas deve pagar{' '}
                    <s.PaymentValue
                      status={getStyleByValue(
                        payment.from,
                        payment.to,
                        payment.finalPayment
                      )}
                    >
                      {convertToMoney(payment.finalPayment)}
                    </s.PaymentValue>
                  </>
                )}
              </s.Text>

              <s.Text>
                para <s.Highlight>{getName(payment.to)}</s.Highlight>
              </s.Text>
            </s.Item>
          ))}
        </s.List>
      )}
    </>
  )
}

export default PaymentsByUsers
