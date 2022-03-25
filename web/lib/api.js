async function request(url, options) {
  return fetch(url, options).then((res) => res.json())
}

// FUNCTION NAME CONVENTION
// `fetchSingleX` for requests returning only 1 item
// `fetchAllX...` for requests returning multiple items

export const fetchSingleWord = (word, dict = 'en-vi') =>
  request(`/api/words/${word}?dict=${dict}`)
