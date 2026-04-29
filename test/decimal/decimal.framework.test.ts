import { describe, expect, it } from 'vitest'
import { ForeNumber } from '../../src/decimal'

describe('ForeNumber 框架基础', () => {
  it('能够解析有限小数与 bigint 输入', () => {
    expect(new ForeNumber('123.45').toString()).toBe('123.45')
    expect(new ForeNumber(BigInt('90071992547409931234')).toString()).toBe('90071992547409931234')
  })

  it('能够解析负数与零', () => {
    expect(new ForeNumber('-123.45').toString()).toBe('-123.45')
    expect(new ForeNumber('0').toString()).toBe('0')
    expect(new ForeNumber('-0').toString()).toBe('0')
    expect(new ForeNumber('0.0').toString()).toBe('0')
    expect(new ForeNumber('-0.0').toString()).toBe('0')
  })

  it('能够解析科学计数法', () => {
    expect(new ForeNumber('1.23e4').toString()).toBe('12300')
    expect(new ForeNumber('1.23e-4').toString()).toBe('0.000123')
    expect(new ForeNumber('-5.67e3').toString()).toBe('-5670')
  })

  it('保持特殊值语义', () => {
    expect(new ForeNumber(Number.NaN).isNaN).toBe(true)
    expect(new ForeNumber(Number.POSITIVE_INFINITY).toString()).toBe('Infinity')
    expect(new ForeNumber(Number.NEGATIVE_INFINITY).toString()).toBe('-Infinity')
    expect(new ForeNumber('NaN').isNaN).toBe(true)
    expect(new ForeNumber('Infinity').toString()).toBe('Infinity')
    expect(new ForeNumber('-Infinity').toString()).toBe('-Infinity')
  })

  it('静态方法 isNaN 正确工作', () => {
    expect(ForeNumber.isNaN('NaN')).toBe(true)
    expect(ForeNumber.isNaN(Number.NaN)).toBe(true)
    expect(ForeNumber.isNaN('123')).toBe(false)
    expect(ForeNumber.isNaN('Infinity')).toBe(false)
  })

  it('静态方法 isFinite 正确工作', () => {
    expect(ForeNumber.isFinite('123.45')).toBe(true)
    expect(ForeNumber.isFinite('0')).toBe(true)
    expect(ForeNumber.isFinite('NaN')).toBe(false)
    expect(ForeNumber.isFinite('Infinity')).toBe(false)
    expect(ForeNumber.isFinite('-Infinity')).toBe(false)
  })

  it('静态方法 isInteger 正确工作', () => {
    expect(ForeNumber.isInteger('42')).toBe(true)
    expect(ForeNumber.isInteger('-7')).toBe(true)
    expect(ForeNumber.isInteger('0')).toBe(true)
    expect(ForeNumber.isInteger('3.14')).toBe(false)
    expect(ForeNumber.isInteger('NaN')).toBe(false)
    expect(ForeNumber.isInteger('Infinity')).toBe(false)
  })

  it('静态常量 pi 和 e 可用', () => {
    expect(ForeNumber.pi.isFinite).toBe(true)
    expect(ForeNumber.e.isFinite).toBe(true)
    expect(ForeNumber.pi.toString().startsWith('3.141592653589793')).toBe(true)
    expect(ForeNumber.e.toString().startsWith('2.718281828459045')).toBe(true)
  })

  it('支持静态上下文配置', () => {
    const previous = ForeNumber.config()
    const next = ForeNumber.config({ divisionPrecision: 64, powerPrecision: 80, realPowerMode: 'strict' })
    expect(next.divisionPrecision).toBe(64)
    expect(next.powerPrecision).toBe(80)
    expect(next.realPowerMode).toBe('strict')
    ForeNumber.config(previous)
  })

  it('取反和绝对值方法正确工作', () => {
    expect(new ForeNumber('5').negated().toString()).toBe('-5')
    expect(new ForeNumber('-5').neg().toString()).toBe('5')
    expect(new ForeNumber('0').neg().toString()).toBe('0')
    expect(new ForeNumber('-3.14').abs().toString()).toBe('3.14')
    expect(new ForeNumber('3.14').absoluteValue().toString()).toBe('3.14')
    expect(new ForeNumber('Infinity').neg().toString()).toBe('-Infinity')
    expect(new ForeNumber('-Infinity').abs().toString()).toBe('Infinity')
  })

  it('toNumber 转换正确工作', () => {
    expect(new ForeNumber('3.14').toNumber()).toBe(3.14)
    expect(new ForeNumber('-7.5').toNumber()).toBe(-7.5)
    expect(new ForeNumber('Infinity').toNumber()).toBe(Infinity)
    expect(Number.isNaN(new ForeNumber('NaN').toNumber())).toBe(true)
  })

  it('仅为未完成功能保留显式占位', () => {
    const n = new ForeNumber('1.25')
    expect(n.plus('2').toString()).toBe('3.25')
    expect(n.mod('2').toString()).toBe('1.25')
    expect(() => n.toBinary(10)).toThrow(/尚未实现/)
  })
})
