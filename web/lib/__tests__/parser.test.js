import { parse } from '../parser'

import * as all from './__data__/all'
import * as affirm from './__data__/affirm'

test('parse', () => {
  expect(parse(all.input)).toEqual(all.output)
  expect(parse(affirm.input)).toEqual(affirm.output)
})
