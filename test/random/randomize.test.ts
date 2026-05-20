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
  it('setInterval 回调会定期调用 Math.random 增加不可预测性', () => {
    vi.useFakeTimers()
    const originMathRandom = Math.random
    const recover = randomize()

    // 包装被替换后的 Math.random，记录 setInterval 回调触发的调用次数
    let callCount = 0
    const replacedRandom = Math.random
    Math.random = function () {
      callCount++
      return replacedRandom()
    }

    // 重置由 randomize 初始化时可能产生的计数
    callCount = 0

    // 推进 150ms，setInterval 间隔为 50ms，应触发约 3 次回调
    vi.advanceTimersByTime(150)
    expect(callCount).toBeGreaterThanOrEqual(2)

    // 恢复 Math.random
    Math.random = replacedRandom
    recover()
    vi.useRealTimers()
    expect(Math.random).toBe(originMathRandom)
  })

  it('恢复时应清除 setInterval 定时器', () => {
    vi.useFakeTimers()
    const clearIntervalSpy = vi.spyOn(globalThis, 'clearInterval')
    const recover = randomize()
    recover()
    expect(clearIntervalSpy).toHaveBeenCalled()
    clearIntervalSpy.mockRestore()
    vi.useRealTimers()
  })
})
