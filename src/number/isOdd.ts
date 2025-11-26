/**
 * 检查一个数字是否为奇数
 * @param num 需要检查的数字
 * @returns 如果是奇数则返回 true 否则返回 false
 * @version 0.3.2
 */
export function isOdd(num: number | bigint) {
  return !!(typeof num === 'bigint' ? num & BigInt(1) : num & 1)
}
/**
 * 检查一个数字是否为偶数
 * @param num 需要检查的数字
 * @returns 如果是偶数则返回 true 否则返回 false
 * @version 0.3.2
 */
export function isEven(num: number | bigint) {
  return !(typeof num === 'bigint' ? num & BigInt(1) : num & 1)
}
