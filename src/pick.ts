import { isArray, isFunction, isNumber, isString, isSymbol } from './is'
import type { PickPredicate } from './types/object'
/**
 * 给定一个对象和对象中键的列表, 返回一个**只包含**给定键的新对象(是传入对象的浅拷贝)\
 * 如果你希望深拷贝一个对象, 请使用 `deepClone` 或 `fastClone`
 * @param obj 需要处理的对象
 * @param keys 需要**取出**的键, 可以是一个数组、字符串或谓词函数
 * @returns 传入对象的浅拷贝, 与传入对象不同的是新对象仅包含指定的键
 * @example
 * ```ts
 * pick({ a: 1, b: 2, c: '' }, ['a', 'c']) // { a: 1, c: '' }
 * pick({ a: 1, b: 2, c: '' }, 'b') // { b: 2 }
 * // 谓词函数
 * pick({ a: 1, b: 2, c: '' }, (value, key) => value === 2 || key === 'c') // { b: 2, c: '' }
 * // 需要注意的是传入谓词函数时可能会有类型不匹配的问题
 * // Typescript 无法得知最终过滤的结果, 而是认为过滤结果与原类型一致
 * const obj = pick({ a: 1, b: 2 }, (value, key) => value === 2) // { b: 2 }
 * type typeofObj = typeof obj // { a: number; b: number } <- Typescript 没有推导出正确结果
 * ```
 * @version 0.3.4
 */
export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K>
export function pick<T extends object, K extends keyof T>(obj: T, keys: PickPredicate<T>): T
export function pick<T extends object, K extends keyof T>(obj: T, key: K): Pick<T, K>
export function pick<T extends object, K extends keyof T>(obj: T, keys: K | K[] | PickPredicate<T>): Pick<T, K> {
  const res = (Object.getPrototypeOf(obj) ? {} : Object.create(null)) as Pick<T, K>
  const ownKeys = Reflect.ownKeys(obj) as (keyof T)[]
  if (isFunction(keys)) {
    // 为保证性能, 用最古老的 for(;;) 而非 for(of)
    for (let i = 0; i < ownKeys.length; i++) {
      const key = ownKeys[i] as keyof Pick<T, K>
      if (keys(obj[key], key, obj)) res[key] = obj[key]
    }
  } else if (isArray(keys)) {
    const keysSet = new Set(ownKeys) // O(n*m) -> O(n+m)
    // 为保证性能, 用最古老的 for(;;) 而非 for(of)
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      // { 0: 1 } -> ownKeys: ['0']
      if (keysSet.has(isNumber(key) ? (String(key) as K) : key)) res[key] = obj[key]
    }
  } else if (isString(keys) || isNumber(keys) || isSymbol(keys)) {
      // { 0: 1 } -> ownKeys: ['0']
    if (ownKeys.includes(isNumber(keys) ? (String(keys) as K) : keys)) res[keys] = obj[keys]
  }
  return res
}

// const a = pick({ a: 1, b: 2 }, ['a'])
// const b = pick({ a: 1, b: 2, c: '' }, (value, key, obj): boolean => value === 2)
// const c = pick({ a: 1, b: 2, c: '' }, 'c')
// type aa = typeof a
// type bb = typeof b
// type cc = typeof c
