/**
 * 给一个多行的字符串清除缩进效果
 * @param str 需要处理的字符串
 * @param count 缩进数量, 默认为 `2`
 * @param indentStr 缩进字符串, 默认为 ` `(一个空格)
 * @returns 处理过的字符串
 * @example
 * ```js
 * dedent(`  a\n  b\n    c`) // `a\nb\n  c`
 * dedent(`*a\n**b\n****c`, 3, '*') // `a\nb\n*c`
 * ```
 * @version 0.3.1
 */
export function dedent(str: string, count?: number | null, indentStr?: string): string
/**
 * 给一个多行的字符串清除缩进效果
 * @param str 需要处理的字符串
 * @param option 缩进效果配置
 * - `count` 缩进数量, 默认为 `2`
 * - `indentStr` 缩进字符串, 默认为 ` `(一个空格)
 * @returns 处理过的字符串
 * @example
 * ```js
 * dedent(`  a\n  b\n    c`) // `a\nb\n  c`
 * dedent(`*a\n**b\n****c`, { count: 3, indentStr: '*' }) // `a\nb\n*c`
 * ```
 * @version 0.3.1
 */
export function dedent(str: string, option?: { count?: number; indentStr?: string }): string
export function dedent(
  str: string,
  option?: { count?: number; indentStr?: string } | number | null,
  indentStr?: string
) {
  if (typeof option === 'number' || indentStr) {
    return _dedent(str, (option as number | null) || 2, indentStr || ' ')
  } else {
    const { count = 2, indentStr = ' ' } = option || {}
    return _dedent(str, count, indentStr)
  }
}
function _dedent(str: string, count: number, indentStr: string) {
  return str
    .split('\n')
    .map((s) => {
      let i = count
      while (s && s.startsWith(indentStr) && i > 0) {
        s = s.slice(indentStr.length)
        i--
      }
      return s
    })
    .join('\n')
}
