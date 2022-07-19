import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { mockUseRouter, renderComponent } from 'utils/tests'
import { mockGroups, mockGroupsWithLimit, mockUser } from 'utils/tests/mocks'

import Home from '.'

describe('Component Home', () => {
  it('Should call router.push when click in new group', async () => {
    const { mockPush } = mockUseRouter()

    jest
      .spyOn(require('services/group/hooks/useGetGroups'), 'default')
      .mockReturnValue({ groups: mockGroups })

    renderComponent(<Home user={mockUser} />)

    const button = screen.getByText('NOVO GRUPO')

    await userEvent.click(button)

    expect(mockPush).toHaveBeenCalledWith('/novo-grupo')
  })

  it('Should show limit message', async () => {
    mockUseRouter()

    jest
      .spyOn(require('services/group/hooks/useGetGroups'), 'default')
      .mockReturnValue({ groups: mockGroups })

    renderComponent(<Home user={mockUser} />)

    const text = screen.getByText('(Você pode criar no máximo 5)')

    expect(text).toBeInTheDocument()
  })

  it('Should not show new group button when has more than 5 groups', async () => {
    mockUseRouter()

    jest
      .spyOn(require('services/group/hooks/useGetGroups'), 'default')
      .mockReturnValue({ groups: mockGroupsWithLimit })

    renderComponent(<Home user={mockUser} />)

    const button = screen.queryByText('NOVO GRUPO')

    expect(button).not.toBeInTheDocument()
  })

  it('Should show title when has groups', async () => {
    mockUseRouter()

    jest
      .spyOn(require('services/group/hooks/useGetGroups'), 'default')
      .mockReturnValue({ groups: mockGroups })

    renderComponent(<Home user={mockUser} />)

    const title = screen.getByRole('heading', { name: 'Grupos' })

    expect(title).toBeInTheDocument()
  })

  it('Should not show title when no has groups', async () => {
    mockUseRouter()

    jest
      .spyOn(require('services/group/hooks/useGetGroups'), 'default')
      .mockReturnValue({ groups: [] })

    renderComponent(<Home user={mockUser} />)

    const title = screen.queryByRole('heading', { name: 'Grupos' })

    expect(title).not.toBeInTheDocument()
  })

  it('Should show groups', async () => {
    mockUseRouter()

    jest
      .spyOn(require('services/group/hooks/useGetGroups'), 'default')
      .mockReturnValue({ groups: mockGroups })

    renderComponent(<Home user={mockUser} />)

    const group1 = screen.getByText(mockGroups[0].name)
    const group2 = screen.getByText(mockGroups[1].name)

    expect(group1).toBeInTheDocument()
    expect(group2).toBeInTheDocument()
  })

  it('Should call router.push when click in some group', async () => {
    const { mockPush } = mockUseRouter()

    jest
      .spyOn(require('services/group/hooks/useGetGroups'), 'default')
      .mockReturnValue({ groups: mockGroups })

    renderComponent(<Home user={mockUser} />)

    const group1 = screen.getByText(mockGroups[0].name)

    await userEvent.click(group1)

    expect(mockPush).toHaveBeenCalledWith(`/grupo?idGroup=${mockGroups[0].id}`)
  })

  it('Should show warning when no has groups', async () => {
    mockUseRouter()

    jest
      .spyOn(require('services/group/hooks/useGetGroups'), 'default')
      .mockReturnValue({ groups: [] })

    renderComponent(<Home user={mockUser} />)

    const warning = screen.getByText('Você não faz parte de nenhum')

    expect(warning).toBeInTheDocument()
  })
})
