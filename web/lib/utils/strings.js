export const upperFirst = (text) => {
  if (typeof text !== 'string') return

  return text.substring(0, 1).toLocaleUpperCase() + text.substring(1)
}
