import { randomHexString } from './randomString'
/** 空 UUID [见标准第 5.9 节](https://www.rfc-editor.org/rfc/rfc9562.html#name-nil-uuid) */
export const uuidNil = '00000000-0000-0000-0000-000000000000'
/**
 * 生成 [UUID V4](https://www.rfc-editor.org/rfc/rfc9562.html#name-uuid-version-4) 字符串（小写）
 * @returns 一个 RFC 9562 标准的 UUID V4 字符串
 * @example
 * ```js
 * uuidV4() // "ea64fb4f-a0a2-4193-8374-d291a522d8b3"
 * ```
 * @version 0.1.2
 */
export function uuidV4() {
  const r = randomHexString(30) // 8 + 4 + 3 + 3 + 12
  return (
    `${r.slice(0, 8)}-${r.slice(8, 12)}-4${r.slice(12, 15)}-` +
    `${'89ab'[Math.floor(Math.random() * 4)]}${r.slice(15, 18)}-${r.slice(18)}`
  )
}
/**
 * 生成 [UUID V7](https://www.rfc-editor.org/rfc/rfc9562.html#name-uuid-version-7) 字符串（小写）
 * @returns 一个 RFC 9562 标准的 UUID V7 字符串
 * @example
 * ```js
 * uuidV7() // "019aba02-45ad-703c-a17e-05f8d7ebe357"
 * ```
 * @version 0.3.4
 */
export function uuidV7() {
  const r = randomHexString(18) // 3 + 3 + 12
  let t = Date.now().toString(16)
  if (t.length < 12) t = '0'.repeat(12 - t.length) + t
  t = t.slice(t.length - 12, t.length)
  return (
    `${t.slice(0, 8)}-${t.slice(8, 12)}-7${r.slice(0, 3)}-` +
    `${'89ab'[Math.floor(Math.random() * 4)]}${r.slice(3, 6)}-${r.slice(6)}`
  )
}
