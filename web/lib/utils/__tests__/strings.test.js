import { upperFirst } from '../strings'

test('upperFirst', () => {
  expect(upperFirst('hello world')).toBe('Hello world')
  expect(upperFirst('')).toBe('')
  expect(upperFirst('a')).toBe('A')
  expect(upperFirst('ăn cơm khum')).toBe('Ăn cơm khum')
  expect(upperFirst()).toBeUndefined()
  expect(upperFirst(1)).toBeUndefined()
  expect(upperFirst(null)).toBeUndefined()
})
