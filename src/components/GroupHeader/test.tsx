import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { toast } from 'react-toastify'

import { mockUseRouter, renderComponent } from 'utils/tests'
import { mockUser, mockGroup } from 'utils/tests/mocks'

import GroupHeader from '.'

describe('Component GroupHeader', () => {
  it('Should close modal when click no', async () => {
    mockUseRouter()

    await waitFor(() => {
      renderComponent(
        <GroupHeader
          user={{ ...mockUser, email: 'teste@teste.com' }}
          group={mockGroup}
        />
      )
    })

    const buttonExit = screen.getByText('Sair do grupo')
    await userEvent.click(buttonExit)

    expect(
      screen.getByText('Tem certeza que quer sair do grupo')
    ).toBeInTheDocument()

    const buttonNo = screen.getByText('Não')
    await userEvent.click(buttonNo)

    expect(
      screen.queryByText('Tem certeza que quer sair do grupo')
    ).not.toBeInTheDocument()
  })

  it('Should call exitGroupService when click yes', async () => {
    const { mockPush } = mockUseRouter()

    const mockUpdateUserService = jest.fn()
    jest
      .spyOn(require('services/group'), 'exitGroupService')
      .mockImplementation(mockUpdateUserService)

    await waitFor(() => {
      renderComponent(
        <GroupHeader
          user={{ ...mockUser, email: 'teste@teste.com' }}
          group={mockGroup}
        />
      )
    })

    const buttonExit = screen.getByText('Sair do grupo')
    await userEvent.click(buttonExit)

    expect(
      screen.getByText('Tem certeza que quer sair do grupo')
    ).toBeInTheDocument()

    const buttonYes = screen.getByText('Sim')
    await userEvent.click(buttonYes)

    expect(mockUpdateUserService).toHaveBeenCalledWith(
      mockGroup.id,
      'teste@teste.com'
    )

    expect(mockPush).toHaveBeenCalledWith('/')
  })

  it('Should call toast when submit fail', async () => {
    mockUseRouter()

    jest
      .spyOn(require('services/group'), 'exitGroupService')
      .mockImplementation(() => {
        throw new Error('Erro')
      })

    const mockToastError = jest.fn()
    toast.error = mockToastError

    await waitFor(() => {
      renderComponent(
        <GroupHeader
          user={{ ...mockUser, email: 'teste@teste.com' }}
          group={mockGroup}
        />
      )
    })

    const buttonExit = screen.getByText('Sair do grupo')
    await userEvent.click(buttonExit)

    expect(
      screen.getByText('Tem certeza que quer sair do grupo')
    ).toBeInTheDocument()

    const buttonYes = screen.getByText('Sim')
    await userEvent.click(buttonYes)

    expect(mockToastError).toHaveBeenCalledWith(
      'Não foi possível sair do grupo'
    )
  })

  it('Should not render when group is undefined', async () => {
    mockUseRouter()

    const mockToastError = jest.fn()
    toast.error = mockToastError

    await waitFor(() => {
      renderComponent(
        <GroupHeader
          user={{ ...mockUser, email: 'teste@teste.com' }}
          group={undefined}
        />
      )
    })

    const buttonExit = screen.queryByText('Sair do grupo')

    expect(buttonExit).not.toBeInTheDocument()
  })
})
