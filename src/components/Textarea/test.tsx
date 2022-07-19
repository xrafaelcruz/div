import { screen } from '@testing-library/react'

import { renderComponent } from 'utils/tests'

import Textarea from '.'

describe('Component Textarea', () => {
  it('Should render label text', async () => {
    renderComponent(<Textarea label="Teste" />)

    const label = screen.getByText('Teste')

    expect(label).toBeInTheDocument()
  })

  it('Should show error', async () => {
    renderComponent(<Textarea label="Teste" error="Errou" />)

    const error = screen.getByText('Errou')

    expect(error).toBeInTheDocument()
  })

  it('Should show optional text', async () => {
    renderComponent(<Textarea label="Teste" optional />)

    const optional = screen.getByText('(Opcional)')

    expect(optional).toBeInTheDocument()
  })
})
