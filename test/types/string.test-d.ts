import { expectType } from 'tsd'
import { Stringify } from '../../src'

expectType<Stringify<123>>('123')
expectType<Stringify<true>>('true')
expectType<Stringify<null>>('null')
expectType<Stringify<-1>>('-1')
expectType<Stringify<0n>>('0')
