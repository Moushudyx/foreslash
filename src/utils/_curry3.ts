import type { F } from 'ts-toolbelt'
import { isPlaceholder } from './_curry_placeholder'
import { _curry1 } from './_curry1'
import { _curry2 } from './_curry2'
// 可能出现的情况 = 2 ** 参数数量
// 1 个参数 -> 2 种情况 _ *
// 2 个参数 -> 4 种情况 __ _* *_ **
// 3 个参数 -> 8 种情况 ___ __* _*_ _** *__ *_* **_ ***
// 更多情况：过于复杂无法优化
/**
 * 内部方法，针对三个参数的函数优化柯里化
 * @param fn 待柯里化的函数
 */
export const _curry3: <Arg1, Arg2, Arg3, Res>(
  fn: (arg1: Arg1, arg2: Arg2, arg3: Arg3) => Res // 3 个参数 -> 8 种情况
) => F.Curry<(arg1: Arg1, arg2: Arg2, arg3: Arg3) => Res> = function _curry3<Arg1, Arg2, Arg3, Res>(
  fn: (arg1: Arg1, arg2: Arg2, arg3: Arg3) => Res // 3 个参数 -> 8 种情况
) {
  return function curried3(
    this: any,
    arg1,
    arg2,
    arg3
  ): ReturnType<F.Curry<(arg1: Arg1, arg2: Arg2, arg3: Arg3) => Res>> {
    const p1 = arguments.length < 1 || isPlaceholder(arg1)
    const p2 = arguments.length < 2 || isPlaceholder(arg2)
    const p3 = arguments.length < 3 || isPlaceholder(arg3)
    if (p1) {
      if (p2 && p3) {
        // ___
        return curried3
      } else if (p2 && !p3) {
        // __*
        return _curry2(function (this: any, _arg1: Arg1, _arg2: Arg2) {
          return fn.apply(this, [_arg1, _arg2, arg3 as Arg3])
        })
      } else if (!p2 && p3) {
        // _*_
        return _curry2(function (this: any, _arg1: Arg1, _arg3: Arg3) {
          return fn.apply(this, [_arg1, arg2 as Arg2, _arg3])
        })
      } else {
        // _**
        return _curry1(function (this: any, _arg1: Arg1) {
          return fn.apply(this, [_arg1, arg2 as Arg2, arg3 as Arg3])
        })
      }
    } else {
      if (p2 && p3) {
        // *__
        return _curry2(function (this: any, _arg2: Arg2, _arg3: Arg3) {
          return fn.apply(this, [arg1 as Arg1, _arg2, _arg3])
        })
      } else if (p2 && !p3) {
        // *_*
        return _curry1(function (this: any, _arg2: Arg2) {
          return fn.apply(this, [arg1 as Arg1, _arg2, arg3 as Arg3])
        })
      } else if (!p2 && p3) {
        // **_
        return _curry1(function (this: any, _arg3: Arg3) {
          return fn.apply(this, [arg1 as Arg1, arg2 as Arg2, _arg3])
        })
      } else {
        // ***
        return fn.apply(this, arguments as unknown as [Arg1, Arg2, Arg3])
      }
    }
  } as F.Curry<(arg1: Arg1, arg2: Arg2, arg3: Arg3) => Res>
}
