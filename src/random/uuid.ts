import { randomHexString } from './randomString'
/** 空 UUID [见标准第 4.1.7 节](https://www.ietf.org/rfc/rfc4122.txt) */
export const uuidNil = '00000000-0000-0000-0000-000000000000'
/**
 * 生成 [UUID V4](https://www.ietf.org/rfc/rfc4122.txt) 字符串（小写）
 * @returns 一个标准的 UUID V4 字符串
 * @example
 * ```js
 * uuidV4() // "ea64fb4f-a0a2-4193-8374-d291a522d8b3"
 * ```
 */
export function uuidV4() {
  const r = randomHexString(30) // 8 + 4 + 3 + 3 + 12
  return (
    `${r.slice(0, 8)}-${r.slice(8, 12)}-4${r.slice(12, 15)}-` +
    `${'89ab'[Math.floor(Math.random() * 4)]}${r.slice(15, 18)}-${r.slice(18)}`
  )
}
