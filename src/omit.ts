import { isArray, isFunction, isNumber, isString, isSymbol } from './is'
import type { OmitPredicate } from './types/object'
/**
 * 给定一个对象和对象中键的列表, 返回一个**排除**给定键的新对象(是传入对象的浅拷贝)\
 * 如果你希望深拷贝一个对象, 请使用 `deepClone` 或 `fastClone`
 * @param obj 需要处理的对象
 * @param keys 需要**排除**的键, 可以是一个数组、字符串或谓词函数
 * @returns 传入对象的浅拷贝, 与传入对象不同的是新对象**排除了**指定的键
 * @example
 * ```ts
 * omit({ a: 1, b: 2, c: '' }, ['a', 'c']) // { b: 2 }
 * omit({ a: 1, b: 2, c: '' }, 'b') // { a: 1, c: '' }
 * // 谓词函数
 * omit({ a: 1, b: 2, c: '' }, (value, key) => value === 2 || key === 'c') // { a: 1 }
 * // 需要注意的是传入谓词函数时可能会有类型不匹配的问题
 * // Typescript 无法得知最终过滤的结果, 而是认为过滤结果与原类型一致
 * const obj = omit({ a: 1, b: 2 }, (value, key) => value === 2) // { a: 1 }
 * type typeofObj = typeof obj // { a: number; b: number } <- Typescript 没有推导出正确结果
 * ```
 * @version 0.3.4
 */
export function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K>
export function omit<T extends object, K extends keyof T>(obj: T, keys: OmitPredicate<T>): T
export function omit<T extends object, K extends keyof T>(obj: T, key: K): Omit<T, K>
export function omit<T extends object, K extends keyof T>(obj: T, keys: K | K[] | OmitPredicate<T>): Omit<T, K> {
  const res = (Object.getPrototypeOf(obj) ? {} : Object.create(null)) as Omit<T, K>
  const ownKeys = Reflect.ownKeys(obj) as (keyof T)[]
  if (isFunction(keys)) {
    // 为保证性能, 用最古老的 for(;;) 而非 for(of)
    for (let i = 0; i < ownKeys.length; i++) {
      const key = ownKeys[i] as keyof Omit<T, K>
      if (!keys(obj[key], key, obj)) res[key] = obj[key]
    }
  } else {
    const keysSet = new Set((isArray(keys) ? keys : [keys]).map((k) => (isNumber(k) ? String(k) : k))) as Set<K> // O(n*m) -> O(n+m)
    // 为保证性能, 用最古老的 for(;;) 而非 for(of)
    for (let i = 0; i < ownKeys.length; i++) {
      const key = ownKeys[i]
      if (!keysSet.has(key as any)) res[key as keyof Omit<T, K>] = obj[key as keyof Omit<T, K>]
    }
  }
  return res
}

// const a = omit({ a: 1, b: 2 }, ['a'])
// const b = omit({ a: 1, b: 2, c: '' }, (value, key, obj): boolean => value === 2)
// const c = omit({ a: 1, b: 2, c: '' }, 'c')
// type aa = typeof a
// type bb = typeof b
// type cc = typeof c
