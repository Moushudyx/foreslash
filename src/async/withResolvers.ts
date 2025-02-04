import { noop } from '../noop'

interface PromiseLikeConstructor {
  new <T>(
    executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void
  ): PromiseLike<T>
}
/**
 * 实现了 ES2024 引入 `Promise.withResolvers` 的 ponyfill
 * @param PromiseLike 任何与 `Promise` 构造函数相同签名的构造函数
 * @returns 返回一个对象, 其中 `promise` 是一个 `Promise` 实例, `resolve` 和 `reject` 是两个 `Promise` 中 `executor` 接收的方法
 * @example
 * ```js
 * function readFileAsBase64(file: File) {
 *   const { promise, resolve, reject } = withResolvers<string>()
 *   const reader = new FileReader()
 *   reader.readAsDataURL(file)
 *   reader.onload = function () {
 *     resolve(reader.result as string)
 *   }
 *   reader.onerror = function () {
 *     reject()
 *   }
 *   return promise
 * }
 *
 * const fileBase64 = await readFileAsBase64(someFile)
 * ```
 */
export function withResolvers<T>(): {
  promise: Promise<T>
  resolve: (value: T | PromiseLike<T>) => void
  reject: (reason?: any) => void
}
export function withResolvers<T>(PromiseLike: PromiseLikeConstructor): {
  promise: PromiseLike<T>
  resolve: (value: T | PromiseLike<T>) => void
  reject: (reason?: any) => void
}
export function withResolvers<T>(PromiseLike: PromiseLikeConstructor = Promise) {
  let promise: PromiseLike<T>
  let resolve: (value: T | PromiseLike<T>) => void = noop
  let reject: (reason?: any) => void = noop
  promise = new PromiseLike((res, rej) => {
    resolve = res
    reject = rej
  })
  return { promise, resolve, reject }
}
