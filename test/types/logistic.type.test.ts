import { expectTypeOf } from 'vitest'
import { Not } from '../../src'

describe('Not type', () => {
  it('negates boolean literal types', () => {
    expectTypeOf<Not<true>>().toEqualTypeOf<false>()
    expectTypeOf<Not<false>>().toEqualTypeOf<true>()
  })
})
