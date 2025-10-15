import { expectType } from 'tsd'
import { CastArray } from '../../src'

expectType<CastArray<string>>([] as string[])
expectType<CastArray<number>>([] as number[])
expectType<CastArray<number | string>>([] as (number | string)[])
expectType<CastArray<number[] | string>>([] as number[] | string[])
expectType<CastArray<string | number | never[]>>([] as never[] | (string | number)[])
