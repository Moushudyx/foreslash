import { getGlobalThis, getTag } from '../utils/index'

const global = /*#__PURE__*/ getGlobalThis()
const FormData = /*#__PURE__*/ global.FormData
/**
 * 类型守卫，判断给定的值是否为`FormData`
 * - 非 Web 环境会使用当前环境的 `FormData` 全局对象
 * - Node.js 18+ 才引入了此 API
 * @param value 要判断的值
 * @example
 * ```js
 * isFormData(new FormData()) // true
 * isFormData({}) // false
 * isFormData([]) // false
 * isFormData(null) // false
 * ```
 * @version 0.2.0
 */
export function isFormData(value: unknown): value is FormData {
  return !!FormData && value instanceof FormData
}
