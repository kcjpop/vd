import ky from 'ky'

const prefixUrl = process.env.NEXT_PUBLIC_API_URL
if (!prefixUrl) throw new Error('Missing tudien.io API URL.')

const api = ky.create({ prefixUrl })

// FUNCTION NAME CONVENTION
// `fetchSingleX` for requests returning only 1 item
// `fetchAllX...` for requests returning multiple items

export const fetchSingleWord = (word, dict = 'en-vi') =>
  api.get(`words/${word}?dict=${dict}`).json()
