import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderComponent } from 'utils/tests'

import Modal from '.'

const mockClickNo = jest.fn()
const mockClickYes = jest.fn()

describe('Component Modal', () => {
  it('Should show text', async () => {
    renderComponent(
      <Modal text="Teste" onClickNo={mockClickNo} onClickYes={mockClickYes} />
    )

    const text = screen.getByText('Teste')

    expect(text).toBeInTheDocument()
  })

  it('Should call onClickNo', async () => {
    renderComponent(
      <Modal text="Teste" onClickNo={mockClickNo} onClickYes={mockClickYes} />
    )

    const button = screen.getByText('Não')

    await userEvent.click(button)

    expect(mockClickNo).toBeCalled()
  })

  it('Should call onClickYes', async () => {
    renderComponent(
      <Modal text="Teste" onClickNo={mockClickNo} onClickYes={mockClickYes} />
    )

    const button = screen.getByText('Sim')

    await userEvent.click(button)

    expect(mockClickNo).toBeCalled()
  })
})
