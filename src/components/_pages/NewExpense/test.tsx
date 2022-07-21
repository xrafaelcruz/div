import { screen, waitFor } from '@testing-library/react'

import { mockUseRouter, renderComponent } from 'utils/tests'
import { mockGroups, mockUser } from 'utils/tests/mocks'

import NewExpense from '.'

jest.mock('components/ExpenseForm', () => ({
  __esModule: true,
  default: function Component() {
    return <p>Expense Form</p>
  }
}))

describe('Component NewExpense', () => {
  it('Should render expense form', async () => {
    mockUseRouter()

    jest
      .spyOn(require('services/group/hooks/useGetGroups'), 'default')
      .mockReturnValue({ groups: mockGroups })

    await waitFor(() => {
      renderComponent(<NewExpense user={mockUser} />)
    })

    const expenseForm = screen.getByText('Expense Form')

    expect(expenseForm).toBeInTheDocument()
  })
})
