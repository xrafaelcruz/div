import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { mockUseRouter, renderComponent } from 'utils/tests'

import Error from '.'

describe('Component Error', () => {
  it('Should call router.push when click back to home button', async () => {
    const { mockPush } = mockUseRouter()

    renderComponent(<Error />)

    const button = screen.getByText('Ir para a tela inicial')

    await userEvent.click(button)

    expect(mockPush).toHaveBeenCalledWith('/')
  })

  it('Should render message', async () => {
    mockUseRouter()

    renderComponent(<Error />)

    const message = screen.getByText('Ocorreu um problema')

    expect(message).toBeInTheDocument()
  })
})
