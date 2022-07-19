import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { mockUseRouter, renderComponent } from 'utils/tests'

import Header from '.'

describe('Component Header', () => {
  it('Should call router.back when click in back', async () => {
    const { mockBack } = mockUseRouter()

    renderComponent(<Header />)

    const button = screen.getByLabelText('Voltar')

    await userEvent.click(button)

    expect(mockBack).toHaveBeenCalled()
  })

  it('Should show the name DIV', async () => {
    mockUseRouter()

    renderComponent(<Header />)

    const title = screen.getByText('DIV')

    expect(title).toBeInTheDocument()
  })

  it('Should call router.push when click in notifications', async () => {
    const { mockPush } = mockUseRouter()

    renderComponent(<Header />)

    const button = screen.getByLabelText('Notificações')

    await userEvent.click(button)

    expect(mockPush).toHaveBeenCalled()
  })
})
