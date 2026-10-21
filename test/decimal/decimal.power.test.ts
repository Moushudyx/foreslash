import { afterEach, describe, expect, it } from 'vitest'
import { ForeNumber } from '../../src/decimal'

// 仅允许通过 scripts/run-vitest-guarded.mjs 运行
// 否则一旦遇到死循环就会出现 Vitest 无法自行退出的情况

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
    expect(new ForeNumber('10000').pow('2').toString()).toBe('100000000')
    expect(new ForeNumber('1.234e12').pow('2').toString()).toBe('1522756000000000000000000')
    expect(new ForeNumber('-2').pow('3').toString()).toBe('-8')
    expect(new ForeNumber('-2').pow('4').toString()).toBe('16')
    expect(new ForeNumber('-10000').pow('2').toString()).toBe('100000000')
    expect(new ForeNumber('-10000').pow('3').toString()).toBe('-1000000000000')
  })

  it('正确处理底数为 0、±1 的幂', () => {
    expect(new ForeNumber('0').pow('0').toString()).toBe('1')
    expect(new ForeNumber('0').pow('5').toString()).toBe('0')
    expect(new ForeNumber('0').pow('-1').toString()).toBe('Infinity')
    expect(new ForeNumber('0').pow('-2').toString()).toBe('Infinity')
    expect(new ForeNumber('-0').pow('3').toString()).toBe('0')
    expect(new ForeNumber('1').pow('100').toString()).toBe('1')
    expect(new ForeNumber('1').pow('-5').toString()).toBe('1')
    expect(new ForeNumber('1').pow('0.111111115').toString()).toBe('1') // 底数为 1 走快速通道
    expect(new ForeNumber('1').pow('1.111111111').toString()).toBe('1')
    expect(new ForeNumber('1').pow('0').toString()).toBe('1')
    expect(new ForeNumber('-1').pow('2').toString()).toBe('1')
    expect(new ForeNumber('-1').pow('3').toString()).toBe('-1')
    expect(new ForeNumber('-1').pow('-2').toString()).toBe('1')
    expect(new ForeNumber('-1').pow('-3').toString()).toBe('-1')
    expect(new ForeNumber(-1).pow('0').toString()).toBe('1')
  })

  it('正确处理 NaN、±Infinity', () => {
    expect(new ForeNumber('2').pow('NaN').toString()).toBe('NaN')
    expect(new ForeNumber('NaN').pow('2').toString()).toBe('NaN')
    expect(new ForeNumber('NaN').pow('0').toString()).toBe('1')
    expect(new ForeNumber('NaN').pow('NaN').toString()).toBe('NaN')
    expect(new ForeNumber('2').pow('Infinity').toString()).toBe('Infinity')
    expect(new ForeNumber('2').pow('-Infinity').toString()).toBe('0')
    expect(new ForeNumber('Infinity').pow('2').toString()).toBe('Infinity')
    expect(new ForeNumber('Infinity').pow('-2').toString()).toBe('0')
  })

  it('±Infinity 与 NaN 遵循 IEEE 754 pow 规则', () => {
    const p = (base: string, exp: string) => new ForeNumber(base).pow(exp).toString()
    // 指数为 ±Infinity
    expect(p('0.5', 'Infinity')).toBe('0')
    expect(p('0.5', '-Infinity')).toBe('Infinity')
    expect(p('-3', 'Infinity')).toBe('Infinity')
    expect(p('-3', '-Infinity')).toBe('0')
    expect(p('0', 'Infinity')).toBe('0')
    expect(p('0', '-Infinity')).toBe('Infinity')
    expect(p('1', 'Infinity')).toBe('1')
    expect(p('1', '-Infinity')).toBe('1')
    expect(p('1', 'NaN')).toBe('1')
    expect(p('-1', 'Infinity')).toBe('1')
    expect(p('-1', '-Infinity')).toBe('1')
    expect(p('1.5', 'Infinity')).toBe('Infinity')
    expect(p('Infinity', 'Infinity')).toBe('Infinity')
    expect(p('Infinity', '-Infinity')).toBe('0')
    expect(p('-Infinity', 'Infinity')).toBe('Infinity')
    expect(p('-Infinity', '-Infinity')).toBe('0')
    // 底数为 ±Infinity
    expect(p('Infinity', '0')).toBe('1')
    expect(p('-Infinity', '0')).toBe('1')
    expect(p('Infinity', '0.5')).toBe('Infinity')
    expect(p('Infinity', '-0.5')).toBe('0')
    expect(p('-Infinity', '3')).toBe('-Infinity')
    expect(p('-Infinity', '2')).toBe('Infinity')
    expect(p('-Infinity', '-3')).toBe('0')
    expect(p('-Infinity', '-2')).toBe('0')
    expect(p('-Infinity', '0.5')).toBe('Infinity')
    expect(p('-Infinity', '1/2')).toBe('Infinity')
    expect(p('-Infinity', '3/1')).toBe('-Infinity')
    expect(p('-Infinity', '-1/2')).toBe('0')
    expect(p('Infinity', 'NaN')).toBe('NaN')
    expect(p('NaN', 'Infinity')).toBe('NaN')
  })

  it('root / sqrt 处理 NaN、±Infinity', () => {
    expect(new ForeNumber('Infinity').sqrt().toString()).toBe('Infinity')
    expect(new ForeNumber('Infinity').root(3).toString()).toBe('Infinity')
    expect(new ForeNumber('-Infinity').root(3).toString()).toBe('-Infinity')
    expect(new ForeNumber('-Infinity').root(2).toString()).toBe('NaN')
    expect(new ForeNumber('-Infinity').sqrt().toString()).toBe('NaN')
    expect(new ForeNumber('NaN').root(3).toString()).toBe('NaN')
    expect(new ForeNumber('NaN').sqrt().toString()).toBe('NaN')
    expect(() => new ForeNumber('8').root('Infinity')).toThrow()
    expect(() => new ForeNumber('8').root('NaN')).toThrow()
  })

  it('通过 pow 和专用方法支持 n 次根', () => {
    expect(new ForeNumber('9').pow('0.5').toString()).toBe('3')
    expect(new ForeNumber('9').squareRoot().toString()).toBe('3')
    expect(new ForeNumber('9').sqrt().toString()).toBe('3')
    expect(new ForeNumber('123').root(1).toString()).toBe('123')
    expect(new ForeNumber('27').root('3').toString()).toBe('3')
    expect(new ForeNumber('-8').root('3').toString()).toBe('-2')
    expect(new ForeNumber('0').root('3').toString()).toBe('0')
    expect(new ForeNumber('1e1000').root(2).eq('1e500')).toBe(true)
  })

  it('支持有理数指数', () => {
    expect(new ForeNumber('16').pow('0.75').toString()).toBe('8')
    expect(new ForeNumber('16').pow('3/4').toString()).toBe('8')
    expect(new ForeNumber('16').pow('-2/1').toString()).toBe('0.00390625')
    expect(new ForeNumber('4').pow('1.5').toString()).toBe('8')
    expect(new ForeNumber('27').pow('2/3').toString()).toBe('9')
    expect(new ForeNumber('256').pow('0.25').toString()).toBe('4')
    expect(new ForeNumber('9').pow('-1/2').toString()).toBe('0.33333333333333333333333333333333333333333333333333')
    expect(new ForeNumber('12').pow('2/1').toString()).toBe('144') // 分母为 1 的有理数幂应等价于整数幂
    expect(new ForeNumber('12').pow('0/1').toString()).toBe('1') // 分子为 0 的有理数幂应返回 1
    expect(new ForeNumber('-4').sqrt().toString()).toBe('NaN')
    expect(new ForeNumber('-8').pow('1/3').toString()).toBe('-2')
    expect(new ForeNumber('-4').pow('1/2').toString()).toBe('NaN')
    expect(new ForeNumber('-2').pow('3.14').toString()).toBe('NaN')
    expect(new ForeNumber('-27').pow('2/3').toString()).toBe('9')
  })

  it('对非法指数输入给出明确分类', () => {
    const num = () => new ForeNumber('9')
    expect(() => num().pow('9999999999999999999')).toThrow(/仅支持安全整数范围/)
    expect(() => num().pow(BigInt('9007199254740993'))).toThrow(/仅支持安全整数范围/)
    expect(() => num().pow('1/999999999999999')).toThrow(/分母超过/)
    expect(() => num().pow('3/0')).toThrow(/分母不能为 0/)
    expect(() => num().pow('3//4')).toThrow(/分数字符串格式无效/)
    expect(() => num().pow('1/1000000001')).toThrow(/分母超过当前上限 \d+/)
    expect(() => num().pow('9007199254740992/3')).toThrow(/超出安全整数范围/)
    expect(() => num().root('9007199254740993')).toThrow(/degree 必须在安全整数范围内/)
    expect(() => num().root('2.5')).toThrow(/degree 必须是正整数/)
    expect(() => num().root('0')).toThrow(/degree 必须是正整数/)
    expect(() => num().root('-3')).toThrow(/degree 必须是正整数/)
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

    // 组合负幂与大整数幂，验证路径稳定可计算
    const value1 = new ForeNumber('12346789').pow('-12').pow('3').pow('4')
    expect(value1.toString()).not.toBe('NaN')

    // n 次根计算不会无限迭代下去
    const value2 = new ForeNumber('123456789').sqrt()
    expect(value2.toString()).not.toBe('NaN')

    ForeNumber.config(previous)
  })

  it('支持一般实数幂近似计算', () => {
    const previous = ForeNumber.config()
    ForeNumber.config({ powerPrecision: 24, precision: 24, rounding: 'round', realPowerMode: 'approx' })

    expect(new ForeNumber('2').pow('1.1').minus('2.1435469250725863').abs().lessThan('1e-12')).toBe(true)
    expect(new ForeNumber('10').pow('0.5').minus('3.1622776601683795').abs().lessThan('1e-12')).toBe(true)
    expect(new ForeNumber('9').pow('0.125').minus('1.3160740129524924').abs().lessThan('1e-12')).toBe(true)

    ForeNumber.config(previous)
  })

  it('支持在 strict 模式下禁止一般实数幂', () => {
    const previous = ForeNumber.config()
    ForeNumber.config({ realPowerMode: 'strict' })

    // strict 模式仍允许明确可识别的有理数指数
    expect(new ForeNumber('4').pow('1.5').toString()).toBe('8')
    expect(() => new ForeNumber('9').pow('0.1234567')).toThrow(/strict 模式下仅支持整数幂与有理数幂/)

    ForeNumber.config(previous)
  })

  it('可观察区分有理数指数与实数指数', () => {
    const previous = ForeNumber.config()

    // strict 下 可被识别为有理数的指数应继续可用
    ForeNumber.config({ realPowerMode: 'strict', powerPrecision: 24, precision: 24, rounding: 'round' })
    expect(new ForeNumber('8').pow('1/3').toString()).toBe('2')
    expect(new ForeNumber('16').pow('0.0625').minus('1.189207115002721').abs().lessThan('1e-12')).toBe(true)

    // strict 下 进入一般实数路径的指数应被禁止
    expect(() => new ForeNumber('2').pow('0.1234567')).toThrow(/strict 模式下仅支持整数幂与有理数幂/)

    // approx 下 同一实数指数应可计算
    ForeNumber.config({ realPowerMode: 'approx', powerPrecision: 24, precision: 24, rounding: 'round' })
    const approx = new ForeNumber('2').pow('0.1234567')
    expect(approx.isFinite).toBe(true)
    expect(Math.abs(approx.toNumber() - Math.pow(2, 0.1234567))).toBeLessThan(1e-12)

    ForeNumber.config(previous)
  })

  it('在高精度下保持根号迭代稳定', () => {
    const previous = ForeNumber.config()
    ForeNumber.config({ powerPrecision: 80, precision: 90, rounding: 'round' })

    const value = new ForeNumber('2').sqrt()
    const squared = value.mul(value)

    expect(squared.minus('2').abs().lessThan('1e-70')).toBe(true)

    ForeNumber.config(previous)
  })

  it('在重复有理数幂分发场景下保持数值稳定', () => {
    const previous = ForeNumber.config()
    ForeNumber.config({ powerPrecision: 32, precision: 40, rounding: 'round' })

    // 轻量覆盖 显式分数 有限小数 与负有理数路径
    for (let index = 0; index < 6; index += 1) {
      expect(new ForeNumber('81').pow('3/4').toString()).toBe('27')
      expect(new ForeNumber('81').pow('0.75').toString()).toBe('27')
      expect(new ForeNumber('81').pow('-1/2').mul('9').minus('1').abs().lessThan('1e-28')).toBe(true)
    }

    ForeNumber.config(previous)
  })
})
