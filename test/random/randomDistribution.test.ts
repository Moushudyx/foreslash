import { pipe, randomDistribution } from '../../src/index'

const testCount = 5e4

describe('randomChoice', () => {
  it('基本测试', () => {
    // 0.5
    let count = 0
    const T1 = 0.5
    const p1 = pipe(randomDistribution(T1), Number)
    for (let i = 0; i < testCount; i++) {
      count += p1()
    }
    expect(count / testCount).toBeCloseTo(T1, 2)
    // 0.88
    count = 0
    const T2 = 0.88
    const p2 = pipe(randomDistribution(T2), Number)
    for (let i = 0; i < testCount; i++) {
      count += p2()
    }
    expect(count / testCount).toBeCloseTo(T2, 2)
    // 0.12
    count = 0
    const T3 = 0.12
    const p3 = pipe(randomDistribution(T3), Number)
    for (let i = 0; i < testCount; i++) {
      count += p3()
    }
    expect(count / testCount).toBeCloseTo(T3, 2)
  })
  it('高精度测试', () => {
    const threshold = 5e-8
    const hpTestCount = 1e7
    // 0.12345
    let count = 0
    const T1 = 0.12345
    const p1 = pipe(randomDistribution(T1, { threshold }), Number)
    for (let i = 0; i < 10; i++) p1() // 空转几次用于初始化
    for (let i = 0; i < hpTestCount; i++) {
      count += p1()
    }
    expect(count / hpTestCount).toBeCloseTo(T1, 3)
    // 0.54321
    count = 0
    const T2 = 0.54321
    const p2 = pipe(randomDistribution(T2, { threshold }), Number)
    for (let i = 0; i < 10; i++) p2() // 空转几次用于初始化
    for (let i = 0; i < hpTestCount; i++) {
      count += p2()
    }
    expect(count / hpTestCount).toBeCloseTo(T2, 3)
    // 0.98765
    count = 0
    const T3 = 0.98765
    const p3 = pipe(randomDistribution(T3, { threshold }), Number)
    for (let i = 0; i < 10; i++) p3() // 空转几次用于初始化
    for (let i = 0; i < hpTestCount; i++) {
      count += p3()
    }
    expect(count / hpTestCount).toBeCloseTo(T3, 3)
  })
  it('非法参数测试', () => {
    // 1
    let count = 0
    const p1 = pipe(randomDistribution(1.5), Number)
    for (let i = 0; i < testCount; i++) {
      count += p1()
    }
    expect(count).toBe(testCount)
    // 0
    count = 0
    const p2 = pipe(randomDistribution(-1), Number)
    for (let i = 0; i < testCount; i++) {
      count += p2()
    }
    expect(count).toBe(0)
  })
})
