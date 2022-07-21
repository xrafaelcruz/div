import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { toast } from 'react-toastify'

import { mockUseRouter, renderComponent } from 'utils/tests'
import { mockUser, mockInvites } from 'utils/tests/mocks'

import Notifications from '.'

const mockSetInvites = jest.fn()

describe('Component Notifications', () => {
  it('Should render invites', async () => {
    mockUseRouter()

    jest
      .spyOn(require('services/group/hooks/useGetGroupInvites'), 'default')
      .mockImplementation(() => ({
        invites: mockInvites,
        setInvites: mockSetInvites
      }))

    await waitFor(() => {
      renderComponent(<Notifications user={mockUser} />)
    })

    const group = screen.getByText(mockInvites[0].group.name)
    const owner = screen.getByText(
      `Enviado por ${mockInvites[0].group.ownerUserEmail}`
    )

    expect(group).toBeInTheDocument()
    expect(owner).toBeInTheDocument()
  })

  it('Should show warning when no has invites', async () => {
    mockUseRouter()

    jest
      .spyOn(require('services/group/hooks/useGetGroupInvites'), 'default')
      .mockImplementation(() => ({
        invites: [],
        setInvites: mockSetInvites
      }))

    await waitFor(() => {
      renderComponent(<Notifications user={mockUser} />)
    })

    const warning = screen.getByText('Você não possui convites')

    expect(warning).toBeInTheDocument()
  })

  it('Should not render component when invites is null', async () => {
    mockUseRouter()

    jest
      .spyOn(require('services/group/hooks/useGetGroupInvites'), 'default')
      .mockImplementation(() => ({
        invites: null,
        setInvites: mockSetInvites
      }))

    await waitFor(() => {
      renderComponent(<Notifications user={mockUser} />)
    })

    const title = screen.queryByText('Convites')

    expect(title).not.toBeInTheDocument()
  })

  it('Should call updateUserGroupInvitesService and setInvites when click decline', async () => {
    mockUseRouter()

    jest
      .spyOn(require('services/group/hooks/useGetGroupInvites'), 'default')
      .mockImplementation(() => ({
        invites: mockInvites,
        setInvites: mockSetInvites
      }))

    const mockService = jest.fn()
    jest
      .spyOn(require('services/group'), 'updateUserGroupInvitesService')
      .mockImplementation(mockService)

    await waitFor(() => {
      renderComponent(<Notifications user={mockUser} />)
    })

    const button = screen.getByText('Recusar')

    await userEvent.click(button)

    expect(mockService).toHaveBeenCalledWith(mockInvites[0].id, 'canceled')
    expect(mockSetInvites).toHaveBeenCalledWith(expect.any(Function))
  })

  it('Should call updateUserGroupInvitesService and setInvites when click accept', async () => {
    mockUseRouter()

    jest
      .spyOn(require('services/group/hooks/useGetGroupInvites'), 'default')
      .mockImplementation(() => ({
        invites: mockInvites,
        setInvites: mockSetInvites
      }))

    const mockService = jest.fn()
    jest
      .spyOn(require('services/group'), 'updateUserGroupInvitesService')
      .mockImplementation(mockService)

    await waitFor(() => {
      renderComponent(<Notifications user={mockUser} />)
    })

    const button = screen.getByText('Aceitar')

    await userEvent.click(button)

    expect(mockService).toHaveBeenCalledWith(mockInvites[0].id, 'accept')
    expect(mockSetInvites).toHaveBeenCalledWith(expect.any(Function))
  })

  it('Should call toast when has error', async () => {
    mockUseRouter()

    jest
      .spyOn(require('services/group/hooks/useGetGroupInvites'), 'default')
      .mockImplementation(() => ({
        invites: mockInvites,
        setInvites: mockSetInvites
      }))

    jest
      .spyOn(require('services/group'), 'updateUserGroupInvitesService')
      .mockImplementation(() => {
        throw new Error('Erro')
      })

    const mockToastError = jest.fn()
    toast.error = mockToastError

    await waitFor(() => {
      renderComponent(<Notifications user={mockUser} />)
    })

    const button = screen.getByText('Aceitar')

    await userEvent.click(button)

    expect(mockToastError).toHaveBeenCalledWith(
      'Não foi possível executar essa operação'
    )
  })
})
