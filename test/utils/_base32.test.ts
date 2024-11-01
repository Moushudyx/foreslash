import {base32CharsMap, base32CrockfordMap, toBase32} from '../../src/utils/_base32'

describe('toBase32', () => {
  it ('基本功能', () => {
    expect(toBase32('0123456789abcdefghijklmnopqrstuv', base32CharsMap)).toBe('abcdefghijklmnopqrstuvwxyz234567')
    expect(toBase32('0123456789abcdefghijklmnopqrstuv', base32CrockfordMap)).toBe('0123456789abcdefghjkmnpqrstvwxyz')
  })
})
