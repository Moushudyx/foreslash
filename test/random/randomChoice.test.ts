import { randomChoice } from '../../src/index'

const testCount = 1e4

describe('randomChoice', () => {
  it('数组测试', () => {
    const resMap = { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0 }
    const testArr = ['a', 'b', 'c', 'd', 'e', 'f'] as const
    for (let i = 0; i < testCount; i++) {
      const res = randomChoice(testArr)
      resMap[res]++
    }
    expect(resMap.a / testCount).toBeCloseTo(1 / testArr.length, 1)
    expect(resMap.b / testCount).toBeCloseTo(1 / testArr.length, 1)
    expect(resMap.f / testCount).toBeCloseTo(1 / testArr.length, 1)
  })
  it('类数组测试', () => {
    const resMap = { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0 }
    const testArr = { 0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', 5: 'f', awa: 'qwq', foo: 'bar', length: 6 } as const
    for (let i = 0; i < testCount; i++) {
      const res = randomChoice(testArr)
      resMap[res]++
    }
    expect(resMap.a / testCount).toBeCloseTo(1 / testArr.length, 1)
    expect(resMap.c / testCount).toBeCloseTo(1 / testArr.length, 1)
    expect(resMap.f / testCount).toBeCloseTo(1 / testArr.length, 1)
  })
  it('权重测试', () => {
    const resMap = { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0 }
    const testArr = ['a', 'b', 'c', 'd', 'e', 'f'] as const
    const weight = [1, 2, 3, 4, 5, 6]
    for (let i = 0; i < testCount; i++) {
      const res = randomChoice(testArr, weight)
      resMap[res]++
    }
    expect(resMap.a / testCount).toBeCloseTo(1 / 21, 1)
    expect(resMap.b / testCount).toBeCloseTo(2 / 21, 1)
    expect(resMap.c / testCount).toBeCloseTo(3 / 21, 1)
    expect(resMap.d / testCount).toBeCloseTo(4 / 21, 1)
    expect(resMap.e / testCount).toBeCloseTo(5 / 21, 1)
    expect(resMap.f / testCount).toBeCloseTo(6 / 21, 1)
  })
  it('权重+类数组测试', () => {
    const resMap = { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0 }
    const testArr = ['a', 'b', 'c', 'd', 'e', 'f', 'g'] as const
    const weight = { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: NaN, awa: 'qwq', foo: 'bar', length: 7 }
    for (let i = 0; i < testCount; i++) {
      const res = randomChoice(testArr, weight)
      resMap[res]++
    }
    expect(resMap.a / testCount).toBeCloseTo(1 / 21, 1)
    expect(resMap.b / testCount).toBeCloseTo(2 / 21, 1)
    expect(resMap.c / testCount).toBeCloseTo(3 / 21, 1)
    expect(resMap.d / testCount).toBeCloseTo(4 / 21, 1)
    expect(resMap.e / testCount).toBeCloseTo(5 / 21, 1)
    expect(resMap.f / testCount).toBeCloseTo(6 / 21, 1)
    expect(resMap.g).toBe(0)
  })
})
