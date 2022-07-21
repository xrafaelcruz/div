import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { mockUseRouter, renderComponent } from 'utils/tests'
import {
  mockUser,
  mockGroup,
  mockPaymentsByExpense,
  mockPaymentsByUsers
} from 'utils/tests/mocks'

import Payments from '.'

describe('Component Payments', () => {
  it('Should render group header', async () => {
    mockUseRouter()

    await waitFor(() => {
      renderComponent(
        <Payments
          user={mockUser}
          group={mockGroup as any}
          paymentsByExpenses={mockPaymentsByExpense as any}
          paymentsByUsers={mockPaymentsByUsers}
        />
      )
    })

    const group = screen.getByText(mockGroup.name)

    expect(group).toBeInTheDocument()
  })

  it('Should call route.push when click edit group', async () => {
    const { mockPush } = mockUseRouter()

    await waitFor(() => {
      renderComponent(
        <Payments
          user={mockUser}
          group={mockGroup as any}
          paymentsByExpenses={mockPaymentsByExpense as any}
          paymentsByUsers={mockPaymentsByUsers}
        />
      )
    })

    const edit = screen.getByText('Editar grupo')

    await userEvent.click(edit)

    expect(mockPush).toBeCalledWith(`/editar-grupo?idGroup=${mockGroup.id}`)
  })

  it('Should not show edit button when user is not owner of group', async () => {
    mockUseRouter()

    await waitFor(() => {
      renderComponent(
        <Payments
          user={{ ...mockUser, email: 'teste@teste.com' }}
          group={mockGroup as any}
          paymentsByExpenses={mockPaymentsByExpense as any}
          paymentsByUsers={mockPaymentsByUsers}
        />
      )
    })

    const edit = screen.queryByText('Editar grupo')

    expect(edit).not.toBeInTheDocument()
  })

  it('Should render results', async () => {
    mockUseRouter()

    await waitFor(() => {
      renderComponent(
        <Payments
          user={mockUser}
          group={mockGroup as any}
          paymentsByExpenses={mockPaymentsByExpense as any}
          paymentsByUsers={mockPaymentsByUsers}
        />
      )
    })

    const results = screen.getByText('Resultados')

    expect(results).toBeInTheDocument()
  })
})
