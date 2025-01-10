import { _splitVar, type VarCase } from '../utils/_splitWords'
/**
 * 内部方法, 转换已经分词好的字符串
 * @param tokens 已经分词好的 `VarCase` 对象数组
 * @param joiner 链接字符
 * @param handler 处理字符的方法
 * @returns 转换格式后的字符串
 */
export function _caseConvert(tokens: VarCase[], joiner: string, handler: (token: VarCase, index: number) => string): string {
  return tokens
    .map(handler)
    .filter((s) => s.length) // 滤除空字符串
    .join(joiner)
}
