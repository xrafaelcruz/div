import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderComponent } from 'utils/tests'

import Select from '.'

describe('Component Select', () => {
  it('Should change select value', async () => {
    renderComponent(
      <Select label="Teste">
        <option value="">Selecione</option>
        <option value="opt1">opt1</option>
      </Select>
    )

    expect(
      (screen.getByRole('option', { name: 'opt1' }) as HTMLOptionElement)
        .selected
    ).toBe(false)

    await userEvent.selectOptions(
      screen.getByRole('combobox'),
      screen.getByRole('option', { name: 'opt1' })
    )

    expect(
      (screen.getByRole('option', { name: 'opt1' }) as HTMLOptionElement)
        .selected
    ).toBe(true)
  })

  it('Should render label text', async () => {
    renderComponent(
      <Select label="Teste">
        <option value="">Selecione</option>
        <option value="opt1">opt1</option>
      </Select>
    )

    const label = screen.getByText('Teste')

    expect(label).toBeInTheDocument()
  })

  it('Should show error', async () => {
    renderComponent(
      <Select label="Teste" error="Errou">
        <option value="">Selecione</option>
        <option value="opt1">opt1</option>
      </Select>
    )

    const error = screen.getByText('Errou')

    expect(error).toBeInTheDocument()
  })

  it('Should show optional text', async () => {
    renderComponent(
      <Select label="Teste" optional>
        <option value="">Selecione</option>
        <option value="opt1">opt1</option>
      </Select>
    )

    const optional = screen.getByText('(Opcional)')

    expect(optional).toBeInTheDocument()
  })
})
