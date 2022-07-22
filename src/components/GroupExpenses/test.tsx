import { screen } from '@testing-library/react'

import { renderComponent } from 'utils/tests'
import { mockUser, mockExpenseList } from 'utils/tests/mocks'

import GroupExpenses from '.'

describe('Component GroupExpenses', () => {
  it('Should render title when has expenses', () => {
    renderComponent(
      <GroupExpenses user={mockUser} expenses={mockExpenseList} />
    )

    expect(screen.getByText('Despesas')).toBeInTheDocument()
  })

  it('Should not render title when no has expenses', () => {
    renderComponent(<GroupExpenses user={mockUser} />)

    expect(screen.queryByText('Despesas')).not.toBeInTheDocument()
  })

  it('Should render warning when no has expenses', () => {
    renderComponent(<GroupExpenses user={mockUser} />)

    expect(
      screen.getByText('Nenhuma despesa registrada ainda')
    ).toBeInTheDocument()
  })

  it('Should render expenses', () => {
    renderComponent(
      <GroupExpenses user={mockUser} expenses={mockExpenseList} />
    )

    expect(screen.getByText(mockExpenseList[0].name)).toBeInTheDocument()
    expect(
      screen.getByText(`${mockExpenseList[0].user.name} pagou`)
    ).toBeInTheDocument()
    expect(screen.getByText(`Você pagou`)).toBeInTheDocument()
    expect(screen.getByText('R$ 10,00')).toBeInTheDocument()
  })
})
