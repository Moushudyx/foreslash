import type { F } from 'ts-toolbelt'
import { isPlaceholder } from './_curry_placeholder'
// 可能出现的情况 = 2 ** 参数数量
// 1 个参数 -> 2 种情况 _ *
// 2 个参数 -> 4 种情况 __ _* *_ **
// 3 个参数 -> 8 种情况 ___ __* _*_ _** *__ *_* **_ ***
// 更多情况：过于复杂无法优化
/**
 * 内部方法，针对只有一个参数的函数优化柯里化
 * @param fn 待柯里化的函数
 */
export const _curry1: <Arg1, Res>(
  fn: (arg1: Arg1) => Res // 1 个参数 -> 2 种情况
) => F.Curry<(arg1: Arg1) => Res> = /*#__PURE__*/ function _curry1<Arg1, Res>(
  fn: (arg1: Arg1) => Res // 1 个参数 -> 2 种情况
) {
  return function curried1(this: any, arg1) {
    if (arguments.length < 1 || isPlaceholder(arg1)) {
      // _
      return curried1
    } else {
      // *
      return fn.apply(this, arguments as unknown as [Arg1])
    }
  } as F.Curry<typeof fn>
}
