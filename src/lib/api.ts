export function POST(url: string, body: any) {
  return fetch(url, {
    method: 'POST',
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
