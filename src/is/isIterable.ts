import { isNil } from "./isNil";

/**
 * 类型守卫，判断给定的值是否可迭代 `Iterable`
 * @param value 要判断的值
 * @example
 * ```js
 * isIterable([]) // true
 * isIterable("1") // true
 * isIterable(new Map()) // true
 * isIterable(new Set()) // true
 * isIterable({}) // false
 * isIterable(null) // false
 * isIterable(1234) // false
 * ```
 */
export function isIterable(value: unknown): value is Iterable<unknown> {
  return !isNil(value) && typeof (value as any)[Symbol.iterator] === 'function'
}
