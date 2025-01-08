import { extMap, mimeMap } from './_acceptableFileMap'
/** 内部方法，根据 MIME 类型获取所有匹配的文件后缀，唯一需要注意的是 .C 与 .c 的区别 */
export function _getAcceptableExtByMIME(mime: string): string[] {
  const [t, st] = mime.split('/')
  if (!t || !st) return []
  if (st === '*') {
    return Object.values(mimeMap[t] || {}).flat();
  }
  return mimeMap[t]?.[st] || []
}
/** 内部方法，根据文件后缀获取所有匹配的 MIME 类型，唯一需要注意的是 .C 与 .c 的区别 */
export function _getAcceptableMIMEByExt(ext: string): string[] {
  // const e = ext[0] === '.' ? ext.slice(1) : ext
  return extMap[ext] || []
}
