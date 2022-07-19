import React from 'react'
import { render } from '@testing-library/react'

import App from 'components/App'

export const renderComponent = (component: React.ReactNode) => {
  let container = document.getElementById('__next')

  if (!container) {
    container = document.createElement('div')
    container.setAttribute('id', '__next')
    container.setAttribute('role', 'main')
    document.body.appendChild(container)
  }

  render(<App>{component}</App>, {
    container
  })
}

export const mockUseRouter = () => {
  const mockPush = jest.fn()
  const mockBack = jest.fn()

  jest.spyOn(require('next/router'), 'useRouter').mockReturnValue({
    query: {
      idGroup: 1
    },
    push: mockPush,
    back: mockBack
  })

  return { mockPush, mockBack }
}
