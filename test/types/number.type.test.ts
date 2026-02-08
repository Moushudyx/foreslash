import { expectTypeOf } from 'vitest'
import { IsNegative, IsPositive, IsZero } from '../../src'

describe('Number sign types', () => {
  it('IsZero', () => {
    expectTypeOf<IsZero<0>>().toEqualTypeOf<true>()
    expectTypeOf<IsZero<0n>>().toEqualTypeOf<true>()
    expectTypeOf<IsZero<1.3>>().toEqualTypeOf<false>()
    expectTypeOf<IsZero<987n>>().toEqualTypeOf<false>()
    expectTypeOf<IsZero<-13.1>>().toEqualTypeOf<false>()
    expectTypeOf<IsZero<-1025n>>().toEqualTypeOf<false>()
  })

  it('IsNegative', () => {
    expectTypeOf<IsNegative<0>>().toEqualTypeOf<false>()
    expectTypeOf<IsNegative<1>>().toEqualTypeOf<false>()
    expectTypeOf<IsNegative<-1.123>>().toEqualTypeOf<true>()
    expectTypeOf<IsNegative<0n>>().toEqualTypeOf<false>()
    expectTypeOf<IsNegative<114514n>>().toEqualTypeOf<false>()
    expectTypeOf<IsNegative<-12345678n>>().toEqualTypeOf<true>()
  })

  it('IsPositive', () => {
    expectTypeOf<IsPositive<0>>().toEqualTypeOf<false>()
    expectTypeOf<IsPositive<1>>().toEqualTypeOf<true>()
    expectTypeOf<IsPositive<-1.123>>().toEqualTypeOf<false>()
    expectTypeOf<IsPositive<0n>>().toEqualTypeOf<false>()
    expectTypeOf<IsPositive<112311312n>>().toEqualTypeOf<true>()
    expectTypeOf<IsPositive<-112321311231233n>>().toEqualTypeOf<false>()
  })
})
