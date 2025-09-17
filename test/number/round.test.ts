import { round, roundBase, roundBank, roundCeil, roundFloor } from '../../src'

describe('round', () => {
  it('roundBase', () => {
    // 四舍五入
    expect(roundBase('1', '34', 1)).toEqual(['1', '3'])
    expect(roundBase('1', '35', 1)).toEqual(['1', '4'])
    expect(roundBase('1', '36', 1)).toEqual(['1', '4'])
    // 与符号无关
    expect(roundBase('1', '34', 1)).toEqual(['1', '3'])
    expect(roundBase('1', '35', 1)).toEqual(['1', '4'])
    expect(roundBase('1', '36', 1)).toEqual(['1', '4'])
    // 其他测试
    expect(roundBase('1', '34', 2)).toEqual(['1', '34'])
    expect(roundBase('1', '3', 2)).toEqual(['1', '30'])
    expect(roundBase('1', '', 2)).toEqual(['1', '00'])
  })
  it('roundBank', () => {
    // 四舍六入, 如果后一位是 5(000...) 则看前一位, 凑偶数
    expect(roundBank('1', '34', 1)).toEqual(['1', '3'])
    expect(roundBank('1', '35', 1)).toEqual(['1', '4']) // 五成双
    expect(roundBank('1', '36', 1)).toEqual(['1', '4'])
    expect(roundBank('1', '44', 1)).toEqual(['1', '4'])
    expect(roundBank('1', '45', 1)).toEqual(['1', '4']) // 五成双
    expect(roundBank('1', '450001', 1)).toEqual(['1', '5']) // 后一位比 5(000...) 多所以仍然进位
    expect(roundBank('1', '46', 1)).toEqual(['1', '5'])
    // 向整数进位也是如此
    expect(roundBank('1', '4', 0)).toEqual(['1', ''])
    expect(roundBank('1', '5', 0)).toEqual(['2', '']) // 五成双
    expect(roundBank('1', '6', 0)).toEqual(['2', ''])
    expect(roundBank('2', '4', 0)).toEqual(['2', ''])
    expect(roundBank('2', '5', 0)).toEqual(['2', '']) // 五成双
    expect(roundBank('2', '6', 0)).toEqual(['3', ''])
    // 与符号无关
    expect(roundBank('1', '34', 1)).toEqual(['1', '3'])
    expect(roundBank('1', '35', 1)).toEqual(['1', '4']) // 五成双
    expect(roundBank('1', '36', 1)).toEqual(['1', '4'])
    expect(roundBank('1', '44', 1)).toEqual(['1', '4'])
    expect(roundBank('1', '45', 1)).toEqual(['1', '4']) // 五成双
    expect(roundBank('1', '450001', 1)).toEqual(['1', '5'])
    expect(roundBank('1', '46', 1)).toEqual(['1', '5'])
    // 其他测试
    expect(roundBank('1', '34', 2)).toEqual(['1', '34'])
    expect(roundBank('1', '3', 2)).toEqual(['1', '30'])
    expect(roundBank('1', '', 2)).toEqual(['1', '00'])
  })
  it('roundCeil', () => {
    // 忽略后面的数字向上取整
    expect(roundCeil('1', '34', 1, false)).toEqual(['1', '4'])
    expect(roundCeil('1', '35', 1, false)).toEqual(['1', '4'])
    expect(roundCeil('1', '36', 1, false)).toEqual(['1', '4'])
    // 与符号有关 向更大的数字进位
    expect(roundCeil('1', '34', 1, true)).toEqual(['1', '3'])
    expect(roundCeil('1', '35', 1, true)).toEqual(['1', '3'])
    expect(roundCeil('1', '36', 1, true)).toEqual(['1', '3'])
    // 其他测试
    expect(roundCeil('1', '34', 2, true)).toEqual(['1', '34'])
    expect(roundCeil('1', '3', 2, true)).toEqual(['1', '30'])
    expect(roundCeil('1', '', 2, true)).toEqual(['1', '00'])
  })
  it('roundFloor', () => {
    // 忽略后面的数字向下取整
    expect(roundFloor('1', '34', 1, false)).toEqual(['1', '3'])
    expect(roundFloor('1', '36', 1, false)).toEqual(['1', '3'])
    expect(roundFloor('1', '39', 1, false)).toEqual(['1', '3'])
    // 与符号有关 向更小的数字进位
    expect(roundFloor('1', '34', 1, true)).toEqual(['1', '4'])
    expect(roundFloor('1', '35', 1, true)).toEqual(['1', '4'])
    expect(roundFloor('1', '36', 1, true)).toEqual(['1', '4'])
    // 其他测试
    expect(roundFloor('1', '34', 2, true)).toEqual(['1', '34'])
    expect(roundFloor('1', '3', 2, true)).toEqual(['1', '30'])
    expect(roundFloor('1', '', 2, true)).toEqual(['1', '00'])
  })
  it('round', () => {
    // 四舍五入
    expect(round(1.95, 1)).toBe('2.0')
    expect(round('1.95', 1)).toBe('2.0')
    expect(round(1.5, 0)).toBe('2')
    expect(round('-1.5', 0)).toBe('-2')
    expect(round(1.5, 0, 'round')).toBe('2')
    expect(round('-1.5', 0, 'round')).toBe('-2')
     // 遇到不认识的修约方法是默认使用四舍五入
    // @ts-ignore
    expect(round(1.5, 0, '12313')).toBe('2')
    // @ts-ignore
    expect(round('-1.5', 0, 'qwerty')).toBe('-2')
    // 四舍六入五成双
    expect(round('1.85', 1, 'banker')).toBe('1.8')
    expect(round('1.95', 1, 'banker')).toBe('2.0')
    expect(round(1.5, 0, 'banker')).toBe('2')
    expect(round(2.5, 0, 'banker')).toBe('2')
    expect(round('-1.5', 0, 'banker')).toBe('-2')
    expect(round('-2.5', 0, 'banker')).toBe('-2')
    // 向下取整
    expect(round('1.95', 1, 'floor')).toBe('1.9')
    expect(round(-1.95, 1, 'floor')).toBe('-2.0')
    expect(round(1.5, 0, 'floor')).toBe('1')
    expect(round('-1.5', 0, 'floor')).toBe('-2')
    // 向上取整
    expect(round('1.95', 1, 'ceil')).toBe('2.0')
    expect(round(-1.95, 1, 'ceil')).toBe('-1.9')
    expect(round(1.5, 0, 'ceil')).toBe('2')
    expect(round('-1.5', 0, 'ceil')).toBe('-1')
  })
})
