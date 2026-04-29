import { afterEach, describe, expect, it } from 'vitest'
import { ForeNumber } from '../../src/decimal'

const defaultContext = ForeNumber.config()

afterEach(() => {
  ForeNumber.config(defaultContext)
})

describe('ForeNumber 比较运算', () => {
  describe('相等比较 (equals / equalTo / eq)', () => {
    it('判断相同数值为相等', () => {
      expect(new ForeNumber('0.1').plus('0.2').equals('0.3')).toBe(true)
      expect(new ForeNumber('0.1').plus('0.2').equalTo('0.3')).toBe(true)
      expect(new ForeNumber('0.1').plus('0.2').eq('0.3')).toBe(true)
    })

    it('判断不同数值为不等', () => {
      expect(new ForeNumber('5').equals('6')).toBe(false)
      expect(new ForeNumber('5').equalTo('6')).toBe(false)
      expect(new ForeNumber('5').eq('6')).toBe(false)
    })

    it('正确处理负数相等', () => {
      expect(new ForeNumber('-5').eq('-5')).toBe(true)
      expect(new ForeNumber('-5').eq('5')).toBe(false)
      expect(new ForeNumber('-0.1').plus('-0.2').eq('-0.3')).toBe(true)
    })

    it('正确处理零', () => {
      expect(new ForeNumber('0').eq('0')).toBe(true)
      expect(new ForeNumber('0').eq('-0')).toBe(true)
      expect(new ForeNumber('0.0').eq('0')).toBe(true)
    })

    it('NaN 与任何值（含自身）比较均返回 false', () => {
      expect(new ForeNumber('NaN').eq('NaN')).toBe(false)
      expect(new ForeNumber('NaN').eq('1')).toBe(false)
      expect(new ForeNumber('1').eq('NaN')).toBe(false)
    })

    it('正确处理 Infinity 相等', () => {
      expect(new ForeNumber('Infinity').eq('Infinity')).toBe(true)
      expect(new ForeNumber('-Infinity').eq('-Infinity')).toBe(true)
      expect(new ForeNumber('Infinity').eq('-Infinity')).toBe(false)
      expect(new ForeNumber('Infinity').eq('1e1000')).toBe(false)
    })
  })

  describe('大于比较 (greaterThan / gt)', () => {
    it('基本大于比较', () => {
      expect(new ForeNumber('10').gt('3')).toBe(true)
      expect(new ForeNumber('10').greaterThan('3')).toBe(true)
      expect(new ForeNumber('3').gt('10')).toBe(false)
    })

    it('正确处理负数大于比较', () => {
      expect(new ForeNumber('-3').gt('-10')).toBe(true)
      expect(new ForeNumber('-5').gt('5')).toBe(false)
      expect(new ForeNumber('5').gt('-5')).toBe(true)
    })

    it('正确处理小数大于比较', () => {
      expect(new ForeNumber('0.3').gt('0.2')).toBe(true)
      expect(new ForeNumber('0.1').plus('0.2').gt('0.3')).toBe(false)
    })

    it('正确处理特殊值大于比较', () => {
      expect(new ForeNumber('Infinity').gt('1e1000')).toBe(true)
      expect(new ForeNumber('1').gt('-Infinity')).toBe(true)
      expect(new ForeNumber('-Infinity').gt('Infinity')).toBe(false)
      expect(new ForeNumber('NaN').gt('1')).toBe(false)
      expect(new ForeNumber('1').gt('NaN')).toBe(false)
    })
  })

  describe('小于比较 (lessThan / lt)', () => {
    it('基本小于比较', () => {
      expect(new ForeNumber('3').lt('10')).toBe(true)
      expect(new ForeNumber('3').lessThan('10')).toBe(true)
      expect(new ForeNumber('10').lt('3')).toBe(false)
    })

    it('正确处理负数小于比较', () => {
      expect(new ForeNumber('-10').lt('-3')).toBe(true)
      expect(new ForeNumber('5').lt('-5')).toBe(false)
      expect(new ForeNumber('-5').lt('5')).toBe(true)
    })

    it('正确处理特殊值小于比较', () => {
      expect(new ForeNumber('1e1000').lt('Infinity')).toBe(true)
      expect(new ForeNumber('-Infinity').lt('1')).toBe(true)
      expect(new ForeNumber('Infinity').lt('-Infinity')).toBe(false)
      expect(new ForeNumber('NaN').lt('1')).toBe(false)
      expect(new ForeNumber('1').lt('NaN')).toBe(false)
    })
  })

  describe('大于等于比较 (greaterThanOrEqual / gte)', () => {
    it('基本大于等于比较', () => {
      expect(new ForeNumber('10').gte('3')).toBe(true)
      expect(new ForeNumber('10').greaterThanOrEqual('3')).toBe(true)
      expect(new ForeNumber('10').gte('10')).toBe(true)
      expect(new ForeNumber('3').gte('10')).toBe(false)
    })

    it('正确处理负数大于等于比较', () => {
      expect(new ForeNumber('-3').gte('-3')).toBe(true)
      expect(new ForeNumber('-3').gte('-10')).toBe(true)
      expect(new ForeNumber('-10').gte('-3')).toBe(false)
    })

    it('正确处理特殊值大于等于比较', () => {
      expect(new ForeNumber('Infinity').gte('Infinity')).toBe(true)
      expect(new ForeNumber('Infinity').gte('1')).toBe(true)
      expect(new ForeNumber('-Infinity').gte('-Infinity')).toBe(true)
      expect(new ForeNumber('NaN').gte('1')).toBe(false)
      expect(new ForeNumber('1').gte('NaN')).toBe(false)
    })
  })

  describe('小于等于比较 (lessThanOrEqual / lte)', () => {
    it('基本小于等于比较', () => {
      expect(new ForeNumber('3').lte('10')).toBe(true)
      expect(new ForeNumber('3').lessThanOrEqual('10')).toBe(true)
      expect(new ForeNumber('10').lte('10')).toBe(true)
      expect(new ForeNumber('10').lte('3')).toBe(false)
    })

    it('正确处理负数小于等于比较', () => {
      expect(new ForeNumber('-10').lte('-3')).toBe(true)
      expect(new ForeNumber('-3').lte('-3')).toBe(true)
      expect(new ForeNumber('-3').lte('-10')).toBe(false)
    })

    it('正确处理特殊值小于等于比较', () => {
      expect(new ForeNumber('1').lte('Infinity')).toBe(true)
      expect(new ForeNumber('-Infinity').lte('1')).toBe(true)
      expect(new ForeNumber('-Infinity').lte('-Infinity')).toBe(true)
      expect(new ForeNumber('NaN').lte('1')).toBe(false)
      expect(new ForeNumber('1').lte('NaN')).toBe(false)
    })
  })

  describe('跨量级比较', () => {
    it('正确处理巨大量级差的比较', () => {
      expect(new ForeNumber('1.234e12').gt('9.876e-12')).toBe(true)
      expect(new ForeNumber('9.876e-12').lt('1.234e12')).toBe(true)
      expect(new ForeNumber('1e100').gt('1')).toBe(true)
    })

    it('正确处理相近大量级的比较', () => {
      expect(new ForeNumber('1.00000000000000000001').gt('1')).toBe(true)
      expect(new ForeNumber('1').lt('1.00000000000000000001')).toBe(true)
    })
  })
})
