import type { F } from 'ts-toolbelt'
import { _curry1 } from './_curry1'
import { _curry2 } from './_curry2'
import { _curry3 } from './_curry3'
import { _curryAny } from './_curryAny'
export { _, isPlaceholder } from './_curry_placeholder'
/**
 * 柯里化一个函数，兼容 Ramda，但与 Ramda 不同，此库的 curry 方法不限定参数个数
 * @param fn 待柯里化的函数
 * @example
 * ```js
 * const fn = (a, b, c) => `${a} ${b} ${c}`
 * const curriedFn = curry(fn)
 * curriedFn(1)(2)(3) // 同 fn(1, 2, 3)
 * curriedFn(_, 2, 3)(1) // 同 fn(1, 2, 3)
 * curriedFn(1, _, _)(2, 3) // 同 fn(1, 2, 3)
 * curriedFn(_, 2)(_, 3)(1) // 同 fn(1, 2, 3)
 * ```
 */
// 1 个参数 -> 2 种情况 + 2 种可选参数情况
export function _curryMore<Arg1, Arg2, Arg3, Res>(
  fn: (arg1: Arg1, arg2?: Arg2, arg3?: Arg3) => Res
): F.Curry<(arg1: Arg1, arg2?: Arg2, arg3?: Arg3) => Res>
export function _curryMore<Arg1, Arg2, Res>(
  fn: (arg1: Arg1, arg2?: Arg2) => Res
): F.Curry<(arg1: Arg1, arg2?: Arg2) => Res>
export function _curryMore<Arg1, Res>(
  fn: (arg1: Arg1) => Res //
): F.Curry<(arg1: Arg1) => Res>
// 2 个参数 -> 4 种情况 + 1 种可选参数情况
export function _curryMore<Arg1, Arg2, Arg3, Res>(
  fn: (arg1: Arg1, arg2: Arg2, arg3?: Arg3) => Res
): F.Curry<(arg1: Arg1, arg2: Arg2, arg3?: Arg3) => Res>
export function _curryMore<Arg1, Arg2, Res>(
  fn: (arg1: Arg1, arg2: Arg2) => Res
): F.Curry<(arg1: Arg1, arg2: Arg2) => Res>
// 3 个参数 -> 8 种情况
export function _curryMore<Arg1, Arg2, Arg3, Res>(
  fn: (arg1: Arg1, arg2: Arg2, arg3: Arg3) => Res
): F.Curry<(arg1: Arg1, arg2: Arg2, arg3: Arg3) => Res>
// 3 个以上参数
export function _curryMore<Args extends Array<any>, Res>(fn: (...args: Args) => Res): F.Curry<(...args: Args) => Res>
export function _curryMore<Args extends Array<any>, Res>(fn: (...args: Args) => Res): F.Curry<(...args: Args) => Res> {
  if (typeof fn !== 'function') {
    throw new Error('Invalid fn parameter: fn is not a function.')
  }
  // 检查是否存在可选参数、剩余参数
  const fnStr = fn.toString()
  const rightBracket = fnStr.indexOf(')')
  if (rightBracket < 3 || /=|\.{3}/.test(fnStr.substring(0, rightBracket))) {
    return _curryAny(fn, [])
  }
  // 没有可选参数、剩余参数的情况，适用优化措施
  switch (fn.length) {
    case 0:
      // @ts-ignore
      return fn
    case 1:
      // @ts-ignore
      return _curry1(fn)
    case 2:
      // @ts-ignore
      return _curry2(fn)
    case 3:
      // @ts-ignore
      return _curry3(fn)
    default:
      return _curryAny(fn, [])
  }
}
