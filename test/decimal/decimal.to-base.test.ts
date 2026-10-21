import { describe, expect, it } from 'vitest'
import { ForeNumber } from '../../src/decimal'

const radices = [
  { method: 'toBinary', alias: 'toBin', radix: 2 },
  { method: 'toOctal', alias: 'toOct', radix: 8 },
  { method: 'toHexadecimal', alias: 'toHex', radix: 16 },
] as const

function convertRationalToBase(numerator: bigint, denominator: bigint, radix: number, precision: number): string {
  const integerDigits: string[] = []
  let integer = numerator / denominator
  let remainder = numerator % denominator

  if (integer === 0n) integerDigits.push('0')
  while (integer > 0n) {
    integerDigits.unshift((integer % BigInt(radix)).toString(radix))
    integer /= BigInt(radix)
  }

  const fractionalDigits: string[] = []
  for (let index = 0; index < precision && remainder !== 0n; index += 1) {
    remainder *= BigInt(radix)
    fractionalDigits.push((remainder / denominator).toString(radix))
    remainder %= denominator
  }

  while (fractionalDigits[fractionalDigits.length - 1] === '0') fractionalDigits.pop()
  return fractionalDigits.length
    ? `${integerDigits.join('')}.${fractionalDigits.join('')}`
    : integerDigits.join('')
}

function decimalRational(value: string): { numerator: bigint; denominator: bigint } {
  const [integerPart, fractionalPart = ''] = value.split('.')
  const scale = 10n ** BigInt(fractionalPart.length)
  return {
    numerator: BigInt(integerPart + fractionalPart),
    denominator: scale,
  }
}

describe('ForeNumber 进制转换', () => {
  it.each(radices)('$method 转换整数并支持别名', ({ method, alias, radix }) => {
    const value = new ForeNumber('123456789')
    const expected = BigInt('123456789').toString(radix)
    expect(value[method]()).toBe(expected)
    expect(value[alias]()).toBe(expected)
  })

  it.each(radices)('$method 转换有限小数并按 precision 截断', ({ method, radix }) => {
    const value = new ForeNumber('0.1')
    const { numerator, denominator } = decimalRational('0.1')
    expect(value[method](8)).toBe(convertRationalToBase(numerator, denominator, radix, 8))
  })

  it('转换精确终止小数、负数和零', () => {
    expect(new ForeNumber('0.5').toBinary()).toBe('0.1')
    expect(new ForeNumber('0.5').toOctal()).toBe('0.4')
    expect(new ForeNumber('0.5').toHexadecimal()).toBe('0.8')
    expect(new ForeNumber('-10.5').toBinary()).toBe('-1010.1')
    expect(new ForeNumber('-10.5').toOctal()).toBe('-12.4')
    expect(new ForeNumber('-10.5').toHexadecimal()).toBe('-a.8')
    expect(new ForeNumber('-0').toBinary()).toBe('0')
  })

  it.each(radices)('$method 处理超大整数且不经原生 number 转换', ({ method, radix }) => {
    const decimal = '12345678901234567890123456789012345678901234567890'
    expect(new ForeNumber(decimal)[method]()).toBe(BigInt(decimal).toString(radix))
    expect(new ForeNumber(`-${decimal}`)[method]()).toBe(`-${BigInt(decimal).toString(radix)}`)
  })

  it.each(radices)('$method 保留极小数的精确位并遵守精度上限', ({ method, radix }) => {
    const decimal = '0.' + '0'.repeat(99) + '1'
    const { numerator, denominator } = decimalRational(decimal)
    expect(new ForeNumber(decimal)[method](400)).toBe(
      convertRationalToBase(numerator, denominator, radix, 400)
    )
    expect(new ForeNumber(decimal)[method](16)).toBe('0')
    expect(new ForeNumber('1e-1000')[method](64)).toBe('0')
  })

  it('特殊值原样返回', () => {
    for (const { method } of radices) {
      expect(new ForeNumber('NaN')[method](2)).toBe('NaN')
      expect(new ForeNumber('Infinity')[method](2)).toBe('Infinity')
      expect(new ForeNumber('-Infinity')[method](2)).toBe('-Infinity')
      expect(new ForeNumber('NaN')[method](-1)).toBe('NaN')
    }
  })

  it('precision 必须是非负整数', () => {
    const value = new ForeNumber('10')
    expect(() => value.toBinary(-1)).toThrow(/precision/)
    expect(() => value.toOctal(1.5)).toThrow(/precision/)
    expect(() => value.toHexadecimal(Number.NaN)).toThrow(/precision/)
    expect(() => value.toHexadecimal(Number.POSITIVE_INFINITY)).toThrow(/precision/)
    expect(value.toHexadecimal(0)).toBe('a')
    expect(new ForeNumber('10.5').toBinary(0)).toBe('1010')
  })
})
