/**
 * 将字符串的首字母大写
 * @param str 字符串
 * @returns 首字母大写后的字符串
 * @example
 * ```js
 * capitalize('hello world') // 'Hello world'
 * ```
 * @version 0.3.0
 */
export function capitalize(str: string): string {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}
