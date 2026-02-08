import { expectTypeOf } from 'vitest'
import { Stringify } from '../../src'

describe('Stringify type', () => {
  it('stringify literals', () => {
    expectTypeOf<Stringify<123>>().toEqualTypeOf<'123'>()
    expectTypeOf<Stringify<true>>().toEqualTypeOf<'true'>()
    expectTypeOf<Stringify<null>>().toEqualTypeOf<'null'>()
    expectTypeOf<Stringify<-1>>().toEqualTypeOf<'-1'>()
    expectTypeOf<Stringify<0n>>().toEqualTypeOf<'0'>()
  })
})
