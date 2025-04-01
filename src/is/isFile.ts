import { getGlobalThis, getTag } from '../utils/index'

const global = /*#__PURE__*/ getGlobalThis()
const File = global.File
/**
 * 类型守卫，判断给定的值是否为`File`
 * - 非 Web 环境会使用当前环境的 `File` 全局对象
 * - Node.js 18+ 才引入了此 API, Node.js 20+ 实现了完全支持
 * @param value 要判断的值
 * @example
 * ```js
 * isFile(new File([new ArrayBuffer(8)], 'fileName')) // true
 * isFile(new ArrayBuffer(8)) // false
 * isFile([1, 2, 3]) // false
 * ```
 * @version 0.2.0
 */
export function isFile(value: unknown): value is File {
  return !!File && value instanceof File
}
