export default async function request(url, body) {
  const requestOptions = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(body)
  }

  const response = await fetch(url, requestOptions)

  const data = await response.text()

  const parsedResponse = {
    status: response.status,
    data:
      data.length > 0 && response.headers.get('content-type')?.includes('application/json') ? JSON.parse(data) : data,
  }

  return parsedResponse
}