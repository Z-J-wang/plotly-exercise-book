export function updateHash(hash: string) {
  window.location.hash = hash
}

export function createUrlHash(hash: string) {
  const { origin, pathname } = window.location
  return origin + pathname + '#' + hash
}
