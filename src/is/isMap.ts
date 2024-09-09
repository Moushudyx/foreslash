import { getGlobalThis } from '../utils/_globalThis'

const global = /*#__PURE__*/ getGlobalThis()

/**
 * 类型守卫，判断给定的值是否为`Map`
 * @param value 要判断的值
 */
export function isMap(value: unknown): value is Map<any, any> {
  return !!global.Map && value instanceof Map
}

/**
 * 类型守卫，判断给定的值是否为`WeakMap`
 * @param value 要判断的值
 */
export function isWeakMap(value: unknown): value is WeakMap<any, any> {
  return !!global.WeakMap && value instanceof WeakMap
}
