import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { mockUseRouter, renderComponent } from 'utils/tests'
import { mockUser } from 'utils/tests/mocks'

import Footer from '.'

jest.mock(
  'next/link',
  () =>
    ({ children }: any) =>
      children
)

describe('Component Footer', () => {
  it('Should call router.push when click in new expense', async () => {
    const { mockPush } = mockUseRouter()

    renderComponent(<Footer user={mockUser} />)

    const button = screen.getByLabelText('Nova despesa')

    await userEvent.click(button)

    expect(mockPush).toHaveBeenCalledWith('/nova-despesa?idGroup=1')
  })
})
