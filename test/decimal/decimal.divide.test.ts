import { afterEach, describe, expect, it } from 'vitest'
import { ForeNumber } from '../../src/decimal'

/**
 * 记录用例开始前的全局上下文
 */
const defaultContext = ForeNumber.config()

afterEach(() => {
  ForeNumber.config(defaultContext)
})

describe('ForeNumber 除法', () => {
  it('支持受上下文精度控制的除法', () => {
    const previous = ForeNumber.config()
    ForeNumber.config({ divisionPrecision: 20, rounding: 'round' })

    expect(new ForeNumber('1').dividedBy('8').toString()).toBe('0.125')
    expect(new ForeNumber('1').div('3').toString()).toBe('0.33333333333333333333')
    expect(new ForeNumber('123.45').div('2').toString()).toBe('61.725')

    ForeNumber.config({ divisionPrecision: 2, rounding: 'round' })
    expect(new ForeNumber('123.45').div('2').toString()).toBe('61.73')

    ForeNumber.config(previous)
  })

  it('支持负数除法', () => {
    expect(new ForeNumber('-6').div('2').toString()).toBe('-3')
    expect(new ForeNumber('6').div('-2').toString()).toBe('-3')
    expect(new ForeNumber('-6').div('-2').toString()).toBe('3')
    expect(new ForeNumber('-1').div('4').toString()).toBe('-0.25')
    expect(new ForeNumber('1').div('-4').toString()).toBe('-0.25')
  })

  it('支持 banker 舍入模式', () => {
    const previous = ForeNumber.config()
    ForeNumber.config({ divisionPrecision: 0, rounding: 'banker' })

    expect(new ForeNumber('2.5').div('1').toString()).toBe('2')
    expect(new ForeNumber('3.5').div('1').toString()).toBe('4')

    ForeNumber.config(previous)
  })

  it('支持 floor 与 ceil 舍入模式', () => {
    const previous = ForeNumber.config()
    ForeNumber.config({ divisionPrecision: 0, rounding: 'floor' })
    expect(new ForeNumber('2.8').div('1').toString()).toBe('2')
    expect(new ForeNumber('-2.8').div('1').toString()).toBe('-3')

    ForeNumber.config({ divisionPrecision: 0, rounding: 'ceil' })
    expect(new ForeNumber('2.2').div('1').toString()).toBe('3')
    expect(new ForeNumber('-2.2').div('1').toString()).toBe('-2')

    ForeNumber.config(previous)
  })

  it('对算术结果应用全局 precision 量化', () => {
    const previous = ForeNumber.config()
    ForeNumber.config({ precision: 6, divisionPrecision: 24, rounding: 'round' })

    expect(new ForeNumber('12345.6789').plus('0').toString()).toBe('12345.7')
    expect(new ForeNumber('12345.6789').mul('1').toString()).toBe('12345.7')
    expect(new ForeNumber('1').div('3').toString()).toBe('0.333333')

    ForeNumber.config(previous)
  })

  it('在有限小数链式运算中保持严格相等', () => {
    const previous = ForeNumber.config()
    ForeNumber.config({ precision: 30, divisionPrecision: 30, rounding: 'round' })

    const value = new ForeNumber('123456789').div('8').div('125').mul('125').mul('8')
    expect(value.toString()).toBe('123456789')

    ForeNumber.config(previous)
  })

  it('在极端指数差下保持除法量级不丢失', () => {
    const previous = ForeNumber.config()
    ForeNumber.config({ divisionPrecision: 24, rounding: 'round' })

    expect(new ForeNumber('1.234e12').div('2.5e-12').toString()).toBe('493600000000000000000000')
    expect(new ForeNumber('9.876e-12').div('1.234e12').toString()).toBe('0.000000000000000000000008')

    ForeNumber.config(previous)
  })

  it('在除乘链式往返中保持精度', () => {
    const previous = ForeNumber.config()
    ForeNumber.config({ divisionPrecision: 180, rounding: 'round' })

    const value = new ForeNumber('123456789')
      .div('3')
      .div('7')
      .div('13')
      .div('29')
      .mul('13')
      .mul('29')
      .mul('7')
      .mul('3')

    const diff = value.minus('123456789').abs()
    expect(diff.lessThan('1e-150')).toBe(true)

    ForeNumber.config(previous)
  })

  it('在重复链式除法场景下保持数值稳定', () => {
    const previous = ForeNumber.config()
    ForeNumber.config({ divisionPrecision: 220, rounding: 'round' })

    let value = new ForeNumber('123456789')

    for (let i = 0; i < 6; i += 1) {
      value = value.div('3').div('7').div('13').div('29').mul('13').mul('29').mul('7').mul('3')
    }

    const diff = value.minus('123456789').abs()
    expect(diff.lessThan('1e-180')).toBe(true)

    ForeNumber.config(previous)
  })

  it('正确处理 Infinity 除法组合', () => {
    expect(new ForeNumber('Infinity').div('Infinity').toString()).toBe('NaN')
    expect(new ForeNumber('2').div('Infinity').toString()).toBe('0')
    expect(new ForeNumber('Infinity').div('2').toString()).toBe('Infinity')
    expect(new ForeNumber('-Infinity').div('2').toString()).toBe('-Infinity')
    expect(new ForeNumber('2').div('-Infinity').toString()).toBe('0')
  })

  it('正确处理除数为零且被除数为负', () => {
    expect(new ForeNumber('-1').div('0').toString()).toBe('-Infinity')
  })

  it('在除法中正确处理特殊值', () => {
    expect(new ForeNumber('1').div('0').toString()).toBe('Infinity')
    expect(new ForeNumber('0').div('0').toString()).toBe('NaN')
  })
})
