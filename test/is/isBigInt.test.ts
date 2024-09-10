import {isBigInt} from '../../src/index'

describe('isBigInt', () => {
  it('基本功能', () => {
    // expect(isBigInt(1n)).toBe(true)
    expect(isBigInt(BigInt(1))).toBe(true)
    expect(isBigInt(1)).toBe(false)
    expect(isBigInt(null)).toBe(false);
    expect(isBigInt(undefined)).toBe(false);
    // expect(isBigInt(Object(1n))).toBe(false)
  })
})
