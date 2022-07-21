import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { mockUseRouter, renderComponent } from 'utils/tests'
import { mockUser, mockExpenseList } from 'utils/tests/mocks'

import GroupExpenses from '.'

describe('Component GroupExpenses', () => {
  it('Should render title when has expenses', () => {
    mockUseRouter()

    renderComponent(
      <GroupExpenses user={mockUser} expenses={mockExpenseList} />
    )

    expect(screen.getByText('Despesas')).toBeInTheDocument()
  })

  it('Should not render title when no has expenses', () => {
    mockUseRouter()

    renderComponent(<GroupExpenses user={mockUser} />)

    expect(screen.queryByText('Despesas')).not.toBeInTheDocument()
  })

  it('Should render warning when no has expenses', () => {
    mockUseRouter()

    renderComponent(<GroupExpenses user={mockUser} />)

    expect(
      screen.getByText('Nenhuma despesa registrada ainda')
    ).toBeInTheDocument()
  })

  it('Should render expenses', () => {
    mockUseRouter()

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

  it('Should call router.push when click in expense', async () => {
    const { mockPush } = mockUseRouter()

    renderComponent(
      <GroupExpenses user={mockUser} expenses={mockExpenseList} />
    )

    const expense = screen.getAllByTestId('expense')

    await userEvent.click(expense[0])

    expect(mockPush).toHaveBeenCalledWith(
      `/editar-despesa?idExpense=${mockExpenseList[0].id}&idGroup=${mockExpenseList[0].idGroup}`
    )
  })
})
