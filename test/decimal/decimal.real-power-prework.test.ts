import { describe, expect, it } from 'vitest'
import { ForeNumber } from '../../src/decimal'
import { legacyTagFromKind } from '../../src/decimal/core/kind'
import { powerRealStates } from '../../src/decimal/core/realPowerArithmetic'
import { expState, lnState } from '../../src/decimal/core/transcendentalArithmetic'

/**
 * 将内部状态包装为 ForeNumber 实例
 */
function fromState(state: ReturnType<typeof lnState>): ForeNumber {
  return new ForeNumber({
    _s: state._s,
    _e: state._e,
    _d: state._d,
    _t: legacyTagFromKind(state._k)
  })
}

describe('ForeNumber 一般实数幂前置能力', () => {
  it('为 ln 处理精确特殊值与定义域', () => {
    const context = ForeNumber.config()

    expect(fromState(lnState(new ForeNumber('1'), context)).toString()).toBe('0')
    expect(fromState(lnState(new ForeNumber('0'), context)).toString()).toBe('-Infinity')
    expect(fromState(lnState(new ForeNumber('-2'), context)).toString()).toBe('NaN')
    expect(fromState(lnState(new ForeNumber('Infinity'), context)).toString()).toBe('Infinity')

    const large = fromState(lnState(new ForeNumber('1e100'), context))
    expect(large.minus('230.25850929940458').abs().lessThan('1e-10')).toBe(true)

    const ln2 = fromState(lnState(new ForeNumber('2'), context))
    expect(ln2.minus('0.6931471805599453').abs().lessThan('1e-12')).toBe(true)
  })

  it('为 exp 处理精确特殊值', () => {
    const context = ForeNumber.config()

    expect(fromState(expState(new ForeNumber('0'), context)).toString()).toBe('1')
    expect(fromState(expState(new ForeNumber('-Infinity'), context)).toString()).toBe('0')
    expect(fromState(expState(new ForeNumber('Infinity'), context)).toString()).toBe('Infinity')
    expect(fromState(expState(new ForeNumber('NaN'), context)).toString()).toBe('NaN')

    expect(fromState(expState(new ForeNumber('800'), context)).toString()).toBe('Infinity')
    expect(fromState(expState(new ForeNumber('-800'), context)).toString()).toBe('0')

    const exp1 = fromState(expState(new ForeNumber('1'), context))
    expect(exp1.minus('2.718281828459045').abs().lessThan('1e-12')).toBe(true)
  })

  it('在 ln 与 exp 的回环中保持近似稳定', () => {
    const context = ForeNumber.config({ powerPrecision: 28, precision: 28 })

    const source = new ForeNumber('2.5')
    const ln = fromState(lnState(source, context))
    const roundtrip = fromState(expState(ln, context))

    expect(roundtrip.minus(source).abs().lessThan('1e-12')).toBe(true)
  })

  it('在 exp 的 2^n 缩放路径中保持稳定', () => {
    const context = ForeNumber.config({ powerPrecision: 28, precision: 28 })

    const ln2 = fromState(lnState(new ForeNumber('2'), context))
    const x = ln2.mul('100')
    const value = fromState(expState(x, context))

    // 2^100 = 1267650600228229401496703205376
    const exact = new ForeNumber('1267650600228229401496703205376')
    const relativeError = value.div(exact).minus('1').abs()
    expect(relativeError.lessThan('1e-8')).toBe(true)
  })

  it('在重复 ln-exp 回环场景下不会失稳', () => {
    const context = ForeNumber.config({ powerPrecision: 26, precision: 26 })

    let value = new ForeNumber('3.5')
    const startedAt = Date.now()

    for (let index = 0; index < 20; index += 1) {
      value = fromState(expState(fromState(lnState(value, context)), context))
    }

    const elapsed = Date.now() - startedAt
    expect(value.minus('3.5').abs().lessThan('1e-10')).toBe(true)
    expect(elapsed).toBeLessThan(6000)
  }, 12000)

  it('为一般实数幂保留统一的定义域入口', () => {
    const context = ForeNumber.config()

    expect(fromState(powerRealStates(new ForeNumber('1'), new ForeNumber('3.1415926535'), context)).toString()).toBe('1')
    expect(fromState(powerRealStates(new ForeNumber('0'), new ForeNumber('-0.5'), context)).toString()).toBe('Infinity')
    expect(() => powerRealStates(new ForeNumber('-2'), new ForeNumber('1.1'), context)).toThrow(/负数底数暂不支持一般实数幂/)

    const approximated = fromState(powerRealStates(new ForeNumber('2'), new ForeNumber('1.1'), context))
    expect(approximated.minus('2.1435469250725863').abs().lessThan('1e-12')).toBe(true)
  })
})
