import { randomInt, randomIntFloor } from '../../src/index'

const testCount = 1e5
const testMin = 1
const testMax = 100

describe('randomInt', () => {
  it('大数测试', () => {
    const resArr: number[] = new Array(testMax + 1).fill(0)
    for (let i = 0; i < testCount; i++) {
      resArr[randomInt(testMin, testMax)]++
    }
    expect(resArr[testMin - 1]).toBe(0)
    expect(resArr[testMax] / testCount).toBeCloseTo(1 / (testMax - testMin + 1), 1)
  })
})

describe('randomIntFloor', () => {
  it('大数测试', () => {
    const resArr: number[] = new Array(testMax + 1).fill(0)
    for (let i = 0; i < testCount; i++) {
      resArr[randomIntFloor(testMin, testMax)]++
    }
    expect(resArr[testMin - 1]).toBe(0)
    expect(resArr[testMax]).toBe(0)
    expect(resArr[testMax - 1] / testCount).toBeCloseTo(1 / (testMax - testMin), 1)
  })
})
