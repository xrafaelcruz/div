import { screen, waitFor } from '@testing-library/react'

import { mockUseRouter, renderComponent } from 'utils/tests'
import { mockUser } from 'utils/tests/mocks'

import EditGroup from '.'

jest.mock('components/GroupForm', () => ({
  __esModule: true,
  default: function Component() {
    return <p>Group Form</p>
  }
}))

describe('Component EditGroup', () => {
  it('Should render expense form', async () => {
    mockUseRouter()

    await waitFor(() => {
      renderComponent(<EditGroup user={mockUser} group={{} as any} />)
    })

    const expenseForm = screen.getByText('Group Form')

    expect(expenseForm).toBeInTheDocument()
  })
})
