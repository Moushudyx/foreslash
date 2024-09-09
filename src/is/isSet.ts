import { getGlobalThis } from '../utils/_globalThis'

const global = /*#__PURE__*/ getGlobalThis()

/**
 * 类型守卫，判断给定的值是否为`Set`
 * @param value 要判断的值
 */
export function isSet(value: unknown): value is Set<any> {
  return !!global.Set && value instanceof Set
}

/**
 * 类型守卫，判断给定的值是否为`WeakSet`
 * @param value 要判断的值
 */
export function isWeakSet(value: unknown): value is WeakSet<any> {
  return !!global.WeakSet && value instanceof WeakSet
}

