import en from './en'
import vi from './vi'

expect.extend({
  toBeInObject(key, obj) {
    const pass = key in obj

    return {
      message: () =>
        pass ? `All good` : `Missing property "${key}" in object.`,
      pass,
    }
  },
})

test('all locales should have the same messages', () => {
  const pivot = Object.keys(en).length > Object.keys(vi).length ? en : vi
  const other = pivot === en ? vi : en

  for (const key in pivot) {
    expect(key).toBeInObject(other)
  }
})
