import { isTrue } from './helpers'

export function getVoiceSettings() {
  const key = 'selected-voice'

  const get = () => window?.localStorage.getItem(key)
  const set = (uri) => window?.localStorage.setItem(key, uri)

  return { get, set }
}

export function getExampleSpeechSettings() {
  const key = 'show-example-speech'

  const get = () => isTrue(window?.localStorage.getItem(key))
  const set = (value) => window?.localStorage.setItem(key, value)

  return { get, set }
}
