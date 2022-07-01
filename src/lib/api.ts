import * as t from './types'

export const API_URL = process.env.NEXT_PUBLIC_API_URL

if (typeof window !== 'undefined') {
  const { fetch: originalFetch } = window

  window.fetch = async (...args) => {
    const [resource, config] = args
    const response = await originalFetch(resource, config)

    if (!response.ok && response.status >= 300) {
      return Promise.reject(response)
    }

    return response
  }
}

export function POST(url: string, body: any) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  })
}

export function PUT(url: string, body: any) {
  return fetch(url, {
    method: 'put',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  })
}

export function GET(url: string, options?: RequestInit) {
  return fetch(url, {
    method: 'GET',
    headers: { ...options?.headers, 'Content-Type': 'application/json' }
  })
}

export function REMOVE(url: string) {
  return fetch(url, {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' }
  })
}

export async function GETSSR<T>({ context, url, requiredParams }: t.TGetSSR) {
  if (!requiredParams) {
    context.res.writeHead(302, { Location: '/500' }).end()
    return
  }

  let finalResult: T | undefined

  try {
    const options = {
      headers: { Cookie: context.req.headers.cookie } as HeadersInit
    }

    const response = await GET(url, options)

    if (!response.ok) {
      throw new Error()
    }

    finalResult = await response.json()
  } catch (e) {
    context.res.writeHead(302, { Location: '/500' }).end()
  }

  return finalResult || null
}

export async function GETClient<T>({ url, requiredParams }: t.TGetClient) {
  if (!requiredParams) {
    window.location.href = '/500'
    return null
  }

  let finalResult: T | undefined

  try {
    const response = await GET(url)

    if (!response.ok) {
      throw new Error()
    }

    finalResult = await response.json()
  } catch (e) {
    window.location.href = '/500'
  }

  return finalResult || null
}
