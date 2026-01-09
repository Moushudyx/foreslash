/**
 * 将一个函数标记为已废弃(不推荐使用), 类似 NodeJS 的 `utils.deprecate`
 * @param fn 需要标记为已废弃的函数
 * @param msg 调用函数时, 在控制台发出的警报信息
 * @param code 选填, 废弃编码
 * @returns 一个与传入的函数输入输出一致的新函数, 区别是第一次调用时会在控制台触发一次警告
 * @example
 * ```js
 * const fn = () => {
 *   console.log('test')
 *   return 123
 * }
 * const deprecateFn = deprecate(fn, 'Do not use this!', 'Foreslash')
 * const res = deprecateFn() // res 值为 123
 * deprecateFn()
 * deprecateFn()
 * // console:
 * // test
 * // [Foreslash] Do not use this!
 * // test
 * // test
 * ```
 * @version 0.3.6
 */
export function deprecate<Fn extends Function>(fn: Fn, msg: string, code?: string) {
  let isWarned = false
  return function deprecateFn(this: any, ...args: any[]) {
    const res = fn.apply(this, args)
    if (!isWarned) {
      if (code) console.warn(`[${code}]`, msg)
      else console.warn(msg)
      isWarned = true
    }
    return res
  } as unknown as Fn
}
