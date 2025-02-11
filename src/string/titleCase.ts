import { _splitVar } from '../utils/_splitWords'
import { _caseConvert } from './_caseConvert'

/**
 * 将输入的字符串处理成标题格式(类似大驼峰, 不过有空格分割)
 * @param str 想要转换的字符串
 * @param options.keepLetterCase 是否保留原来的大小写
 * @param options.keepNumber 是否保留数字, 默认保留
 * @returns 转换为标题格式的字符串
 * @example
 * ```js
 * // 默认情况 不保留大小写 保留数字
 * titleCase("getTestUuid1234") // "Get Test Uuid 1234"
 * // 保留大小写 保留数字
 * titleCase("getTestUuid1234", { keepLetterCase: true }) // "Get Test UUID 1234"
 * // 保留大小写 不保留数字
 * titleCase("getTestUuid1234", { keepLetterCase: true, keepNumber: false }) // "Get Test UUID"
 * ```
 * @version 0.2.0
 */
export function titleCase(str: string, options?: { keepLetterCase?: boolean; keepNumber?: boolean }): string {
  const { keepLetterCase = false, keepNumber = true } = options || {}
  let tokens = _splitVar(str)
  if (!keepNumber) tokens = tokens.filter(({ number }) => !number)
  return _caseConvert(
    tokens,
    ' ',
    keepLetterCase
      ? ({ code }) => code.slice(0, 1).toUpperCase() + code.slice(1)
      : ({ code }) => code.slice(0, 1).toUpperCase() + code.slice(1).toLowerCase()
  )
}
