async function request(url, options) {
  const res = await fetch(url, options)

  if (!res.ok) {
    const ex = new Error(`HTTP error! Status: ${res.status}`)
    ex.status = res.status
    throw ex
  }

  return res.json()
}

// FUNCTION NAME CONVENTION
// `fetchSingleX` for requests returning only 1 item
// `fetchAllX...` for requests returning multiple items

export const fetchSingleWord = (word, dict = 'en-vi') =>
  request(`/api/words/${word}?dict=${dict}`)
