import { _splitVar } from '../utils/_splitWords'
import { _caseConvert } from './_caseConvert'
/**
 * 将输入的字符串处理成串行格式(短横线分割)
 * @param str 想要转换的字符串
 * @param options.keepLetterCase 是否保留原来的大小写, 默认不保留
 * @param options.keepNumber 是否保留数字, 默认保留
 * @returns 转换为串行格式的字符串
 * @example
 * ```js
 * // 默认情况 不保留大小写 保留数字
 * kebabCase("getTestUuid1234") // "get-test-uuid-1234"
 * // 保留大小写 保留数字
 * kebabCase("getTestUuid1234", { keepLetterCase: true }) // "get-Test-UUID-1234"
 * // 保留大小写 不保留数字
 * kebabCase("getTestUuid1234", { keepLetterCase: true, keepNumber: false }) // "get-Test-UUID"
 * ```
 */
export function kebabCase(str: string, options?: { keepLetterCase?: boolean; keepNumber?: boolean }): string {
  const { keepLetterCase = false, keepNumber = true } = options || {}
  let tokens = _splitVar(str)
  if (!keepNumber) tokens = tokens.filter(({ number }) => !number)
  return _caseConvert(tokens, '-', keepLetterCase ? ({ code }) => code : ({ code }) => code.toLowerCase())
}
