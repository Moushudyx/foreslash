import { _splitVar } from './utils/_splitWords'
/**
 * 分割单词, 适用于分割、转换变量名的场景
 * - 任何非英文字母、数字的字符均会视为分割符
 * @param str 需要分割的字符串
 * @returns 分割后的字符串
 * @example
 * ```js
 * splitWords("getTestUUID1234") // ["get", "Test", "UUID", "1234"]
 * splitWords("user_nick_name") // ["user", "nick", "name"]
 * splitWords("A文字B🎈C=-=Test") // ["A", "B", "C", "Test"]
 * ```
 */
export function splitWords(str: string): string[] {
  return _splitVar(str).map(({ code }) => code)
}
