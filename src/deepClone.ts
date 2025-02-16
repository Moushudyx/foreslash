import { isMap } from './is'
import { _deepClone, CloneOptions, CustomCloner } from './utils/_deepClone'

export { CloneOptions, CustomCloner }
/**
 * 标准深拷贝
 * - 功能完善的深拷贝
 *   - 如果不需要支持一些冷门的数据类型, 可以使用 `fastClone` 代替
 *   - 可以使用 `customCloner` 实现自定义拷贝特殊数据的逻辑(如拷贝 Web 环境下的 `HTMLElement`)
 * - 支持处理包括循环引用、数组、正则、`DataView`、`ArrayBuffer` 等复杂数据类型
 *   - **暂不支持 `File` 类型**
 * - 可以配置是否拷贝对象的原型、属性 descriptor、以 `Symbol` 为键的属性
 * - 无法拷贝的内容将视为原生数据类型, 直接复制(如函数、`Promise`、`WeakMap`、`WeakSet`)
 * - 层级过深(500 层以上)时可能导致栈溢出
 * @param obj 需要深拷贝的数据
 * @param options 配置项, 可选, 除非有特殊需求否则不传
 * - `cloneSymbol`: 是否拷贝 `Symbol` 类型的键, 默认为 `true`
 * - `clonePrototype`: 是否拷贝对象原型, 默认为 `false`
 * - `cloneDescriptor`: 是否拷贝属性 Descriptor, 默认为 `false`
 * - `customCloner`: 自定义拷贝函数, 默认为空数组, 即不支持自定义拷贝
 * @param map 缓存对象, 用于处理循环引用, 建议不传
 * @example
 * ```js
 * const obj = { map: new Map() }
 * obj.map.set(obj, 'val')
 * // 用 deepClone 复制带有 Map 和循环引用的对象
 * const clone = deepClone(obj)
 * clone === obj // false
 * clone.map === obj.map // false
 * clone.map.get(clone) === 'val' // true
 * ```
 * @version 0.2.0
 */
export function deepClone<T>(obj: T, options?: Partial<CloneOptions>, map?: Map<any, any>): T {
  if (!isMap(map)) map = new Map()
  const res = _deepClone(
    obj,
    map,
    Object.assign({ cloneSymbol: true, clonePrototype: false, cloneDescriptor: false, customCloner: [] }, options)
  )
  map.clear()
  return res
}
