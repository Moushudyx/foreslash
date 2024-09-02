import type { A, F } from 'ts-toolbelt'
// 定义一个占位符，兼容 Ramda
/** 兼容 Ramda */
export type Placeholder = A.x & { '@@functional/placeholder': true }
/** 函数柯里化占位符 */
export const _ = /*#__PURE__*/ Object.freeze({ '@@functional/placeholder': true }) as Placeholder
/**
 * 判断给定的参数是否为占位符，兼容 Ramda
 * @param arg 需要判定的参数
 * @returns 是否为占位符
 */
export function isPlaceholder(arg: any): arg is Placeholder {
  return typeof arg === 'object' && Boolean(arg) && arg['@@functional/placeholder'] === true
}
// 可能出现的情况 = 2 ** 参数数量
// 1 个参数 -> 2 种情况 _ *
// 2 个参数 -> 4 种情况 __ _* *_ **
// 3 个参数 -> 8 种情况 ___ __* _*_ _** *__ *_* **_ ***
// 更多情况：过于复杂无法优化
/**
 * 针对只有一个参数的函数进行柯里化
 * @param fn 待柯里化的函数
 */
export const _curry1: <Arg1, Res>(
  fn: (arg1: Arg1) => Res // 1 个参数 -> 2 种情况
) => F.Curry<(arg1: Arg1) => Res> = /*#__PURE__*/ function _curry1<Arg1, Res>(
  fn: (arg1: Arg1) => Res // 1 个参数 -> 2 种情况
) {
  return function curried1(arg1) {
    if (arguments.length < 1 || isPlaceholder(arg1)) {
      // _
      return curried1
    } else {
      // *
      // @ts-ignore
      return fn.apply(this, arguments)
    }
  } as F.Curry<typeof fn>
}
/**
 * 针对两个参数的函数进行柯里化
 * @param fn 待柯里化的函数
 */
export const _curry2: <Arg1, Arg2, Res>(
  fn: (arg1: Arg1, arg2: Arg2) => Res // 2 个参数 -> 4 种情况
) => F.Curry<(arg1: Arg1, arg2: Arg2) => Res> = /*#__PURE__*/ function _curry2<Arg1, Arg2, Res>(
  fn: (arg1: Arg1, arg2: Arg2) => Res // 2 个参数 -> 4 种情况
) {
  return function curried2(arg1, arg2): ReturnType<F.Curry<(arg1: Arg1, arg2: Arg2) => Res>> {
    const p1 = arguments.length < 1 || isPlaceholder(arg1)
    const p2 = arguments.length < 2 || isPlaceholder(arg2)
    if (p1 && p2) {
      // __
      return curried2
    } else if (!p1 && p2) {
      // *_
      return _curry1(function (_arg2: Arg2) {
        // @ts-ignore
        return fn.apply(this, [arg1 as Arg1, _arg2])
      })
    } else if (p1 && !p2) {
      // _*
      return _curry1(function (_arg1: Arg1) {
        // @ts-ignore
        return fn.apply(this, [_arg1, arg2 as Arg2])
      })
    } else {
      // **
      // @ts-ignore
      return fn.apply(this, arguments)
    }
  } as F.Curry<(arg1: Arg1, arg2: Arg2) => Res>
}
/**
 * 针对三个参数的函数进行柯里化
 * @param fn 待柯里化的函数
 */
export const _curry3: <Arg1, Arg2, Arg3, Res>(
  fn: (arg1: Arg1, arg2: Arg2, arg3: Arg3) => Res // 3 个参数 -> 8 种情况
) => F.Curry<(arg1: Arg1, arg2: Arg2, arg3: Arg3) => Res> = /*#__PURE__*/ function _curry3<Arg1, Arg2, Arg3, Res>(
  fn: (arg1: Arg1, arg2: Arg2, arg3: Arg3) => Res // 3 个参数 -> 8 种情况
) {
  return function curried3(arg1, arg2, arg3): ReturnType<F.Curry<(arg1: Arg1, arg2: Arg2, arg3: Arg3) => Res>> {
    const p1 = arguments.length < 1 || isPlaceholder(arg1)
    const p2 = arguments.length < 2 || isPlaceholder(arg2)
    const p3 = arguments.length < 3 || isPlaceholder(arg3)
    if (p1) {
      if (p2 && p3) {
        // ___
        return curried3
      } else if (p2 && !p3) {
        // __*
        return _curry2(function (_arg1: Arg1, _arg2: Arg2) {
          // @ts-ignore
          return fn.apply(this, [_arg1, _arg2, arg3 as Arg3])
        })
      } else if (!p2 && p3) {
        // _*_
        return _curry2(function (_arg1: Arg1, _arg3: Arg3) {
          // @ts-ignore
          return fn.apply(this, [_arg1, arg2 as Arg2, _arg3])
        })
      } else {
        // _**
        return _curry1(function (_arg1: Arg1) {
          // @ts-ignore
          return fn.apply(this, [_arg1, arg2 as Arg2, arg3 as Arg3])
        })
      }
    } else {
      if (p2 && p3) {
        // *__
        return _curry2(function (_arg2: Arg2, _arg3: Arg3) {
          // @ts-ignore
          return fn.apply(this, [arg1 as Arg1, _arg2, _arg3])
        })
      } else if (p2 && !p3) {
        // *_*
        return _curry1(function (_arg2: Arg2) {
          // @ts-ignore
          return fn.apply(this, [arg1 as Arg1, _arg2, arg3 as Arg3])
        })
      } else if (!p2 && p3) {
        // **_
        return _curry1(function (_arg3: Arg3) {
          // @ts-ignore
          return fn.apply(this, [arg1 as Arg1, arg2 as Arg2, _arg3])
        })
      } else {
        // ***
        // @ts-ignore
        return fn.apply(this, arguments)
      }
    }
  } as F.Curry<(arg1: Arg1, arg2: Arg2, arg3: Arg3) => Res>
}

const test = (a: number, b: number, c: number): string => {
  return `${a} ${b} ${c}`
}

const t1 = _curry3(test)
const t2 = t1(_, 12, _)
const t3 = t2(6)
t3(24)
