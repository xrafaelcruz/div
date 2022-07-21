import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { mockUseRouter, renderComponent } from 'utils/tests'
import { mockUser, mockGroup, mockUsersGroup } from 'utils/tests/mocks'

import Users from '.'

describe('Component Users', () => {
  it('Should call router.push when click edit button', async () => {
    const { mockPush } = mockUseRouter()

    renderComponent(
      <Users
        user={mockUser}
        group={mockGroup as any}
        usersGroup={mockUsersGroup}
      />
    )

    const button = screen.getByText('Editar')

    await userEvent.click(button)

    expect(mockPush).toHaveBeenCalledWith(
      `/editar-grupo?idGroup=${mockGroup.id}`
    )
  })

  it('Should not show edit button when user is not the owner of the group', async () => {
    mockUseRouter()

    renderComponent(
      <Users
        user={{ ...mockUser, email: 'teste@teste.com' }}
        group={mockGroup as any}
        usersGroup={mockUsersGroup}
      />
    )

    const button = screen.queryByText('Editar')

    expect(button).not.toBeInTheDocument()
  })

  it('Should render group header', async () => {
    mockUseRouter()

    renderComponent(
      <Users
        user={mockUser}
        group={mockGroup as any}
        usersGroup={mockUsersGroup}
      />
    )

    const name = screen.getByText(mockGroup.name)

    expect(name).toBeInTheDocument()
  })

  it('Should render users', async () => {
    mockUseRouter()

    renderComponent(
      <Users
        user={mockUser}
        group={mockGroup as any}
        usersGroup={mockUsersGroup}
      />
    )

    const email1 = screen.getByText(mockUsersGroup[0].user.email)
    const email2 = screen.getByText(mockUsersGroup[1].user.email)

    expect(email1).toBeInTheDocument()
    expect(email2).toBeInTheDocument()
  })
})
