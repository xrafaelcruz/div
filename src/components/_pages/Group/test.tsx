import { screen } from '@testing-library/react'

import { mockUseRouter, renderComponent } from 'utils/tests'
import { mockUser, mockGroup } from 'utils/tests/mocks'

import Group from '.'

jest.mock('components/GroupExpenses', () => ({
  __esModule: true,
  default: function Component() {
    return <p>Group Expenses</p>
  }
}))

describe('Component Group', () => {
  it('Should not show edit button when user is not owner of group', async () => {
    mockUseRouter()

    renderComponent(
      <Group
        user={{ ...mockUser, email: 'teste@teste.com' }}
        group={mockGroup as any}
        expenses={{} as any}
      />
    )

    const button = screen.queryByText('Editar')

    expect(button).not.toBeInTheDocument()
  })

  it('Should render GroupExpenses', async () => {
    renderComponent(
      <Group user={mockUser} group={mockGroup as any} expenses={{} as any} />
    )

    const groupExpenses = screen.getByText('Group Expenses')

    expect(groupExpenses).toBeInTheDocument()
  })
})
