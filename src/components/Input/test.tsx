import { screen } from '@testing-library/react'

import { renderComponent } from 'utils/tests'

import Input from '.'

describe('Component Input', () => {
  it('Should render label text', async () => {
    renderComponent(<Input label="Teste" />)

    const label = screen.getByText('Teste')

    expect(label).toBeInTheDocument()
  })

  it('Should show error', async () => {
    renderComponent(<Input label="Teste" error="Errou" />)

    const error = screen.getByText('Errou')

    expect(error).toBeInTheDocument()
  })

  it('Should show optional text', async () => {
    renderComponent(<Input label="Teste" optional />)

    const optional = screen.getByText('(Opcional)')

    expect(optional).toBeInTheDocument()
  })

  it('Should show checkbox', async () => {
    renderComponent(<Input label="Teste" type="checkbox" />)

    const checkbox = screen.getByLabelText('Checkbox')

    expect(checkbox).toBeInTheDocument()
  })
})
