import { isPromise } from '../is'

type TryitResultType<Res, Err> = [undefined, Res] | [Err, undefined]

type TryitResult<Res, Err extends Error> = Res extends Promise<infer R>
  ? Promise<TryitResultType<R, Err>>
  : TryitResultType<Res, Err>
/**
 * 将一个函数处理为 `error-first` 的函数
 * @param fn 需要处理的函数, 可以是异步函数
 * @returns 处理过的函数, 调用后返回一个 `error-first` 的元组 `[error, result]`;\
 * 如果原函数是异步函数, 则返回值会是 `Promise<[error, result]>`;\
 * 如果运行正常则 `result` 是原函数的返回值, `error` 为 `undefined`;\
 * 如果出现异常则 `result` 为 `undefined`, `error` 是原函数抛出的错误
 * @example
 * ```js
 * // Sync Function
 * const normalFn = () => { return 1 }
 * const errorFn = () => { throw new Error('1') }
 * tryit(normalFn)() // [undefined, 1]
 * tryit(errorFn)() // [Error('1'), undefined]
 * // Async Function
 * const normalAsyncFn = () => { return Promise.resolve(1) }
 * const errorAsyncFn = () => { return Promise.reject('1') }
 * tryit(normalAsyncFn)() // Promise<[undefined, 1]>
 * tryit(errorAsyncFn)() // Promise<[Error('1'), undefined]>
 * ```
 * @version 0.2.0
 */
export function tryit<Args extends any[], Res, Err extends Error>(
  fn: (...args: Args) => Res
): (...args: Args) => TryitResult<Res, Err> {
  return function tryitConvert(this: any, ...args: Args): any {
    try {
      const res = fn.apply(this, args)
      return isPromise(res)
        ? res.then(
            (val) => [undefined, val],
            (err) => [err, undefined]
          )
        : [undefined, res]
    } catch (err) {
      return [err, undefined]
    }
  }
}
