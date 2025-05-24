export function parseJwt(token: string) {
  return JSON.parse(atob(token.split('.')[1]))
}

export function checkIsTokenExpired(token: string) {
  const payload = parseJwt(token)

  if (!payload) {
    return true
  }

  const now = Math.floor(Date.now() / 1000)

  return payload.exp < now
}
