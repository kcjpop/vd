export function encode(string) {
  if (Buffer) {
    return Buffer.from(string).toString('base64')
  } else if (window) {
    return window.atob(string)
  }

  return ''
}

export function decode(string) {
  if (Buffer) {
    return Buffer.from(string).toString('utf-8')
  } else if (window) {
    return window.btoa(string)
  }

  return ''
}
