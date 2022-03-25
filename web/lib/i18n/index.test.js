import en from './en'
import vi from './vi'

describe('i18n', () => {
  test('en and vi should have the same set of keys', () => {
    const pivot = Object.keys(en).length > Object.keys(vi).length ? en : vi
    const other = pivot === en ? vi : en

    for (const key in pivot) {
      expect(key in other).toBe(true)
    }
  })
})
