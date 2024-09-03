import type { F } from 'ts-toolbelt'
import { isPlaceholder } from './_curry_placeholder'
import { _curry1 } from './_curry1'
// 可能出现的情况 = 2 ** 参数数量
// 1 个参数 -> 2 种情况 _ *
// 2 个参数 -> 4 种情况 __ _* *_ **
// 3 个参数 -> 8 种情况 ___ __* _*_ _** *__ *_* **_ ***
// 更多情况：过于复杂无法优化
/**
 * 内部方法，针对两个参数的函数优化柯里化
 * @param fn 待柯里化的函数
 */
export const _curry2: <Arg1, Arg2, Res>(
  fn: (arg1: Arg1, arg2: Arg2) => Res // 2 个参数 -> 4 种情况
) => F.Curry<(arg1: Arg1, arg2: Arg2) => Res> = /*#__PURE__*/ function _curry2<Arg1, Arg2, Res>(
  fn: (arg1: Arg1, arg2: Arg2) => Res // 2 个参数 -> 4 种情况
) {
  return function curried2(this: any, arg1, arg2): ReturnType<F.Curry<(arg1: Arg1, arg2: Arg2) => Res>> {
    const p1 = arguments.length < 1 || isPlaceholder(arg1)
    const p2 = arguments.length < 2 || isPlaceholder(arg2)
    if (p1 && p2) {
      // __
      return curried2
    } else if (!p1 && p2) {
      // *_
      return _curry1(function (this: any, _arg2: Arg2) {
        return fn.apply(this, [arg1 as Arg1, _arg2])
      })
    } else if (p1 && !p2) {
      // _*
      return _curry1(function (this: any, _arg1: Arg1) {
        return fn.apply(this, [_arg1, arg2 as Arg2])
      })
    } else {
      // **
      return fn.apply(this, arguments as unknown as [Arg1, Arg2])
    }
  } as F.Curry<(arg1: Arg1, arg2: Arg2) => Res>
}
