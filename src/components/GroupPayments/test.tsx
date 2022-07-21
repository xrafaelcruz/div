import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { mockUseRouter, renderComponent } from 'utils/tests'
import { mockUser } from 'utils/tests/mocks'

import GroupPayments from '.'

jest.mock('components/GroupPayments/PaymentsByExpenses', () => ({
  __esModule: true,
  default: function Component() {
    return <p>PaymentsByExpenses</p>
  }
}))

jest.mock('components/GroupPayments/PaymentsByUsers', () => ({
  __esModule: true,
  default: function Component() {
    return <p>PaymentsByUsers</p>
  }
}))

describe('Component GroupPayments', () => {
  it('Should show filter by users', async () => {
    mockUseRouter()

    await waitFor(() => {
      renderComponent(
        <GroupPayments
          user={mockUser}
          paymentsByExpenses={[]}
          paymentsByUsers={[{} as any]}
        />
      )
    })

    expect(screen.getByText('PaymentsByUsers')).toBeInTheDocument()

    await userEvent.click(screen.getByText('por despesas'))

    expect(screen.queryByText('PaymentsByUsers')).not.toBeInTheDocument()

    await userEvent.click(screen.getByText('por usuários'))

    expect(screen.getByText('PaymentsByUsers')).toBeInTheDocument()
  })

  it('Should show filter by expenses', async () => {
    mockUseRouter()

    await waitFor(() => {
      renderComponent(
        <GroupPayments
          user={mockUser}
          paymentsByExpenses={[{} as any]}
          paymentsByUsers={[]}
        />
      )
    })

    const filterButton = screen.getByText('por despesas')

    await userEvent.click(filterButton)

    const message = screen.getByText('PaymentsByExpenses')

    expect(message).toBeInTheDocument()
  })

  it('Should show not found', async () => {
    mockUseRouter()

    await waitFor(() => {
      renderComponent(
        <GroupPayments
          user={mockUser}
          paymentsByExpenses={[]}
          paymentsByUsers={[]}
        />
      )
    })

    const message = screen.getByText('Nenhum resultado a ser exibido ainda')

    expect(message).toBeInTheDocument()
  })
})
