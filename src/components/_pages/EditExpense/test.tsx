import { screen, waitFor } from '@testing-library/react'

import { mockUseRouter, renderComponent } from 'utils/tests'
import { mockGroups, mockUser } from 'utils/tests/mocks'

import EditExpense from '.'

jest.mock('components/ExpenseForm', () => ({
  __esModule: true,
  default: function Component() {
    return <p>Expense Form</p>
  }
}))

describe('Component EditExpense', () => {
  it('Should render expense form when groups is not null', async () => {
    mockUseRouter()

    jest
      .spyOn(require('services/group/hooks/useGetGroups'), 'default')
      .mockReturnValue({ groups: mockGroups })

    await waitFor(() => {
      renderComponent(<EditExpense user={mockUser} expense={{} as any} />)
    })

    const expenseForm = screen.getByText('Expense Form')

    expect(expenseForm).toBeInTheDocument()
  })

  it('Should not render expense form when groups not null', async () => {
    mockUseRouter()

    jest
      .spyOn(require('services/group/hooks/useGetGroups'), 'default')
      .mockReturnValue({ groups: null })

    await waitFor(() => {
      renderComponent(<EditExpense user={mockUser} expense={{} as any} />)
    })

    const expenseForm = screen.queryByText('Expense Form')

    expect(expenseForm).not.toBeInTheDocument()
  })
})
