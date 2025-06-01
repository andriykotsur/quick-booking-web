export function parseJwt(token?: string) {
  if (!token) return null

  try {
    const payloadBase64 = token.split('.')[1]
    const payloadJson = atob(payloadBase64)

    return JSON.parse(payloadJson)
  } catch (error) {
    console.error('Failed to parse JWT:', error)
    return null
  }
}

export function checkIsTokenExpired(token?: string) {
  const payload = parseJwt(token)

  if (!payload) return true

  const now = Math.floor(Date.now() / 1000)

  return payload.exp < now
}
