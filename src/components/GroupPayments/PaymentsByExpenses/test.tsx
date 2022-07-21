import { screen, waitFor } from '@testing-library/react'

import { mockUseRouter, renderComponent } from 'utils/tests'
import { mockUser, mockPaymentsByExpense } from 'utils/tests/mocks'

import PaymentsByExpenses from '.'

describe('Component PaymentsByExpenses', () => {
  it('Should render payments', async () => {
    mockUseRouter()

    await waitFor(() => {
      renderComponent(
        <PaymentsByExpenses
          payments={mockPaymentsByExpense as any}
          user={mockUser}
        />
      )
    })

    expect(screen.getByTestId('payments-by-expenses')).toBeInTheDocument()
    expect(screen.getByText('Você')).toBeInTheDocument()
    expect(screen.getAllByText(/deve/i)[0]).toBeInTheDocument()
  })

  it('Should not render payments when no has payments', async () => {
    mockUseRouter()

    await waitFor(() => {
      renderComponent(
        <PaymentsByExpenses payments={undefined} user={mockUser} />
      )
    })

    expect(screen.queryByTestId('payments-by-expenses')).not.toBeInTheDocument()
  })
})
