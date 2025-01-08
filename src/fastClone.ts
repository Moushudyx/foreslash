import { isMap } from './is'
import { _fastClone } from './utils/_fastClone'

/**
 * 快速深拷贝
 * - 快速是相对 `deepClone` 而言的，功能比许多互联网上常见的深拷贝代码片段更多
 * - 支持处理的情况：循环引用、数组、`Date`、正则、`Set`、`Map`
 * - 对象上以 `Symbol` 为键的属性无法拷贝
 * - 无法拷贝的内容将视为原生数据类型，直接复制
 *   - 如函数、`Promise`、`WeakMap`、`WeakSet`
 * - 层级过深(500 层以上)时可能导致栈溢出
 * @param obj 需要深拷贝的数据
 * @param map 缓存对象，用于处理循环引用，建议不传
 * @example
 * ```js
 * const obj = { map: new Map() }
 * obj.map.set(obj, 'val')
 * // 用 fastClone 复制带有 Map 和循环引用的对象
 * const clone = fastClone(obj)
 * clone === obj // false
 * clone.map === obj.map // false
 * clone.map.get(clone) === 'val' // true
 * ```
 */
export function fastClone<T>(obj: T, map?: Map<any, any>): T {
  if (!isMap(map)) map = new Map()
  const res = _fastClone(obj, map)
  map.clear()
  return res
}
