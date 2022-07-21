import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { mockUseRouter, renderComponent } from 'utils/tests'

import Login from '.'

describe('Component Login', () => {
  it('Should call signIn when click in login', async () => {
    mockUseRouter()

    const mockSignIn = jest.fn()

    jest
      .spyOn(require('next-auth/react'), 'signIn')
      .mockImplementation(mockSignIn)

    renderComponent(<Login />)

    const button = screen.getByText('FAZER LOGIN COM O GOOGLE')

    await userEvent.click(button)

    expect(mockSignIn).toHaveBeenCalledWith('google')
  })
})
