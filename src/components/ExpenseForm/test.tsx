import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { toast } from 'react-toastify'

import { mockUseRouter, renderComponent } from 'utils/tests'
import {
  mockGroups,
  mockUser,
  mockGroupUsers,
  mockExpense
} from 'utils/tests/mocks'

import ExpenseForm from '.'

const mockCreateExpense = jest.fn()

const createExpense = async () => {
  expect(screen.getByText('Nova despesa')).toBeInTheDocument()

  // GRUPO
  await userEvent.selectOptions(
    screen.getByRole('combobox', { name: 'Grupo' }),
    screen.getByRole('option', { name: 'Grupo1' })
  )
  expect(
    (screen.getByRole('option', { name: 'Grupo1' }) as HTMLOptionElement)
      .selected
  ).toBe(true)

  // NOME
  const inputName = screen.getByLabelText('Nome')
  await userEvent.type(inputName, 'Nome Teste')
  expect(screen.getByDisplayValue('Nome Teste')).toBeInTheDocument()

  // VALOR
  const inputValue = screen.getByLabelText('Valor R$')
  await userEvent.type(inputValue, '1000')
  expect(screen.getByDisplayValue('R$ 10,00')).toBeInTheDocument()

  // TIPO
  await userEvent.selectOptions(
    screen.getByRole('combobox', { name: 'Tipo da despesa' }),
    screen.getByRole('option', { name: 'comida' })
  )
  expect(
    (screen.getByRole('option', { name: 'comida' }) as HTMLOptionElement)
      .selected
  ).toBe(true)

  // DESCRIÇÃO
  const textAreaDescripton = screen.getByLabelText('Descrição')
  await userEvent.type(textAreaDescripton, 'Descricao Teste')
  expect(screen.getByDisplayValue('Descricao Teste')).toBeInTheDocument()

  // QUEM PAGOU
  await userEvent.selectOptions(
    screen.getByRole('combobox', { name: 'Quem pagou' }),
    screen.getByRole('option', { name: 'Rafael Cruz' })
  )
  expect(
    (
      screen.getByRole('option', {
        name: 'Rafael Cruz'
      }) as HTMLOptionElement
    ).selected
  ).toBe(true)

  // QUEM IRÁ DIVIDIR
  const checkbox = screen.getAllByLabelText('Marcar usuario que vai dividir')
  expect((checkbox[0] as HTMLInputElement).checked).toBe(true)
  await userEvent.click(checkbox[0])
  expect((checkbox[0] as HTMLInputElement).checked).toBe(false)

  // CREATE
  const buttonCreate = screen.getByText('CRIAR')
  await userEvent.click(buttonCreate)
  expect(mockCreateExpense).toHaveBeenCalledWith({
    description: 'Descricao Teste',
    idGroup: '6ca2e91d-ba2a-48c5-af7f-34ae441d1a84',
    name: 'Nome Teste',
    payerUserEmail: 'rafaelcruzx@gmail.com',
    type: 'comida',
    users: [
      {
        email: 'rafaelcruzx@gmail.com',
        value: 10
      }
    ],
    value: 10
  })
}

describe('Component ExpenseForm', () => {
  it('Should submit on creation', async () => {
    mockUseRouter()

    jest
      .spyOn(require('services/group'), 'getUsersGroupService')
      .mockReturnValue(mockGroupUsers)

    jest
      .spyOn(require('services/expense'), 'createExpense')
      .mockImplementation(mockCreateExpense)

    await waitFor(() => {
      renderComponent(<ExpenseForm user={mockUser} groups={mockGroups} />)
    })

    await createExpense()
  })

  it('Should call toats when create fail', async () => {
    mockUseRouter()

    jest
      .spyOn(require('services/group'), 'getUsersGroupService')
      .mockReturnValue(mockGroupUsers)

    jest
      .spyOn(require('services/expense'), 'createExpense')
      .mockImplementation(() => {
        throw new Error('Erro')
      })

    const mockToastError = jest.fn()
    toast.error = mockToastError

    await waitFor(() => {
      renderComponent(<ExpenseForm user={mockUser} groups={mockGroups} />)
    })

    await createExpense()

    expect(mockToastError).toHaveBeenCalledWith('Não foi possível criar')
  })

  it('Should submit on updating', async () => {
    mockUseRouter()

    jest
      .spyOn(require('services/group'), 'getUsersGroupService')
      .mockReturnValue(mockGroupUsers)

    const mockUpdateExpense = jest.fn()
    jest
      .spyOn(require('services/expense'), 'updateExpense')
      .mockImplementation(mockUpdateExpense)

    await waitFor(() => {
      renderComponent(
        <ExpenseForm
          user={mockUser}
          groups={mockGroups}
          expense={mockExpense}
        />
      )
    })

    const buttonUpdate = screen.getByText('SALVAR')
    await userEvent.click(buttonUpdate)
    expect(mockUpdateExpense).toHaveBeenCalledWith({
      description: '',
      id: '26d9412c-b137-4afe-b34e-2d5f5713af43',
      idGroup: 1,
      name: 'a',
      payerUserEmail: 'xrafaelcruz@gmail.com',
      type: 'não informado',
      users: expect.any(Array),
      value: 10
    })
  })

  it('Should call toats when update fail', async () => {
    mockUseRouter()

    jest
      .spyOn(require('services/group'), 'getUsersGroupService')
      .mockReturnValue(mockGroupUsers)

    jest
      .spyOn(require('services/expense'), 'updateExpense')
      .mockImplementation(() => {
        throw new Error('Erro')
      })

    const mockToastError = jest.fn()
    toast.error = mockToastError

    await waitFor(() => {
      renderComponent(
        <ExpenseForm
          user={mockUser}
          groups={mockGroups}
          expense={mockExpense}
        />
      )
    })

    const buttonUpdate = screen.getByText('SALVAR')
    await userEvent.click(buttonUpdate)
    expect(mockToastError).toHaveBeenCalledWith('Não foi possível editar')
  })

  it('Should call router.back when click cancel button', async () => {
    const { mockBack } = mockUseRouter()

    jest
      .spyOn(require('services/group'), 'getUsersGroupService')
      .mockReturnValue(mockGroupUsers)

    const mockUpdateExpense = jest.fn()
    jest
      .spyOn(require('services/expense'), 'updateExpense')
      .mockImplementation(mockUpdateExpense)

    await waitFor(() => {
      renderComponent(
        <ExpenseForm
          user={mockUser}
          groups={mockGroups}
          expense={mockExpense}
        />
      )
    })

    const button = screen.getByText('CANCELAR')

    await userEvent.click(button)

    expect(mockBack).toHaveBeenCalled()
  })
})
