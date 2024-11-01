import { base32Crockford } from '../utils/_base32'
import { randomBase32String } from './randomString'

export function ULID() {
  // const now = Date.now()
  return (_encodeTime(Date.now()) + randomBase32String(16)).toUpperCase()
}

function _encodeTime(time: number): string {
  let str = ''
  while (str.length < 10) {
    str += base32Crockford[time % 32]
    time = Math.floor(time / 32)
  }
  return str
}
