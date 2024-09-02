import { randomChoice } from '../../src/index'

const testCount = 1e5

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
})
