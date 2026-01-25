import { _splitVar } from '../utils/_splitWords'
import { _caseConvert } from './_caseConvert'

/**
 * 将输入的字符串处理成常量格式(全大写下划线分割)
 * @param str 想要转换的字符串
 * @param options.keepNumber 是否保留数字, 默认保留
 * @returns 转换为常量格式的字符串
 * @example
 * ```js
 * // 默认情况 保留数字
 * constantCase("getTestUuid1234") // "GET_TEST_UUID_1234"
 * // 不保留数字
 * constantCase("getTestUuid1234", { keepNumber: false }) // "GET_TEST_UUID"
 * ```
 * @version 0.3.8
 */
export function constantCase(str: string, options?: { keepNumber?: boolean }): string {
  const { keepNumber = true } = options || {}
  let tokens = _splitVar(str)
  if (!keepNumber) tokens = tokens.filter(({ number }) => !number)
  return _caseConvert(tokens, '_', ({ code }) => code.toUpperCase())
}
