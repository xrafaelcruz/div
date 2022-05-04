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

export function GET(url: string) {
  return fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
}

export function REMOVE(url: string) {
  return fetch(url, {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' }
  })
}
