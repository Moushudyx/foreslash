import { randomChoice } from './randomChoice'
/**
 * 生成指定长度的随机字符串
 * @param length 字符串的长度
 * @param chars 字符集，默认为大小写字母和数字
 * @returns 生成的随机字符串
 */
export function randomString(
  length: number,
  chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
): string {
  if (!Number.isInteger(length) || length <= 0) {
    throw new Error('Invalid length parameter');
  }
  let res = ''
  for (let i = 0; i < length; i++) res += randomChoice(chars)
  return res
}
/**
 * 生成指定长度的随机十六进制字符串（小写），`randomString`也能实现此功能但是性能更差
 * @param length 字符串的长度
 * @returns 返回一个长度为`length`的随机十六进制字符串
 */
export function randomHexString(length: number): string {
  // return randomString(length, '0123456789abcdef')
  if (!Number.isInteger(length) || length <= 0) {
    throw new Error('Invalid length parameter');
  }
  // length 大于 13 时需要分多次生成，避免超出 Number.MAX_SAFE_INTEGER
  // 16 ** 13 < Number.MAX_SAFE_INTEGER < 16 ** 14
  if (length > 13) {
    const count = Math.floor(length / 13)
    let res = _randomHexString(length % 13)
    for (let i = 0; i < count; i++) res += _randomHexString(13)
    return res
  } else {
    return _randomHexString(length);
  }
}
/**
 * 内部方法，生成指定长度的随机十六进制字符串
 * @param length 字符串的长度，不能超过 13
 * @returns 返回一个长度为`length`的随机十六进制字符串
 */
function _randomHexString(length: number): string{
  let res = Math.floor(Math.random() * 16 ** length).toString(16)
  while (res.length < length) res = '0' + res
  return res
}
