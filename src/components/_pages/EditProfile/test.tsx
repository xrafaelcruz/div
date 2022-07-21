import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { toast } from 'react-toastify'

import { mockUseRouter, renderComponent } from 'utils/tests'
import { mockUser } from 'utils/tests/mocks'

import EditProfile from '.'

describe('Component EditProfile', () => {
  it('Should render infos', async () => {
    mockUseRouter()

    await waitFor(() => {
      renderComponent(<EditProfile user={mockUser} />)
    })

    const email = screen.getByText(mockUser.email)
    const name = screen.getByDisplayValue(mockUser.name)
    const pix = screen.getByDisplayValue(mockUser.pix)
    const description = screen.getByDisplayValue(mockUser.description)

    expect(email).toBeInTheDocument()
    expect(name).toBeInTheDocument()
    expect(pix).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })

  it('Should call updateUserService and router.back when submit', async () => {
    const { mockBack } = mockUseRouter()

    const mockUpdateUserService = jest.fn()
    jest
      .spyOn(require('services/user'), 'updateUserService')
      .mockImplementation(mockUpdateUserService)

    await waitFor(() => {
      renderComponent(<EditProfile user={mockUser} />)
    })

    const email = screen.getByText('SALVAR')

    await userEvent.click(email)

    expect(mockUpdateUserService).toHaveBeenCalledWith({
      idUser: mockUser.id,
      name: mockUser.name,
      pix: mockUser.pix,
      description: mockUser.description
    })

    expect(mockBack).toHaveBeenCalled()
  })

  it('Should call toast when submit fail', async () => {
    mockUseRouter()

    jest
      .spyOn(require('services/user'), 'updateUserService')
      .mockImplementation(() => {
        throw new Error('Erro')
      })

    const mockToastError = jest.fn()
    toast.error = mockToastError

    await waitFor(() => {
      renderComponent(<EditProfile user={mockUser} />)
    })

    const email = screen.getByText('SALVAR')

    await userEvent.click(email)

    expect(mockToastError).toHaveBeenCalledWith(
      'Não foi possível atualizar o perfil'
    )
  })

  it('Should call registers on render', async () => {
    mockUseRouter()

    const mockRegister = jest.fn()
    jest.spyOn(require('react-hook-form'), 'useForm').mockReturnValue({
      register: mockRegister,
      handleSubmit: jest.fn(),
      formState: { errors: {} }
    })

    await waitFor(() => {
      renderComponent(<EditProfile user={mockUser} />)
    })

    expect(mockRegister).toHaveBeenCalledWith('name', {
      required: { message: 'Campo obrigatório', value: true }
    })
    expect(mockRegister).toHaveBeenCalledWith('pix')
    expect(mockRegister).toHaveBeenCalledWith('description')
  })
})
