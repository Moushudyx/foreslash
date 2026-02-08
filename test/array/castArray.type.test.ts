import { expectTypeOf } from 'vitest'
import { CastArray } from '../../src'

describe('CastArray type', () => {
  it('wraps into arrays', () => {
    expectTypeOf<CastArray<string>>().toEqualTypeOf<string[]>()
    expectTypeOf<CastArray<number>>().toEqualTypeOf<number[]>()
    expectTypeOf<CastArray<number | string>>().toEqualTypeOf<(number | string)[]>()
    expectTypeOf<CastArray<number[] | string>>().toEqualTypeOf<number[] | string[]>()
    expectTypeOf<CastArray<string | number | never[]>>().toEqualTypeOf<never[] | (string | number)[]>()
  })
})
