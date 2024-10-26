import { shuffle } from '../../src/index'

const testCount = 1e4

describe('shuffle', () => {
  test('数组测试', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    const result = shuffle(arr)
    expect(result.length).toBe(arr.length)
    expect(result).not.toEqual(arr)
    expect(result.includes(1)).toBe(true)
    expect(result.includes(2)).toBe(true)
    expect(result.includes(3)).toBe(true)
    expect(result.includes(4)).toBe(true)
    expect(result.includes(5)).toBe(true)
    expect(result.includes(10)).toBe(true)
    expect(result.includes(11)).toBe(true)
    expect(result.includes(16)).toBe(true)
    expect(result.includes(17)).toBe(true)
    expect(result.includes(18)).toBe(true)
    expect(result.includes(19)).toBe(true)
    expect(result.includes(20)).toBe(true)
  })
  test('字符串测试', () => {
    const str = '1234567890abcdefghijklmnopqrstuvwxyz'
    const result = shuffle(str)
    expect(result.length).toBe(str.length)
    expect(result.join('')).not.toEqual(str)
    expect(result.includes('1')).toBe(true)
    expect(result.includes('2')).toBe(true)
    expect(result.includes('3')).toBe(true)
    expect(result.includes('4')).toBe(true)
    expect(result.includes('5')).toBe(true)
    expect(result.includes('6')).toBe(true)
    expect(result.includes('7')).toBe(true)
    expect(result.includes('8')).toBe(true)
    expect(result.includes('9')).toBe(true)
    expect(result.includes('0')).toBe(true)
    expect(result.includes('a')).toBe(true)
    expect(result.includes('b')).toBe(true)
    expect(result.includes('c')).toBe(true)
    expect(result.includes('d')).toBe(true)
  })
  test('特殊场景', () => {
    expect(shuffle('a')).toEqual(['a'])
    expect(shuffle([1])).toEqual([1])
  })
})
