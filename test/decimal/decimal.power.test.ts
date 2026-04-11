import { afterEach, describe, expect, it } from 'vitest'
import { ForeNumber } from '../../src/decimal'

/**
 * 记录用例开始前的全局上下文
 */
const defaultContext = ForeNumber.config()

afterEach(() => {
  ForeNumber.config(defaultContext)
})

describe('ForeNumber 幂运算', () => {
  it('支持整数幂与别名方法', () => {
    expect(new ForeNumber('2').power('10').toString()).toBe('1024')
    expect(new ForeNumber('2').pow('10').toString()).toBe('1024')
    expect(new ForeNumber('-2').pow('3').toString()).toBe('-8')
    expect(new ForeNumber('-2').pow('4').toString()).toBe('16')
    expect(new ForeNumber('1.234e12').pow('2').toString()).toBe('1522756000000000000000000')
  })

  it('支持受 powerPrecision 控制的负整数幂', () => {
    const previous = ForeNumber.config()
    ForeNumber.config({ powerPrecision: 16, rounding: 'round' })

    expect(new ForeNumber('2').pow('-3').toString()).toBe('0.125')
    expect(new ForeNumber('3').pow('-2').toString()).toBe('0.1111111111111111')

    ForeNumber.config(previous)
  })

  it('在极端链式幂场景下不会卡住', () => {
    const previous = ForeNumber.config()
    ForeNumber.config({ powerPrecision: 260, rounding: 'round' })

    // 组合负幂与大整数幂 确认快速幂路径不会失控
    const startedAt = Date.now()
    const value = new ForeNumber('12346789').pow('-12').pow('3').pow('4')
    const elapsed = Date.now() - startedAt

    expect(value.toString()).not.toBe('NaN')
    expect(elapsed).toBeLessThan(6000)

    ForeNumber.config(previous)
  }, 12000)

  it('在幂运算中正确处理特殊值', () => {
    expect(new ForeNumber('Infinity').pow('2').toString()).toBe('Infinity')
    expect(new ForeNumber('Infinity').pow('-1').toString()).toBe('0')
    expect(new ForeNumber('0').pow('-1').toString()).toBe('Infinity')
    expect(new ForeNumber('NaN').pow('0').toString()).toBe('1')
  })

  it('通过 pow 和专用方法支持 1/n 根', () => {
    expect(new ForeNumber('9').pow('0.5').toString()).toBe('3')
    expect(new ForeNumber('9').squareRoot().toString()).toBe('3')
    expect(new ForeNumber('9').sqrt().toString()).toBe('3')
    expect(new ForeNumber('27').root('3').toString()).toBe('3')
    expect(new ForeNumber('-8').root('3').toString()).toBe('-2')
  })

  it('支持有理数指数并拒绝非法根域', () => {
    expect(new ForeNumber('16').pow('0.75').toString()).toBe('8')
    expect(new ForeNumber('16').pow('3/4').toString()).toBe('8')
    expect(new ForeNumber('16').pow('-2/1').toString()).toBe('0.00390625')
    expect(new ForeNumber('4').pow('1.5').toString()).toBe('8')
    expect(new ForeNumber('27').pow('2/3').toString()).toBe('9')
    expect(new ForeNumber('256').pow('0.25').toString()).toBe('4')
    expect(new ForeNumber('9').pow('-1/2').toString()).toBe('0.33333333333333333333333333333333333333333333333333')
    expect(new ForeNumber('-4').sqrt().toString()).toBe('NaN')
    expect(new ForeNumber('-8').pow('1/3').toString()).toBe('-2')
    expect(() => new ForeNumber('9').root('2.5')).toThrow(/degree 必须是正整数/)
  })

  it('对非法有理数指数输入给出明确分类', () => {
    expect(() => new ForeNumber('9').pow('3/0')).toThrow(/分母不能为 0/)
    expect(() => new ForeNumber('9').pow('3//4')).toThrow(/分数字符串格式无效/)
    expect(() => new ForeNumber('9').pow('1/1000000001')).toThrow(/分母超过当前上限 \d+/)
    expect(() => new ForeNumber('9').pow('9007199254740992/3')).toThrow(/超出安全整数范围/)
  })

  it('支持一般实数幂近似计算', () => {
    const previous = ForeNumber.config()
    ForeNumber.config({ powerPrecision: 24, precision: 24, rounding: 'round', realPowerMode: 'approx' })

    expect(new ForeNumber('2').pow('1.1').minus('2.1435469250725863').abs().lessThan('1e-12')).toBe(true)
    expect(new ForeNumber('10').pow('0.5').minus('3.1622776601683795').abs().lessThan('1e-12')).toBe(true)
    expect(new ForeNumber('9').pow('0.123456789123456789').isFinite).toBe(true)

    ForeNumber.config(previous)
  })

  it('支持在 strict 模式下禁止一般实数幂', () => {
    const previous = ForeNumber.config()
    ForeNumber.config({ realPowerMode: 'strict' })

    expect(new ForeNumber('2').pow('1.1').minus('2.1435469250725863').abs().lessThan('1e-12')).toBe(true)
    expect(() => new ForeNumber('9').pow('0.1234567')).toThrow(/strict 模式下仅支持整数幂与有理数幂/)

    ForeNumber.config(previous)
  })

  it('在高精度下保持根号迭代稳定', () => {
    const previous = ForeNumber.config()
    ForeNumber.config({ powerPrecision: 80, precision: 90, rounding: 'round' })

    const startedAt = Date.now()
    const value = new ForeNumber('2').sqrt()
    const squared = value.mul(value)
    const elapsed = Date.now() - startedAt

    expect(squared.minus('2').abs().lessThan('1e-70')).toBe(true)
    expect(elapsed).toBeLessThan(6000)

    ForeNumber.config(previous)
  }, 12000)

  it('在重复有理数幂分发场景下满足性能预算', () => {
    const previous = ForeNumber.config()
    ForeNumber.config({ powerPrecision: 48, precision: 56, rounding: 'round' })

    // 连续覆盖 显式分数 有限小数 与负有理数路径
    const startedAt = Date.now()
    for (let index = 0; index < 24; index += 1) {
      expect(new ForeNumber('81').pow('3/4').toString()).toBe('27')
      expect(new ForeNumber('81').pow('0.75').toString()).toBe('27')
      expect(new ForeNumber('81').pow('-1/2').mul('9').minus('1').abs().lessThan('1e-45')).toBe(true)
    }
    const elapsed = Date.now() - startedAt

    expect(elapsed).toBeLessThan(6000)

    ForeNumber.config(previous)
  }, 12000)
})
