import { base32CharsMap, base32CrockfordMap, toBase32, numberToBase32 } from '../../src/utils/_base32'

describe('toBase32', () => {
  it('基本功能', () => {
    expect(toBase32('0123456789abcdefghijklmnopqrstuv', base32CharsMap)).toBe('abcdefghijklmnopqrstuvwxyz234567')
    expect(toBase32('0123456789abcdefghijklmnopqrstuv', base32CrockfordMap)).toBe('0123456789abcdefghjkmnpqrstvwxyz')
  })
})

describe('numberToBase32', () => {
  it('基本功能', () => {
    expect(numberToBase32(123456789, 8, base32CharsMap)).toBe(toBase32('00' + (123456789).toString(32), base32CharsMap))
    expect(numberToBase32(123456789, 8, base32CrockfordMap)).toBe(
      toBase32('00' + (123456789).toString(32), base32CrockfordMap)
    )
  })
})
