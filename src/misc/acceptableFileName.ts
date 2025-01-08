import { _getAcceptableMIMEByExt } from '../utils/_acceptableFile'
/**
 * 根据文件名称判断是否匹配支持的文件类型，需要注意 `.C` 与 `.c` 的区别
 * - `text/x-c++src` 对应 `.C`
 * - `text/x-c` 对应 `.c`
 * @param fileName 文件名称
 * @param accept 支持的文件类型，同 `input[accept]` 属性
 * @example
 * ```JS
 * acceptableFileName('test.png', '*\/*') // true
 * acceptableFileName('test.txt', '*\/*') // true
 * acceptableFileName('test.png', 'IMAGE/*') // true
 * acceptableFileName('test.txt', 'TEXT/*') // true
 * acceptableFileName('test.Png', 'text/plain, image/jpeg') // false
 * acceptableFileName('test.Txt', 'image/png, image/jpeg') // false
 * // 区分 C 与 C++ 源文件拓展名
 * acceptableFileName('cpp.C', 'text/x-c++src') // true
 * acceptableFileName('c__.c', 'text/x-c++src') // false
 * acceptableFileName('cpp.C', 'text/x-c') // false
 * acceptableFileName('c__.c', 'text/x-c') // true
 * ```
 */
export function acceptableFileName(fileName: string, accept: string) {
  const _ext = fileName.split('.').pop()!
  const ext = /^[CZ]$/.test(_ext) ? _ext : _ext.toLowerCase()
  const allMimeType = _getAcceptableMIMEByExt(ext)
  const acceptList = accept.split(',').map((s) => s.trim()) // 需要注意的是 .C 与 .c 的区别
  for (const item of acceptList) {
    if (item.includes('/')) {
      const i = item.toLowerCase()
      if (i === '*/*') return true
      for (const mime of allMimeType) {
        if (i === mime) return true
        if (i.endsWith('/*') && mime.startsWith(i.slice(0, -2))) return true
      }
    } else {
      const _acceptExt = item.replace(/^\./, '')
      const acceptExt = /^[CZ]$/.test(_acceptExt) ? _acceptExt : _acceptExt.toLowerCase()
      if (acceptExt === ext) return true
    }
  }
  return false
}
