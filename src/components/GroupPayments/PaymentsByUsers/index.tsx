import { convertToMoney } from 'utils/normalize'

import * as t from './types'
import * as s from '../styles'

const PaymentsByUsers = ({ payments, user }: t.PaymentsByUsersProps) => {
  const getName = (email: string) => {
    if (email === user.email) {
      return 'Você'
    }

    return email
  }

  const highlightPaymentValue = (from: string, to: string) => {
    if (from === user.email) {
      return 'style2'
    }

    if (to === user.email) {
      return 'style3'
    }

    return 'style4'
  }

  return (
    <>
      {!!payments?.length && (
        <s.List>
          {payments.map((payment, i) => (
            <s.Item key={i}>
              <s.Text>
                <s.Highlight>{getName(payment.from)}</s.Highlight>
              </s.Text>

              <s.Text status={highlightPaymentValue(payment.from, payment.to)}>
                deve{' '}
                <s.PaymentValue>{convertToMoney(payment.total)}</s.PaymentValue>{' '}
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
