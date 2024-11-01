const radix32 = '0123456789abcdefghijklmnopqrstuv'
export const base32Chars = 'abcdefghijklmnopqrstuvwxyz234567'
export const base32Crockford = '0123456789abcdefghjkmnpqrstvwxyz'
export const base32CharsMap = /*#__PURE__*/ new Map(radix32.split('').map((c, i) => [c, base32Chars[i]]))
export const base32CrockfordMap = /*#__PURE__*/ new Map(radix32.split('').map((c, i) => [c, base32Crockford[i]]))
/**
 * 将 32 进制的字符串（小写）转换为 Base32 格式的（小写）
 * @param str 32 进制的字符串（小写）
 * @param mapping 字符集的映射表
 * @returns 返回 Base32 字符串
 */
export function toBase32(str: string, mapping: Map<string, string>): string {
  return str
    .split('')
    .map((c) => mapping.get(c))
    .join('')
}
