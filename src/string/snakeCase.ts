import { _splitVar } from '../utils/_splitWords'
import { _caseConvert } from './_caseConvert'

/**
 * 将输入的字符串处理成蛇行格式(下划线分割)
 * @param str 想要转换的字符串
 * @param options.keepLetterCase 是否保留原来的大小写
 * @param options.keepNumber 是否保留数字, 默认保留
 * @returns 转换为蛇行格式的字符串
 * @example
 * ```js
 * // 默认情况 不保留大小写 保留数字
 * snakeCase("getTestUuid1234") // "get_test_uuid_1234"
 * // 保留大小写 保留数字
 * snakeCase("getTestUuid1234", { keepLetterCase: true }) // "get_Test_UUID_1234"
 * // 保留大小写 不保留数字
 * snakeCase("getTestUuid1234", { keepLetterCase: true, keepNumber: false }) // "get_Test_UUID"
 * ```
 */
export function snakeCase(str: string, options?: { keepLetterCase?: boolean; keepNumber?: boolean }): string {
  const { keepLetterCase = false, keepNumber = true } = options || {}
  let tokens = _splitVar(str)
  if (!keepNumber) tokens = tokens.filter(({ number }) => !number)
  return _caseConvert(tokens, '_', keepLetterCase ? ({ code }) => code : ({ code }) => code.toLowerCase())
}
