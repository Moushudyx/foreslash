import { _splitVar, type VarCase } from '../utils/_splitWords'
import { _caseConvert } from './_caseConvert'
/**
 * 将想要转换格式的字符串处理成需要的格式\
 * 推荐使用预置功能的方法:
 * - `caseCamel` 转换为小驼峰
 * - `casePascal` 转换为大驼峰
 * @param str 想要转换的字符串
 * @param joiner 链接字符, 默认为空字符串 `""`
 * @param handler 处理字符的方法, 默认不作处理, 返回空字符串表示丢弃这一项
 * @returns 转换格式后的字符串
 * @example
 * ```js
 * caseConvert("A文字B🎈C=-=Test") // "ABCTest"
 * caseConvert("getTestUUID1234", "-") // "get-Test-UUID-1234"
 * caseConvert("user_nick_name", " ", ({code}) => code.toUpperCase()) // "USER NICK NAME"
 * ```
 */
export function caseConvert(str: string, joiner = '', handler?: (token: VarCase, index: number) => string): string {
  const hc: (token: VarCase, index: number) => string = handler ? handler : (token) => token.code
  return _caseConvert(_splitVar(str), joiner, hc)
}
/**
 * 将输入的字符串处理成小驼峰格式
 * @param str 想要转换的字符串
 * @param keepLetterCase 是否保留原来的大小写, 默认不保留
 * @param keepNumber 是否保留数字, 默认保留
 * @returns 转换为小驼峰格式的字符串
 * @example
 * ```js
 * caseCamel("get-Test-UUID-1234") // "getTestUuid1234" 默认情况 不保留大小写 保留数字
 * caseCamel("get-Test-UUID-1234", true) // "getTestUUID1234" 保留大小写 保留数字
 * caseCamel("get-Test-UUID-1234", true, false) // "getTestUUID" 保留大小写 不保留数字
 * ```
 */
export function caseCamel(str: string, keepLetterCase = false, keepNumber = true): string {
  let tokens = _splitVar(str)
  if (!keepNumber) tokens = tokens.filter(({ number }) => !number)
  return _caseConvert(
    tokens,
    '',
    keepLetterCase
      ? ({ code }, index) => {
          if (index) return code.slice(0, 1).toUpperCase() + code.slice(1)
          else return code
        }
      : ({ code }, index) => {
          if (index) return code.slice(0, 1).toUpperCase() + code.slice(1).toLowerCase()
          else return code.toLowerCase()
        }
  )
}
/**
 * 将输入的字符串处理成大驼峰格式
 * @param str 想要转换的字符串
 * @param keepLetterCase 是否保留原来的大小写
 * @param keepNumber 是否保留数字, 默认保留
 * @returns 转换为大驼峰格式的字符串
 * @example
 * ```js
 * casePascal("get-Test-UUID-1234") // "GetTestUuid1234"
 * casePascal("get-Test-UUID-1234", true) // "GetTestUUID1234"
 * casePascal("get-Test-UUID-1234", true, false) // "GetTestUUID"
 * ```
 */
export function casePascal(str: string, keepLetterCase = false, keepNumber = true): string {
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
/**
 * 将输入的字符串处理成串行格式
 * @param str 想要转换的字符串
 * @param keepLetterCase 是否保留原来的大小写
 * @param keepNumber 是否保留数字, 默认保留
 * @returns 转换为串行格式的字符串
 * @example
 * ```js
 * caseKebab("getTestUuid1234") // "get-test-uuid-1234"
 * caseKebab("getTestUuid1234", true) // "get-Test-UUID-1234"
 * caseKebab("getTestUuid1234", true, false) // "get-Test-UUID"
 * ```
 */
export function caseKebab(str: string, keepLetterCase = false, keepNumber = true): string {
  let tokens = _splitVar(str)
  if (!keepNumber) tokens = tokens.filter(({ number }) => !number)
  return _caseConvert(tokens, '-', keepLetterCase ? ({ code }) => code : ({ code }) => code.toLowerCase())
}
/**
 * 将输入的字符串处理成蛇行格式
 * @param str 想要转换的字符串
 * @param keepLetterCase 是否保留原来的大小写
 * @param keepNumber 是否保留数字, 默认保留
 * @returns 转换为蛇行格式的字符串
 * @example
 * ```js
 * caseSnake("getTestUuid1234") // "get_test_uuid_1234"
 * caseSnake("getTestUuid1234", true) // "get_Test_UUID_1234"
 * caseSnake("getTestUuid1234", true, false) // "get_Test_UUID"
 * ```
 */
export function caseSnake(str: string, keepLetterCase = false, keepNumber = true): string {
  let tokens = _splitVar(str)
  if (!keepNumber) tokens = tokens.filter(({ number }) => !number)
  return _caseConvert(tokens, '_', keepLetterCase ? ({ code }) => code : ({ code }) => code.toLowerCase())
}
