import { isString } from '../is'
import { _getAcceptableExtByMIME } from '../utils/_acceptableFile'
/**
 * 根据 MIME 类型获取所有匹配的文件拓展名，需要注意 `.C` 与 `.c` 的区别
 * - `text/x-c++src` 对应 `.C`
 * - `text/x-c` 对应 `.c`
 * @param mime MIME 类型，不区分大小写，子类型可以是 `*`，主类型**必填**
 * @returns 所有匹配的文件拓展名数组，注意**不带点号**，不支持的类型返回空数组
 * @example
 * ```js
 * getAcceptableExtByMIME('image/jpeg') // ['jpg', 'jpeg', 'jpe']
 * getAcceptableExtByMIME('audio/ogg') // ['ogg', 'oga', 'spx', 'opus']
 * getAcceptableExtByMIME('video/*') // ['avi', 'avf', ... , 'mks' , 'wmv']
 * // 区分 C 与 C++ 源文件拓展名
 * getAcceptableExtByMIME('text/x-c++src') // ['cpp', 'cxx', 'cc', 'C', 'c++']
 * getAcceptableExtByMIME('text/x-c') // ['c', 'cc', 'cxx', 'cpp', 'h', 'hh', 'dic']
 * ```
 */
export function getAcceptableExtByMIME(mime: string): string[] {
  if (!mime || !isString(mime)) return []
  return _getAcceptableExtByMIME(mime.trim().toLowerCase())
}
