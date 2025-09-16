import { Stringify } from './string'
import { Not } from './logistic'

/** 检查输入的数字是否为 `0` 或 `0n` */
export type IsZero<T> = T extends 0 | 0n ? true : false
/** 检查输入的数字是否为负数 */
export type IsNegative<T> = T extends number | bigint ? (Stringify<T> extends `-${infer R}` ? true : false) : false
/** 检查输入的数字是否为正数 */
export type IsPositive<T> = T extends number | bigint ? (IsZero<T> extends true ? false : Not<IsNegative<T>>) : false
