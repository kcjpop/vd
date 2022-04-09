export function getProtocol() {
  return process.env.NODE_ENV === 'development' ? 'http://' : 'https://'
}
