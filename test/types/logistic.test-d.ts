import { expectType } from 'tsd'
import { Not } from '../../src'

expectType<Not<true>>(false)
expectType<Not<false>>(true)
