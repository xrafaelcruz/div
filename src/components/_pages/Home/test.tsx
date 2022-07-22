import { screen } from '@testing-library/react'

import { renderComponent } from 'utils/tests'
import { mockGroups, mockGroupsWithLimit, mockUser } from 'utils/tests/mocks'

import Home from '.'

describe('Component Home', () => {
  it('Should show limit message', async () => {
    jest
      .spyOn(require('services/group/hooks/useGetGroups'), 'default')
      .mockReturnValue({ groups: mockGroups })

    renderComponent(<Home user={mockUser} />)

    const text = screen.getByText('(Você pode criar no máximo 5)')

    expect(text).toBeInTheDocument()
  })

  it('Should not show new group button when has more than 5 groups', async () => {
    jest
      .spyOn(require('services/group/hooks/useGetGroups'), 'default')
      .mockReturnValue({ groups: mockGroupsWithLimit })

    renderComponent(<Home user={mockUser} />)

    const button = screen.queryByText('NOVO GRUPO')

    expect(button).not.toBeInTheDocument()
  })

  it('Should show title when has groups', async () => {
    jest
      .spyOn(require('services/group/hooks/useGetGroups'), 'default')
      .mockReturnValue({ groups: mockGroups })

    renderComponent(<Home user={mockUser} />)

    const title = screen.getByRole('heading', { name: 'Grupos' })

    expect(title).toBeInTheDocument()
  })

  it('Should not show title when no has groups', async () => {
    jest
      .spyOn(require('services/group/hooks/useGetGroups'), 'default')
      .mockReturnValue({ groups: [] })

    renderComponent(<Home user={mockUser} />)

    const title = screen.queryByRole('heading', { name: 'Grupos' })

    expect(title).not.toBeInTheDocument()
  })

  it('Should show groups', async () => {
    jest
      .spyOn(require('services/group/hooks/useGetGroups'), 'default')
      .mockReturnValue({ groups: mockGroups })

    renderComponent(<Home user={mockUser} />)

    const group1 = screen.getByText(mockGroups[0].name)
    const group2 = screen.getByText(mockGroups[1].name)

    expect(group1).toBeInTheDocument()
    expect(group2).toBeInTheDocument()
  })

  it('Should show warning when no has groups', async () => {
    jest
      .spyOn(require('services/group/hooks/useGetGroups'), 'default')
      .mockReturnValue({ groups: [] })

    renderComponent(<Home user={mockUser} />)

    const warning = screen.getByText('Você não faz parte de nenhum')

    expect(warning).toBeInTheDocument()
  })

  it('Should not render when groups is null', async () => {
    jest
      .spyOn(require('services/group/hooks/useGetGroups'), 'default')
      .mockReturnValue({ groups: null })

    renderComponent(<Home user={mockUser} />)

    const warning = screen.queryByText('Você não faz parte de nenhum')

    expect(warning).not.toBeInTheDocument()
  })
})
