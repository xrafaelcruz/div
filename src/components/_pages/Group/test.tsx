import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { mockUseRouter, renderComponent } from 'utils/tests'
import { mockUser, mockGroup } from 'utils/tests/mocks'

import Group from '.'

jest.mock('components/GroupExpenses', () => ({
  __esModule: true,
  default: function Component() {
    return <p>Group Expenses</p>
  }
}))

describe('Component Group', () => {
  it('Should call router.push when click users button', async () => {
    const { mockPush } = mockUseRouter()

    renderComponent(
      <Group user={mockUser} group={mockGroup as any} expenses={{} as any} />
    )

    const button = screen.getByText('Usuários')

    await userEvent.click(button)

    expect(mockPush).toHaveBeenCalledWith(`/usuarios?idGroup=${mockGroup.id}`)
  })

  it('Should call router.push when click results button', async () => {
    const { mockPush } = mockUseRouter()

    renderComponent(
      <Group user={mockUser} group={mockGroup as any} expenses={{} as any} />
    )

    const button = screen.getByText('Resultados')

    await userEvent.click(button)

    expect(mockPush).toHaveBeenCalledWith(`/pagamentos?idGroup=${mockGroup.id}`)
  })

  it('Should call router.push when click results button', async () => {
    const { mockPush } = mockUseRouter()

    renderComponent(
      <Group user={mockUser} group={mockGroup as any} expenses={{} as any} />
    )

    const button = screen.getByText('Editar')

    await userEvent.click(button)

    expect(mockPush).toHaveBeenCalledWith(
      `/editar-grupo?idGroup=${mockGroup.id}`
    )
  })

  it('Should not show edit button when user is not owner of group', async () => {
    mockUseRouter()

    renderComponent(
      <Group
        user={{ ...mockUser, email: 'teste@teste.com' }}
        group={mockGroup as any}
        expenses={{} as any}
      />
    )

    const button = screen.queryByText('Editar')

    expect(button).not.toBeInTheDocument()
  })

  it('Should call router.push when click new expense button', async () => {
    const { mockPush } = mockUseRouter()

    renderComponent(
      <Group user={mockUser} group={mockGroup as any} expenses={{} as any} />
    )

    const button = screen.getByText('NOVA DESPESA')

    await userEvent.click(button)

    expect(mockPush).toHaveBeenCalledWith(
      `/nova-despesa?idGroup=${mockGroup.id}`
    )
  })

  it('Should render GroupExpenses', async () => {
    mockUseRouter()

    renderComponent(
      <Group user={mockUser} group={mockGroup as any} expenses={{} as any} />
    )

    const groupExpenses = screen.getByText('Group Expenses')

    expect(groupExpenses).toBeInTheDocument()
  })
})
