import LRUCache from 'lru-cache'

const CACHE_MAX_SIZE = 50 // Mb
const CACHE_MAX_AGE = 24 * 60 * 60 * 1000 // Seconds

const options = {
  max: CACHE_MAX_SIZE,
  maxAge: CACHE_MAX_AGE,
}

const lruCache = new LRUCache(options)

export const cache = (handler) => (request, response) => {
  return handler(request, response, lruCache)
}
