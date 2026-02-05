import { randomize, randomInt } from '../../src/index'

const testCount = 1e4
const testMin = 1
const testMax = 100

describe('randomize', () => {
  it('randomize 不应该影响 Math.random 的结果分布', () => {
    const recoverRandomize = randomize()
    const resArr: number[] = new Array(testMax + 1).fill(0)
    for (let i = 0; i < testCount; i++) {
      resArr[randomInt(testMin, testMax)]++
    }
    expect(resArr[testMin - 1]).toBe(0)
    expect(resArr[testMax] / testCount).toBeCloseTo(1 / (testMax - testMin + 1), 1)
    recoverRandomize()
  })
  it('恢复 Math.random', () => {
    // console.log(Math.random.toString())
    const originMathRandom = Math.random
    const recoverRandomize = randomize()
    expect(Math.random).not.toBe(originMathRandom)
    // console.log(Math.random.toString())
    recoverRandomize()
    // console.log(Math.random.toString())
    expect(Math.random).toBe(originMathRandom)
  })
})
