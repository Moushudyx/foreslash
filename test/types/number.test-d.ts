import { expectType } from 'tsd'
import { IsNegative, IsPositive, IsZero } from '../../src'

expectType<IsZero<0>>(true)
expectType<IsZero<0n>>(true)
expectType<IsZero<1.3>>(false)
expectType<IsZero<987n>>(false)
expectType<IsZero<-13.1>>(false)
expectType<IsZero<-1025n>>(false)

expectType<IsNegative<0>>(false)
expectType<IsNegative<1>>(false)
expectType<IsNegative<-1.123>>(true)
expectType<IsNegative<0n>>(false)
expectType<IsNegative<114514n>>(false)
expectType<IsNegative<-12345678n>>(true)

expectType<IsPositive<0>>(false)
expectType<IsPositive<1>>(true)
expectType<IsPositive<-1.123>>(false)
expectType<IsPositive<0n>>(false)
expectType<IsPositive<112311312n>>(true)
expectType<IsPositive<-112321311231233n>>(false)
