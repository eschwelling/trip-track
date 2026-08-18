// Shared JSON fetch: every component was repeating the same ok/throw/parse
// dance inline.
export default function fetchJson(url, options = {}) {
  return fetch(url, { credentials: 'same-origin', ...options }).then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} (${response.statusText})`)
    }
    return response.json()
  })
}
