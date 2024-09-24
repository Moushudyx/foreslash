import { isFunction } from './isFunction'
import { isObject } from './isObject'

/**
 * 类型守卫，判断给定的值是否为类 `Promise` 对象
 * - 按是否有一个 `then` 方法为依据
 * @param value 要判断的值
 * @example
 * ```js
 * isPromiseLike(new Promise((res) => res(1))) // true
 * isPromiseLike(new Promise.resolve(1)) // true
 * isPromiseLike({ then() {} }) // true
 * isPromiseLike({}) // false
 * isPromiseLike([]) // false
 * isPromiseLike(Object(123)) // false
 * ```
 */
export function isPromiseLike(value: unknown): value is Promise<any> {
  return isObject(value) && isFunction((value as unknown as Record<string, any>).then)
}
