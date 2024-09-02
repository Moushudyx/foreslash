import { randomString, randomHexString } from '../../src/index'

const testCount = 1e5

describe('randomString', () => {
  it('默认字符串测试', () => {
    const map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' as const
    const resArr = new Array<number>(map.length).fill(0)
    // 类型测试
    expect(randomString(1234).length).toBe(1234)
    expect(typeof randomString(1234)).toBe('string')
    // 随机性测试
    for (let i = 0; i < testCount; i++) {
      const res = randomString(12)
      resArr[map.indexOf(res[0])] += 1
      resArr[map.indexOf(res[2])] += 1
      resArr[map.indexOf(res[4])] += 1
      resArr[map.indexOf(res[8])] += 1
      resArr[map.indexOf(res[11])] += 1
    }
    const expectVal = (1 / map.length) * 5
    expect(resArr[0] / testCount).toBeCloseTo(expectVal, 1)
    expect(resArr[6] / testCount).toBeCloseTo(expectVal, 1)
    expect(resArr[12] / testCount).toBeCloseTo(expectVal, 1)
    expect(resArr[24] / testCount).toBeCloseTo(expectVal, 1)
    expect(resArr[50] / testCount).toBeCloseTo(expectVal, 1)
    expect(resArr[55] / testCount).toBeCloseTo(expectVal, 1)
  })
  it('指定字符串测试', () => {
    const map = '-_=+12345^&*()喵{《》【】}' as const
    const resArr = new Array<number>(map.length).fill(0)
    // 类型测试
    expect(randomString(12345, map).length).toBe(12345)
    expect(typeof randomString(12345, map)).toBe('string')
    // 随机性测试
    for (let i = 0; i < testCount; i++) {
      const res = randomString(8, map)
      resArr[map.indexOf(res[1])] += 1
      resArr[map.indexOf(res[2])] += 1
      resArr[map.indexOf(res[3])] += 1
      resArr[map.indexOf(res[5])] += 1
      resArr[map.indexOf(res[7])] += 1
    }
    const expectVal = (1 / map.length) * 5
    expect(resArr[0] / testCount).toBeCloseTo(expectVal, 1)
    expect(resArr[2] / testCount).toBeCloseTo(expectVal, 1)
    expect(resArr[5] / testCount).toBeCloseTo(expectVal, 1)
    expect(resArr[10] / testCount).toBeCloseTo(expectVal, 1)
    expect(resArr[15] / testCount).toBeCloseTo(expectVal, 1)
    expect(resArr[20] / testCount).toBeCloseTo(expectVal, 1)
  })
  it('非法参数测试', () => {
    expect(() => randomString(0)).toThrow()
    expect(() => randomString(-1)).toThrow()
    expect(() => randomString(1.23)).toThrow()
    expect(() => randomString(NaN)).toThrow()
  })
})

describe('randomHexString', () => {
  it('基本测试', () => {
    const map = '0123456789abcdef' as const
    // 类型测试
    expect(randomHexString(1).length).toBe(1)
    expect(typeof randomHexString(1)).toBe('string')
    expect(randomHexString(12).length).toBe(12)
    expect(typeof randomHexString(12)).toBe('string')
    expect(randomHexString(123).length).toBe(123)
    expect(typeof randomHexString(123)).toBe('string')
    expect(randomHexString(1234).length).toBe(1234)
    expect(typeof randomHexString(1234)).toBe('string')
    // 随机性测试
    const resArr = new Array<number>(16).fill(0)
    for (let i = 0; i < testCount; i++) {
      const res = randomHexString(12)
      resArr[map.indexOf(res[1])] += 1
      resArr[map.indexOf(res[2])] += 1
      resArr[map.indexOf(res[3])] += 1
      resArr[map.indexOf(res[5])] += 1
      resArr[map.indexOf(res[7])] += 1
    }
    const expectVal = (1 / map.length) * 5
    expect(resArr[0] / testCount).toBeCloseTo(expectVal, 1)
    expect(resArr[2] / testCount).toBeCloseTo(expectVal, 1)
    expect(resArr[5] / testCount).toBeCloseTo(expectVal, 1)
    expect(resArr[10] / testCount).toBeCloseTo(expectVal, 1)
    expect(resArr[15] / testCount).toBeCloseTo(expectVal, 1)
  })
  it('非法参数测试', () => {
    expect(() => randomHexString(0)).toThrow()
    expect(() => randomHexString(-1)).toThrow()
    expect(() => randomHexString(1.23)).toThrow()
    expect(() => randomHexString(NaN)).toThrow()
  })
})
