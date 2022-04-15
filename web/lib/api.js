import ky from 'ky'

const prefixUrl = process.env.NEXT_PUBLIC_API_URL
if (!prefixUrl) throw new Error('Missing tudien.io API URL.')

const endpoint = (path) => prefixUrl + '/' + path

// FUNCTION NAME CONVENTION
// `fetchSingleX` for requests returning only 1 item
// `fetchAllX...` for requests returning multiple items

export const fetchSingleWordEndpoint = ({ word, dict }) =>
  endpoint(`words/${word}?dict=${dict}`)

export const fetchBannerEndpoint = ({ word }) => endpoint(`banner/${word}`)

export const fetchSingleWord = (word, dict = 'en-vi') =>
  ky.get(fetchSingleWordEndpoint({ word, dict })).json()

export const fetchHomepageStats = () => ky.get(endpoint('summary')).json()

export const fetchWordSuggestions = (word) =>
  ky.get(endpoint(`suggestions/${word}`)).json()
