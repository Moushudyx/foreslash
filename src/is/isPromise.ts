import { getTag } from '../utils'
import { isFunction } from './isFunction'
import { isObject } from './isObject'

/**
 * 类型守卫，判断给定的值是否为 `Promise`
 * @param value 要判断的值
 * @example
 * ```js
 * isPromise(new Promise((res) => res(1))) // true
 * isPromise(new Promise.resolve(1)) // true
 * isPromise({ then() {} }) // false
 * isPromise({}) // false
 * isPromise([]) // false
 * isPromise(Object(123)) // false
 * ```
 */
export function isPromise(value: unknown): value is Promise<any> {
  return isObject(value) && isFunction((value as unknown as Record<string, any>).then) && getTag(value) === 'Promise'
}
