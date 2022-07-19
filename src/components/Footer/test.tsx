import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { mockUseRouter, renderComponent } from 'utils/tests'
import { mockUser } from 'utils/tests/mocks'

import Footer from '.'

describe('Component Footer', () => {
  it('Should call router.push when click in groups', async () => {
    const { mockPush } = mockUseRouter()

    renderComponent(<Footer user={mockUser} />)

    const button = screen.getByText('Grupos')

    await userEvent.click(button)

    expect(mockPush).toHaveBeenCalledWith('/')
  })

  it('Should call router.push when click in new expense', async () => {
    const { mockPush } = mockUseRouter()

    renderComponent(<Footer user={mockUser} />)

    const button = screen.getByLabelText('Nova despesa')

    await userEvent.click(button)

    expect(mockPush).toHaveBeenCalledWith('/nova-despesa?idGroup=1')
  })

  it('Should call router.push when click in profile', async () => {
    const { mockPush } = mockUseRouter()

    renderComponent(<Footer user={mockUser} />)

    const button = screen.getByLabelText('Perfil')

    await userEvent.click(button)

    expect(mockPush).toHaveBeenCalledWith('/perfil')
  })
})
