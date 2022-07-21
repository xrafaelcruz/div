import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { toast } from 'react-toastify'

import { mockUseRouter, renderComponent } from 'utils/tests'

import RemoveExpense from '.'

describe('Component RemoveExpense', () => {
  it('Should render delete button', async () => {
    mockUseRouter()

    await waitFor(() => {
      renderComponent(<RemoveExpense idExpense="123" />)
    })

    expect(screen.getByText('Excluir')).toBeInTheDocument()
  })

  it('Should close modal when click No button', async () => {
    mockUseRouter()

    await waitFor(() => {
      renderComponent(<RemoveExpense idExpense="123" />)
    })

    await userEvent.click(screen.getByText('Excluir'))

    expect(
      screen.getByText('Tem certeza que quer excluir a despesa')
    ).toBeInTheDocument()

    await userEvent.click(screen.getByText('Não'))

    expect(
      screen.queryByText('Tem certeza que quer excluir a despesa')
    ).not.toBeInTheDocument()
  })

  it('Should call deleteExpenseService when click Yes button', async () => {
    mockUseRouter()

    const mockDeleteExpense = jest.fn()
    jest
      .spyOn(require('services/expense'), 'deleteExpenseService')
      .mockImplementation(mockDeleteExpense)

    await waitFor(() => {
      renderComponent(<RemoveExpense idExpense="123" />)
    })

    await userEvent.click(screen.getByText('Excluir'))

    expect(
      screen.getByText('Tem certeza que quer excluir a despesa')
    ).toBeInTheDocument()

    await userEvent.click(screen.getByText('Sim'))

    expect(mockDeleteExpense).toHaveBeenCalledWith('123')
  })

  it('Should call deleteExpenseService when click Yes button', async () => {
    mockUseRouter()

    jest
      .spyOn(require('services/expense'), 'deleteExpenseService')
      .mockImplementation(() => {
        throw new Error('Erro')
      })

    const mockToastError = jest.fn()
    toast.error = mockToastError

    await waitFor(() => {
      renderComponent(<RemoveExpense idExpense="123" />)
    })

    await userEvent.click(screen.getByText('Excluir'))

    expect(
      screen.getByText('Tem certeza que quer excluir a despesa')
    ).toBeInTheDocument()

    await userEvent.click(screen.getByText('Sim'))

    expect(mockToastError).toHaveBeenCalledWith('Não foi possível excluir')
  })
})
