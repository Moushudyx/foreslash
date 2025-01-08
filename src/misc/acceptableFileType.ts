import { _getAcceptableExtByMIME } from '../utils/_acceptableFile'
/**
 * 根据文件的 MIME 类型判断是否匹配支持的文件类型，需要注意 `.C` 与 `.c` 的区别
 * - `text/x-c++src` 对应 `.C`
 * - `text/x-c` 对应 `.c`
 * @param fileType 文件的 MIME 类型
 * @param accept 支持的文件类型，同 `input[accept]` 属性
 * @example
 * ```JS
 * acceptableFileType('image/jpeg', '.Jpg, .pNG') // true
 * acceptableFileType('image/jpeg', 'image/*') // true
 * acceptableFileType('image/jpeg', '*\/*') // true
 * acceptableFileType('image/jpeg', '.png, .bmp, video/*') // false
 * // 区分 C 与 C++ 源文件拓展名
 * acceptableFileType('text/x-c++src', '.C') // true
 * acceptableFileType('text/x-c++src', '.c') // false
 * acceptableFileType('text/x-c', '.c') // true
 * acceptableFileType('text/x-c', '.C') // false
 * ```
 */
export function acceptableFileType(fileType: string, accept: string) {
  const type = fileType.toLowerCase()
  const allExtList = _getAcceptableExtByMIME(type)
  const acceptList = accept.split(',').map((s) => s.trim()) // 需要注意的是 .C 与 .c 的区别
  for (const item of acceptList) {
    if (item.includes('/')) {
      const i = item.toLowerCase()
      if (i === '*/*' || i === type) return true
      if (i.endsWith('/*') && type.startsWith(i.slice(0, -2))) return true
    } else {
      const _ext = item.replace(/^\./, '')
      const ext = /^[CZ]$/.test(_ext) ? _ext : _ext.toLowerCase()
      if (allExtList.includes(ext)) return true
    }
  }
  return false
}
