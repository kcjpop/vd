import { MAX_RECENTLY_VIEWED } from './config'

function getAndParse(key) {
  const val = window?.localStorage.getItem(key)
  if (!val) return

  try {
    return JSON.parse(val)
  } catch (e) {}
}

function serializeAndSet(key, val) {
  window?.localStorage.setItem(key, JSON.stringify(val))
}

export function getVoiceSettings() {
  const key = 'selected-voice'

  const get = () => window?.localStorage.getItem(key)
  const set = (uri) => window?.localStorage.setItem(key, uri)

  return { get, set }
}

export function getExampleSpeechSettings() {
  const key = 'show-example-speech'

  const get = () => window?.localStorage.getItem(key) === 'true'
  const set = (value) => window?.localStorage.setItem(key, value)

  return { get, set }
}

export function recentlyViewedWords() {
  const key = 'recently-viewed'

  const get = () => getAndParse(key)
  const set = (word) => {
    const old = get() ?? []

    // Remove word if it's already in the list, then add it again to the
    // beginning.
    const vals = old.filter((w) => w !== word)
    vals.unshift(word)

    serializeAndSet(key, vals.slice(0, MAX_RECENTLY_VIEWED))
  }

  return { get, set }
}
