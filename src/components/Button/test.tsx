import { screen } from '@testing-library/react'
import { renderComponent } from 'utils/tests'
import Button from '.'

describe('Component Button', () => {
  it('Should render with text', () => {
    renderComponent(
      <Button variant="primary" size="big">
        Teste
      </Button>
    )

    const button = screen.getByText('Teste')

    expect(button).toBeInTheDocument()
  })
})
