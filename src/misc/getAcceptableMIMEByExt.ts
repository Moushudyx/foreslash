import { isString } from '../is'
import { _getAcceptableMIMEByExt } from '../utils/_acceptableFile'
/**
 * 根据文件拓展名获取所有匹配的 MIME 类型，需要注意 `.C` 与 `.c` 的区别
 * - `text/x-c++src` 对应 `.C`
 * - `text/x-c` 对应 `.c`
 * @param ext 文件拓展名，不区分大小写
 * @returns 所有匹配文件拓展名的 MIME 类型数组，不支持的类型返回空数组
 * @example
 * ```js
 * getAcceptableMIMEByExt('mp3') // ['audio/mp3', 'audio/mpeg']
 * getAcceptableMIMEByExt('png') // ['image/png', 'image/apng', 'image/vnd.mozilla.apng']
 * getAcceptableMIMEByExt('apng') // ['image/apng', 'image/vnd.mozilla.apng']
 * // 区分 C 与 C++ 源文件拓展名
 * getAcceptableMIMEByExt('c') // ['text/x-c', 'text/x-csrc']
 * getAcceptableMIMEByExt('C') // ['text/x-c++src']
 * ```
 */
export function getAcceptableMIMEByExt(ext: string): string[] {
  if (!ext || !isString(ext)) return []
  const _ext = ext.split('.').pop()!.trim()
  const e = /^[CZ]$/.test(_ext) ? _ext : _ext.toLowerCase()
  return _getAcceptableMIMEByExt(e)
}
