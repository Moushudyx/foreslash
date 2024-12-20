import { isInteger } from '../is'
import { base32Crockford, base32CrockfordMap, numberToBase32 } from '../utils/_base32'
import { randomIntFloor } from './randomInt'
import { randomBase32String } from './randomString'

/** 单调性控制 记录时间戳 用于生成唯一ID */
let lastTime = 0
/** 单调性控制 记录 6 位 Base32 随机数 */
let lastNum1 = 0
/** 单调性控制 记录 10 位 Base32 随机数 */
let lastNum2 = 0
/**
 * 生成 [ULID 字符串（大写）](https://github.com/ulid/spec), 默认为单调递增
 * @param monotonic 是否为单调递增, 默认为 `true`, 设为 `false` 则为随机生成
 * @param time 时间戳, 默认为当前时间
 * @returns 一个标准的 ULID 字符串
 * @example
 * ```js
 * ulid() // 01JCBE3KSY78D1F4Q5BKYZ24X9
 * ulid() // 01JCBE3KSY78D1F4Q5BKYZ24XA 默认单调递增
 * ulid(false) // 01JCBE3KSY2BCEZJSMTQP5DIQE 取消单调性
 * // 指定时间戳
 * ulid(true, 0) // 0000000000D64N3ZR75CXM1J82
 * ulid(true, 0) // 0000000000D64N3ZR75CXM1J83 同一时间戳单调递增
 * ulid(false, 0) // 0000000000Z3VJ5THVXV4ZE6CO 取消单调性
 * ```
 */
export function ulid(monotonic = true, time = NaN) {
  const now = isInteger(time) ? time : Date.now()
  if (!monotonic) return (_encodeTime(now) + randomBase32String(16)).toUpperCase()
  if (lastTime !== now) {
    lastTime = now
    lastNum1 = randomIntFloor(0, 32 ** 6)
    lastNum2 = randomIntFloor(0, 32 ** 10)
  } else {
    lastNum2++
    if (lastNum2 >= 32 ** 10) {
      lastNum1++
      lastNum2 = 0
    }
    if (lastNum1 >= 32 ** 6) {
      // throw new Error('ULID overflow')
      lastNum1 = 0
    }
  }
  return (
    _encodeTime(now) +
    numberToBase32(lastNum1, 6, base32CrockfordMap) +
    numberToBase32(lastNum2, 10, base32CrockfordMap)
  ).toUpperCase()
}

function _encodeTime(time: number): string {
  let str = ''
  while (str.length < 10) {
    str = base32Crockford[time % 32] + str
    time = Math.floor(time / 32)
  }
  return str
}
