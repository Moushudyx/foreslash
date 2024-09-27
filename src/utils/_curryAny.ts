import type { F } from 'ts-toolbelt'
import { isPlaceholder } from './_curry_placeholder'
// 可能出现的情况 = 2 ** 参数数量
// 1 个参数 -> 2 种情况 _ *
// 2 个参数 -> 4 种情况 __ _* *_ **
// 3 个参数 -> 8 种情况 ___ __* _*_ _** *__ *_* **_ ***
// 更多情况：过于复杂无法优化
/**
 * 内部方法，柯里化任意数量参数的函数
 * @param fn 待柯里化的函数
 * @param args 已接收的参数列表
 */
export const _curryAny: <Args extends Array<any>, Res>(
  fn: (...args: Args) => Res,
  args: any[]
) => F.Curry<(...args: Args) => Res> = /*#__PURE__*/ function _curryAny<Args extends Array<any>, Res>(
  fn: (...args: Args) => Res,
  args: any[]
) {
  return function curriedAny(this: any, ...currentArguments) {
    const currArgs = _mergeArguments(args, currentArguments)
    if (_countArguments(currArgs) >= fn.length) {
      return fn.apply(this, currArgs as Args)
    } else return _curryAny.apply(this, [fn, currArgs])
  } as F.Curry<(...args: Args) => Res>
}
/**
 * 内部方法，合并`_curryMore`接收到的参数列表，返回一个新的参数列表
 * @param args 当前参数列表
 * @param currentArguments 接收到的参数列表
 * @description
 * 1. 若当前参数列表为 `[]` 则返回接收到的参数列表
 * 2. 设当前参数为 `[_, b, c, _, e]` 接收到的参数列表为 `[_, d, _, g]`
 * ```js
 * // args             `[_, b, c, _, e]`
 * // currentArguments `[_,       d,    _, g]`
 * // return           `[_, b, c, d, e, _, g]`
 * ```
 */
export function _mergeArguments(args: any[], currentArguments: ArrayLike<any>) {
  let p1 = 0 // , overflow = false
  const res = args.concat([]) // 浅复制
  for (let i = 0; i < currentArguments.length; i++) {
    while (!isPlaceholder(res[p1]) && p1 < res.length) p1++
    res[p1] = currentArguments[i]
    p1++
  }
  return res
}
/**
 * 内部方法，统计当前参数列表已经填充到哪一位了
 * @param args 当前参数列表
 * @description
 * 统计至非占位符的参数数量
 * - `[]` 返回 0
 * - `[_]` 返回 0
 * - `[a, b, _, d]` 返回 2
 * - `[a, b, c, d]` 返回 4
 */
export function _countArguments(args: any[]) {
  for (let i = 0; i < args.length; i++) {
    if (isPlaceholder(args[i])) return i
  }
  return args.length
}
