import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { mockUseRouter, renderComponent } from 'utils/tests'
import { mockUser } from 'utils/tests/mocks'

import Home from '.'

describe('Component Home', () => {
  it('Should call signOut when click in exit', async () => {
    mockUseRouter()

    const mockSignOut = jest.fn()

    jest
      .spyOn(require('next-auth/react'), 'signOut')
      .mockImplementation(mockSignOut)

    renderComponent(<Home user={mockUser} />)

    const button = screen.getByText('Sair')

    await userEvent.click(button)

    expect(mockSignOut).toHaveBeenCalled()
  })

  it('Should call router.push when click edit button', async () => {
    const { mockPush } = mockUseRouter()

    renderComponent(<Home user={mockUser} />)

    const button = screen.getByText('Editar')

    await userEvent.click(button)

    expect(mockPush).toHaveBeenCalledWith(`/editar-perfil`)
  })

  it('Should show user name', async () => {
    mockUseRouter()

    renderComponent(<Home user={mockUser} />)

    const name = screen.getByText(mockUser.name)

    expect(name).toBeInTheDocument()
  })

  it('Should show user email', async () => {
    mockUseRouter()

    renderComponent(<Home user={mockUser} />)

    const email = screen.getByText(mockUser.email)

    expect(email).toBeInTheDocument()
  })

  it('Should show user pix', async () => {
    mockUseRouter()

    renderComponent(<Home user={mockUser} />)

    const pix = screen.getByText(mockUser.pix)

    expect(pix).toBeInTheDocument()
  })

  it('Should show user description', async () => {
    mockUseRouter()

    renderComponent(<Home user={mockUser} />)

    const description = screen.getByText(mockUser.description)

    expect(description).toBeInTheDocument()
  })
})
