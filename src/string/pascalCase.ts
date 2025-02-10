import { _splitVar } from '../utils/_splitWords'
import { _caseConvert } from './_caseConvert'
/**
 * 将输入的字符串处理成大驼峰格式
 * @param str 想要转换的字符串
 * @param options.keepLetterCase 是否保留原来的大小写, 默认不保留
 * @param options.keepNumber 是否保留数字, 默认保留
 * @returns 转换为大驼峰格式的字符串
 * @example
 * ```js
 * // 默认情况 不保留大小写 保留数字
 * pascalCase("get-Test-UUID-1234") // "GetTestUuid1234"
 * // 保留大小写 保留数字
 * pascalCase("get-Test-UUID-1234", { keepLetterCase: true }) // "GetTestUUID1234"
 * // 保留大小写 不保留数字
 * pascalCase("get-Test-UUID-1234", { keepLetterCase: true, keepNumber: false }) // "GetTestUUID"
 * ```
 * @version 0.2.0
 */
export function pascalCase(str: string, options?: { keepLetterCase?: boolean; keepNumber?: boolean }): string {
  const { keepLetterCase = false, keepNumber = true } = options || {}
  let tokens = _splitVar(str)
  if (!keepNumber) tokens = tokens.filter(({ number }) => !number)
  return _caseConvert(
    tokens,
    '',
    keepLetterCase
      ? ({ code }) => code.slice(0, 1).toUpperCase() + code.slice(1)
      : ({ code }) => code.slice(0, 1).toUpperCase() + code.slice(1).toLowerCase()
  )
}
