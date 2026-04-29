import { afterEach, describe, expect, it } from 'vitest'
import { ForeNumber } from '../../src/decimal'
import { normalizeState } from '../../src/decimal/core/normalize'
import { parseInput } from '../../src/decimal/core/parse'
import { quantizeStateByPrecision } from '../../src/decimal/core/stateArithmetic'
import {
  createSpecialState,
  isZeroState,
  isOneState,
  isIntegerState,
  zeroState,
  oneState,
  negateState,
  absState,
  signOfState,
  statesEqual,
  decimalDigitLength
} from '../../src/decimal/core/utils'
import { addDigits, subtractDigits, divideDigits, multiplyDigits, isZeroDigits, compareDigits } from '../../src/decimal/core/limbMath'
import { compare } from '../../src/decimal/core/compare'
import { DEFAULT_CONTEXT } from '../../src/decimal/core/constants'

const defaultContext = ForeNumber.config()
afterEach(() => ForeNumber.config(defaultContext))

// ═══════════════════ 特殊值完整组合 ═══════════════════

describe('特殊值运算组合', () => {
  const inf = () => new ForeNumber('Infinity')
  const ninf = () => new ForeNumber('-Infinity')
  const nan = () => new ForeNumber('NaN')
  const n = (v: string) => new ForeNumber(v)

  it('Infinity ± Infinity 和 ±(-Infinity)', () => {
    expect(inf().plus('Infinity').toString()).toBe('Infinity')
    expect(inf().minus('Infinity').toString()).toBe('NaN')
    expect(ninf().plus('-Infinity').toString()).toBe('-Infinity')
    expect(ninf().minus('-Infinity').toString()).toBe('NaN')
  })

  it('Infinity × ÷ 特殊组合', () => {
    expect(inf().mul('0').toString()).toBe('NaN')
    expect(ninf().mul('0').toString()).toBe('NaN')
    expect(inf().div('Infinity').toString()).toBe('NaN')
    expect(ninf().div('-Infinity').toString()).toBe('NaN')
    expect(ninf().div('Infinity').toString()).toBe('NaN')
    expect(n('-1').div('0').toString()).toBe('-Infinity')
  })

  it('Infinity 取模组合', () => {
    expect(inf().mod('Infinity').toString()).toBe('NaN')
    expect(ninf().mod('-Infinity').toString()).toBe('NaN')
    expect(ninf().mod('3').toString()).toBe('NaN')
    expect(n('3').mod('-Infinity').toString()).toBe('3')
  })

  it('Infinity 幂运算组合', () => {
    expect(ninf().pow('2').toString()).toBe('Infinity')
    expect(ninf().pow('3').toString()).toBe('-Infinity')
    expect(inf().pow('0').toString()).toBe('1')
    expect(n('1').pow('999').toString()).toBe('1')
    expect(n('-1').pow('0.5').toString()).toBe('NaN')
  })

  it('幂运算非法 root 参数', () => {
    expect(() => n('9').root('0')).toThrow(/degree 必须是正整数/)
    expect(() => n('9').root('-3')).toThrow(/degree 必须是正整数/)
  })

  it('0 的幂边界', () => {
    expect(n('0').pow('0').toString()).toBe('1')
    expect(n('-0').pow('0').toString()).toBe('1')
    expect(n('-0').pow('3').toString()).toBe('0')
  })

  it('NaN 传播覆盖所有运算符', () => {
    const ops = ['plus', 'minus', 'multiply', 'dividedBy', 'modulo'] as const
    for (const op of ops) {
      expect(nan()[op]('3').toString()).toBe('NaN')
      expect(n('3')[op]('NaN').toString()).toBe('NaN')
    }
  })
})

// ═══════════════════ 比较 NaN 排序 ═══════════════════

describe('比较 NaN 排序一致性', () => {
  it('compare 内部 NaN 排序: -inf < normal < inf < nan', () => {
    const a = new ForeNumber('-Infinity')
    const b = new ForeNumber('0')
    const c = new ForeNumber('Infinity')
    const d = new ForeNumber('NaN')

    expect(compare(a, b)).toBe(-1)
    expect(compare(b, c)).toBe(-1)
    expect(compare(c, d)).toBe(-1)
    expect(compare(d, a)).toBe(1)
  })

  it('0 和 -0 在所有比较运算符下等价', () => {
    expect(new ForeNumber('0').eq('-0')).toBe(true)
    expect(new ForeNumber('0').gt('-0')).toBe(false)
    expect(new ForeNumber('0').lt('-0')).toBe(false)
    expect(new ForeNumber('0').gte('-0')).toBe(true)
    expect(new ForeNumber('0').lte('-0')).toBe(true)
  })
})

// ═══════════════════ quantizeStateByPrecision ═══════════════════

describe('quantizeStateByPrecision', () => {
  it('不改变已满足精度的状态', () => {
    const s = parseInput('123')
    const ctx = { ...DEFAULT_CONTEXT, precision: 10, rounding: 'round' as const }
    expect(statesEqual(quantizeStateByPrecision(s, ctx), s)).toBe(true)
  })

  it('向下截断时保持数量级不变', () => {
    ForeNumber.config({ precision: 3, rounding: 'round' })
    // 12345 → 3位有效数字 → 12300
    expect(new ForeNumber('12345').plus('0').toString()).toBe('12300')
  })

  it('小数的精度截断', () => {
    ForeNumber.config({ precision: 4, rounding: 'round' })
    // 0.00123456 → 4位有效数字 → 0.001235
    const r = new ForeNumber('0.00123456').mul('1').toString()
    expect(r).toBe('0.001235')
  })

  it('负数的精度截断与舍入方向', () => {
    ForeNumber.config({ precision: 3, rounding: 'round' })
    expect(new ForeNumber('-12345').plus('0').toString()).toBe('-12300')
    expect(new ForeNumber('-12350').plus('0').toString()).toBe('-12400')
  })

  it('大数的精度截断', () => {
    ForeNumber.config({ precision: 5, rounding: 'round' })
    // 9.87654321e20 = 987654321000000000000 (21 位), 截到 5 位有效数字 → 9.8765e20
    expect(new ForeNumber('9.87654321e20').mul('1').toString()).toBe('987650000000000000000')
  })

  it('精度截断后结果为零的情况', () => {
    ForeNumber.config({ precision: 2, rounding: 'floor' })
    // 0.001234 → 2位有效数字 floor → 0.0012
    expect(new ForeNumber('0.001234').mul('1').toString()).toBe('0.0012')
  })
})

// ═══════════════════ 除法舍入边界 ═══════════════════

describe('除法舍入边界', () => {
  it('ceil 模式小数向上取整', () => {
    ForeNumber.config({ divisionPrecision: 0, rounding: 'ceil' })
    expect(new ForeNumber('0.001').div('1').toString()).toBe('1')
  })

  it('floor 模式负数向下取整', () => {
    ForeNumber.config({ divisionPrecision: 0, rounding: 'floor' })
    expect(new ForeNumber('-0.001').div('1').toString()).toBe('-1')
  })

  it('banker 奇进偶不进', () => {
    ForeNumber.config({ divisionPrecision: 0, rounding: 'banker' })
    expect(new ForeNumber('1.5').div('1').toString()).toBe('2')
    expect(new ForeNumber('2.5').div('1').toString()).toBe('2')
  })
})

// ═══════════════════ 取模符号边界 ═══════════════════

describe('取模符号边界', () => {
  it('余数符号跟随被除数', () => {
    expect(new ForeNumber('-10.5').mod('-0.2').toString()).toBe('-0.1')
    expect(new ForeNumber('-10.5').mod('0.2').toString()).toBe('-0.1')
  })
})

// ═══════════════════ 输入解析边界 ═══════════════════

describe('输入解析边界', () => {
  it('baseForeNumber 对象正确解析', () => {
    const v = new ForeNumber({ _s: 1, _e: 0, _d: [5], _t: 1 })
    expect(v.toString()).toBe('5')
  })

  it('ForeNumber 实例作为构造入参', () => {
    const a = new ForeNumber('3.14')
    const b = new ForeNumber(a)
    expect(b.toString()).toBe('3.14')
    expect(b.eq(a)).toBe(true)
  })

  it('非法字符串返回 NaN', () => {
    expect(new ForeNumber('abc').isNaN).toBe(true)
    expect(new ForeNumber('').isNaN).toBe(true)
  })

  it('超长科学计数法不崩溃', () => {
    // 极大指数可能超出 Number 范围，但不应崩溃
    expect(() => new ForeNumber('1e99999')).not.toThrow()
  })

  it('正号前缀正确处理', () => {
    expect(new ForeNumber('+123').toString()).toBe('123')
    expect(new ForeNumber('+Infinity').toString()).toBe('Infinity')
  })

  it('isInteger 边界', () => {
    expect(new ForeNumber('1.0000').isInteger).toBe(true)
    expect(new ForeNumber('9007199254740993').isInteger).toBe(true)
    expect(new ForeNumber('3.00000000000000000001').isInteger).toBe(false)
  })

  it('静态方法覆盖 -Infinity', () => {
    expect(ForeNumber.isFinite('-Infinity')).toBe(false)
    expect(ForeNumber.isInteger('-Infinity')).toBe(false)
    expect(ForeNumber.isNaN('-Infinity')).toBe(false)
  })
})

// ═══════════════════ 输出能力 ═══════════════════

describe('输出能力', () => {
  it('toJSON 处理特殊值', () => {
    expect(new ForeNumber('NaN').toJSON()).toBe('NaN')
    expect(new ForeNumber('Infinity').toJSON()).toBe('Infinity')
  })

  it('toExponential 带精度参数', () => {
    const r = new ForeNumber('12345.6789').toExponential(2)
    expect(r).toMatch(/^1\.23e\+?4$/)
  })

  it('rounded 占位方法不改变值', () => {
    const v = new ForeNumber('3.14159')
    expect(v.rounded(2).toString()).toBe('3.14159')
    expect(v.round(5, 'ceil').toString()).toBe('3.14159')
  })
})

// ═══════════════════ normalizeState ═══════════════════

describe('normalizeState', () => {
  it('移除前导零 limb', () => {
    const r = normalizeState({ _s: 1, _e: 0, _d: [0, 0, 5], _k: 'normal' })
    expect(r._d).toEqual([5])
    expect(r._e).toBe(0)
  })

  it('移除尾随零 limb 并提升指数', () => {
    const r = normalizeState({ _s: 1, _e: -2, _d: [1, 0, 0], _k: 'normal' })
    expect(r._d).toEqual([1])
    expect(r._e).toBe(0)
  })

  it('全零 limb 收敛为单一零状态', () => {
    const r = normalizeState({ _s: 0, _e: 5, _d: [0, 0, 0], _k: 'normal' })
    expect(r._s).toBe(0)
    expect(r._d).toEqual([0])
    expect(r._e).toBe(0)
  })

  it('负数符号不改变绝对值规范化', () => {
    const r = normalizeState({ _s: -1, _e: -1, _d: [0, 0, 123, 0, 0], _k: 'normal' })
    expect(r._s).toBe(-1)
    expect(r._d).toEqual([123])
    expect(r._e).toBe(1)
  })
})

// ═══════════════════ limbMath ═══════════════════

describe('limbMath 核心算法', () => {
  it('addDigits 带进位', () => {
    expect(addDigits([9999], [1])).toEqual([1, 0])
    expect(addDigits([5000, 5000], [5000, 5000])).toEqual([1, 1, 0])
  })

  it('subtractDigits 带借位', () => {
    // [1,0,0] = 100000000, [1] = 1 → 99999999 = [9999, 9999]
    expect(subtractDigits([1, 0, 0], [1])).toEqual([9999, 9999])
    // [1,0] = 10000, [1] = 1 → 9999 = [9999]
    expect(subtractDigits([1, 0], [1])).toEqual([9999])
  })

  it('multiplyDigits 不同长度', () => {
    // [1000] * [10] = 10000 = [1, 0]
    expect(multiplyDigits([1000], [10])).toEqual([1, 0])
    // 99999999 * 2 = 199999998 = [1, 9999, 9998]
    expect(multiplyDigits([9999, 9999], [2])).toEqual([1, 9999, 9998])
  })

  it('divideDigits 精确除尽', () => {
    // [1,0,0] = 100000000, [10] = 10 → 10000000 = [1000, 0], 余 0
    const { quotient, remainder } = divideDigits([1, 0, 0], [10])
    expect(quotient).toEqual([1000, 0])
    expect(isZeroDigits(remainder)).toBe(true)
  })

  it('compareDigits 边界', () => {
    expect(compareDigits([0, 5], [5])).toBe(0) // 前导零不影响
    expect(compareDigits([0], [0])).toBe(0)
  })
})

// ═══════════════════ shared utils ═══════════════════

describe('shared utils', () => {
  it('signOfState 处理所有 kind', () => {
    expect(signOfState(zeroState())).toBe(0)
    expect(signOfState(oneState())).toBe(1)
    expect(signOfState(createSpecialState('inf'))).toBe(1)
    expect(signOfState(createSpecialState('-inf'))).toBe(-1)
    expect(signOfState(createSpecialState('nan'))).toBe(0)
  })

  it('isZeroState / isOneState', () => {
    expect(isZeroState(zeroState())).toBe(true)
    expect(isZeroState(oneState())).toBe(false)
    expect(isOneState(oneState())).toBe(true)
    expect(isOneState(zeroState())).toBe(false)
  })

  it('isIntegerState 各种场景', () => {
    expect(isIntegerState(parseInput('42'))).toBe(true)
    expect(isIntegerState(parseInput('-7'))).toBe(true)
    expect(isIntegerState(parseInput('3.14'))).toBe(false)
    expect(isIntegerState(createSpecialState('nan'))).toBe(false)
    expect(isIntegerState(createSpecialState('inf'))).toBe(false)
  })

  it('absState 处理特殊值', () => {
    expect(absState(createSpecialState('nan'))._k).toBe('nan')
    expect(absState(createSpecialState('-inf'))._k).toBe('-inf')
    const neg = parseInput('-3.14')
    expect(absState(neg)._s).toBe(1)
  })

  it('negateState 零/inf/nan', () => {
    expect(negateState(zeroState())._s).toBe(0)
    expect(negateState(createSpecialState('inf'))._k).toBe('-inf')
    expect(negateState(createSpecialState('-inf'))._k).toBe('inf')
    expect(negateState(createSpecialState('nan'))._k).toBe('nan')
  })

  it('decimalDigitLength', () => {
    expect(decimalDigitLength([1234, 5678])).toBe(8)
    expect(decimalDigitLength([5])).toBe(1)
    expect(decimalDigitLength([0])).toBe(1)
  })

  it('statesEqual 区分细微差异', () => {
    const a = parseInput('1.5')
    const b = parseInput('1.50')
    expect(statesEqual(a, b)).toBe(true)
    expect(statesEqual(a, parseInput('1.500'))).toBe(true)
  })
})

// ═══════════════════ 链式运算稳定性 ═══════════════════

describe('链式运算', () => {
  it('加减链式保持精度', () => {
    ForeNumber.config({ precision: 50 })
    const v = new ForeNumber('1').plus('0.2').minus('0.1').plus('0.3')
    expect(v.toString()).toBe('1.4')
  })

  it('乘除回环保持精度', () => {
    ForeNumber.config({ precision: 50, divisionPrecision: 50, rounding: 'round' })
    const v = new ForeNumber('12345').mul('6789').div('6789')
    expect(v.toString()).toBe('12345')
  })
})
