import { screen } from '@testing-library/react'

import { renderComponent } from 'utils/tests'

import Error from '.'

describe('Component Error', () => {
  it('Should render message', () => {
    renderComponent(<Error />)

    const message = screen.getByText('Ocorreu um problema')

    expect(message).toBeInTheDocument()
  })
})
