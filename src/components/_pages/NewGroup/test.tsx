import { screen, waitFor } from '@testing-library/react'

import { mockUseRouter, renderComponent } from 'utils/tests'
import { mockUser } from 'utils/tests/mocks'

import NewGroup from '.'

jest.mock('components/GroupForm', () => ({
  __esModule: true,
  default: function Component() {
    return <p>Group Form</p>
  }
}))

describe('Component NewGroup', () => {
  it('Should render group form', async () => {
    mockUseRouter()

    await waitFor(() => {
      renderComponent(<NewGroup user={mockUser} />)
    })

    const create = screen.getByText('Group Form')

    expect(create).toBeInTheDocument()
  })
})
