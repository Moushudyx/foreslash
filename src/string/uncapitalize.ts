/**
 * 将字符串的首字母小写
 * @param str 字符串
 * @returns 首字母小写后的字符串
 * @example
 * ```js
 * uncapitalize('Hello world') // 'hello world'
 * ```
 * @version 0.3.0
 */
export function uncapitalize(str: string): string {
  if (!str) return str
  return str.charAt(0).toLowerCase() + str.slice(1)
}
