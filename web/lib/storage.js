export function getVoiceSettings() {
  const key = 'selected-voice'

  const get = () => window?.localStorage.getItem(key)
  const set = (uri) => window?.localStorage.setItem(key, uri)

  return { get, set }
}
