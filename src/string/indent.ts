/**
 * 给一个多行的字符串添加缩进效果
 * @param str 需要处理的字符串
 * @param count 缩进数量, 默认为 `2`
 * @param indentStr 缩进字符串, 默认为 ` `(一个空格)
 * @returns 处理过的字符串
 * @example
 * ```js
 * indent(`a\nb\n  c`) // `  a\n  b\n    c`
 * indent(`a\nb\n  c`, 1, '*') // `*a\n*b\n*  c`
 * ```
 * @version 0.3.1
 */
export function indent(str: string, count?: number | null, indentStr?: string): string
/**
 * 给一个多行的字符串添加缩进效果
 * @param str 需要处理的字符串
 * @param option 缩进效果配置
 * - `count` 缩进数量, 默认为 `2`
 * - `indentStr` 缩进字符串, 默认为 ` `(一个空格)
 * - `ignoreEmptyLine` 是否忽略空行, 默认为是
 * @returns 处理过的字符串
 * @example
 * ```js
 * indent(`a\nb\n  c`) // `  a\n  b\n    c`
 * indent(`a\nb\n  c`, { count: 1, indentStr: '*' }) // `*a\n*b\n*  c`
 * ```
 * @version 0.3.1
 */
export function indent(str: string, option?: { count?: number; indentStr?: string; ignoreEmptyLine?: boolean }): string
export function indent(
  str: string,
  option?: { count?: number; indentStr?: string; ignoreEmptyLine?: boolean } | number | null,
  indentStr?: string
) {
  if (typeof option === 'number' || indentStr) {
    return _indent(str, (option as number | null) || 2, indentStr || ' ', true)
  } else {
    const { count = 2, indentStr = ' ', ignoreEmptyLine = true } = option || {}
    return _indent(str, count, indentStr, ignoreEmptyLine)
  }
}
function _indent(str: string, count: number, indentStr: string, ignoreEmptyLine: boolean) {
  return str
    .split('\n')
    .map((s) => `${s || !ignoreEmptyLine ? indentStr.repeat(count) : ''}${s}`)
    .join('\n')
}
