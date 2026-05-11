import { afterEach, describe, expect, it } from 'vitest'
import { ForeNumber } from '../../src/decimal'

const defaultContext = ForeNumber.config()
afterEach(() => ForeNumber.config(defaultContext))

// ═══════════════════ rounded 基础 ═══════════════════

describe('rounded 基础功能', () => {
  it('round 模式四舍五入', () => {
    expect(new ForeNumber('3.14159').rounded(2).toString()).toBe('3.14')
    expect(new ForeNumber('3.145').rounded(2).toString()).toBe('3.15')
    expect(new ForeNumber('3.14159').rounded(0).toString()).toBe('3')
    expect(new ForeNumber('3.5').rounded(0).toString()).toBe('4')
    expect(new ForeNumber('3.4999').rounded(0).toString()).toBe('3')
    expect(new ForeNumber('42').rounded(3).toString()).toBe('42')
    expect(new ForeNumber('42').rounded(0).toString()).toBe('42')
    expect(new ForeNumber('99.999').rounded(2).toString()).toBe('100')
    expect(new ForeNumber('0.999').rounded(2).toString()).toBe('1')
    expect(new ForeNumber('0.001234').rounded(3).toString()).toBe('0.001')
    expect(new ForeNumber('0.001234').rounded(4).toString()).toBe('0.0012')
    expect(new ForeNumber('0.001234').rounded(5).toString()).toBe('0.00123')
  })

  it('负数的 round 修约', () => {
    expect(new ForeNumber('-3.14159').rounded(2).toString()).toBe('-3.14')
    expect(new ForeNumber('-3.145').rounded(2).toString()).toBe('-3.15')
    expect(new ForeNumber('-3.5').rounded(0).toString()).toBe('-4')
  })

  it('默认修约到 0 位小数', () => {
    expect(new ForeNumber('3.14159').rounded().toString()).toBe('3')
    expect(new ForeNumber('3.8').rounded().toString()).toBe('4')
  })

  it('round 别名正确', () => {
    expect(new ForeNumber('3.14159').round(2).toString()).toBe('3.14')
    expect(new ForeNumber('2.5').round(0, 'banker').toString()).toBe('2')
  })
})

// ═══════════════════ ceil 模式 ═══════════════════

describe('rounded ceil 模式', () => {
  it('正数 ceil 向上取整', () => {
    expect(new ForeNumber('3.001').rounded(0, 'ceil').toString()).toBe('4')
    expect(new ForeNumber('3.14159').rounded(2, 'ceil').toString()).toBe('3.15')
    expect(new ForeNumber('3.14001').rounded(2, 'ceil').toString()).toBe('3.15')
  })

  it('负数 ceil 向零方向取整（向上）', () => {
    expect(new ForeNumber('-3.001').rounded(0, 'ceil').toString()).toBe('-3')
    expect(new ForeNumber('-3.14159').rounded(2, 'ceil').toString()).toBe('-3.14')
  })

  it('ceil 无尾数不改变', () => {
    expect(new ForeNumber('3.14').rounded(2, 'ceil').toString()).toBe('3.14')
    expect(new ForeNumber('-3.14').rounded(2, 'ceil').toString()).toBe('-3.14')
  })
})

// ═══════════════════ floor 模式 ═══════════════════

describe('rounded floor 模式', () => {
  it('正数 floor 向下取整', () => {
    expect(new ForeNumber('3.999').rounded(0, 'floor').toString()).toBe('3')
    expect(new ForeNumber('3.14999').rounded(2, 'floor').toString()).toBe('3.14')
  })

  it('负数 floor 远离零方向取整（向下）', () => {
    expect(new ForeNumber('-3.001').rounded(0, 'floor').toString()).toBe('-4')
    expect(new ForeNumber('-3.14001').rounded(2, 'floor').toString()).toBe('-3.15')
  })

  it('floor 无尾数不改变', () => {
    expect(new ForeNumber('3.14').rounded(2, 'floor').toString()).toBe('3.14')
    expect(new ForeNumber('-3.14').rounded(2, 'floor').toString()).toBe('-3.14')
  })
})

// ═══════════════════ banker 模式（奇进偶不进） ═══════════════════

describe('rounded banker 模式', () => {
  it('>5 进', () => {
    expect(new ForeNumber('1.16').rounded(1, 'banker').toString()).toBe('1.2')
    expect(new ForeNumber('1.26').rounded(1, 'banker').toString()).toBe('1.3')
  })

  it('<5 舍', () => {
    expect(new ForeNumber('1.14').rounded(1, 'banker').toString()).toBe('1.1')
    expect(new ForeNumber('1.24').rounded(1, 'banker').toString()).toBe('1.2')
  })

  it('=5 且无后续尾数 → 奇进偶不进', () => {
    expect(new ForeNumber('1.15').rounded(1, 'banker').toString()).toBe('1.2') // 1 是奇数 → 进
    expect(new ForeNumber('1.25').rounded(1, 'banker').toString()).toBe('1.2') // 2 是偶数 → 不进
    expect(new ForeNumber('2.5').rounded(0, 'banker').toString()).toBe('2')    // 2 是偶数 → 不进
    expect(new ForeNumber('3.5').rounded(0, 'banker').toString()).toBe('4')    // 3 是奇数 → 进
  })

  it('=5 但有后续尾数 → 进', () => {
    expect(new ForeNumber('1.151').rounded(1, 'banker').toString()).toBe('1.2')
    expect(new ForeNumber('1.250001').rounded(1, 'banker').toString()).toBe('1.3')
  })

  it('banker 进位到整数位', () => {
    expect(new ForeNumber('1.5').rounded(0, 'banker').toString()).toBe('2')
    expect(new ForeNumber('2.5').rounded(0, 'banker').toString()).toBe('2')
    expect(new ForeNumber('9.5').rounded(0, 'banker').toString()).toBe('10')
  })
})

// ═══════════════════ 负数精度（修约到十位/百位） ═══════════════════

describe('rounded 负数精度', () => {
  it('修约到十位', () => {
    expect(new ForeNumber('12345').rounded(-1).toString()).toBe('12350')
    expect(new ForeNumber('12344').rounded(-1).toString()).toBe('12340')
    expect(new ForeNumber('12345').rounded(-1, 'floor').toString()).toBe('12340')
    expect(new ForeNumber('12341').rounded(-1, 'ceil').toString()).toBe('12350')
  })

  it('修约到百位', () => {
    expect(new ForeNumber('12345').rounded(-2).toString()).toBe('12300')
    expect(new ForeNumber('12350').rounded(-2).toString()).toBe('12400')
  })

  it('修约到千位', () => {
    expect(new ForeNumber('123456').rounded(-3).toString()).toBe('123000')
    expect(new ForeNumber('5499').rounded(-3).toString()).toBe('5000')
  })

  it('负数精度 + banker 模式', () => {
    // 1250 修约到百位（-2）: 12.50 → banker → 12 (2 是偶数) → 1200
    expect(new ForeNumber('1250').rounded(-2, 'banker').toString()).toBe('1200')
    // 1350 修约到百位（-2）: 13.50 → banker → 14 (3 是奇数) → 1400
    expect(new ForeNumber('1350').rounded(-2, 'banker').toString()).toBe('1400')
  })

  it('精度超过数值本身时返回 0', () => {
    expect(new ForeNumber('45').rounded(-2).toString()).toBe('0')
    expect(new ForeNumber('49').rounded(-2).toString()).toBe('0')
  })
})

// ═══════════════════ 特殊值与边界 ═══════════════════

describe('rounded 特殊值', () => {
  it('零值', () => {
    expect(new ForeNumber('0').rounded(2).toString()).toBe('0')
    expect(new ForeNumber('-0').rounded(3).toString()).toBe('0')
  })

  it('特殊值', () => {
    expect(new ForeNumber('NaN').rounded(2).toString()).toBe('NaN')
    expect(new ForeNumber('Infinity').rounded(2).toString()).toBe('Infinity')
    expect(new ForeNumber('-Infinity').rounded(2).toString()).toBe('-Infinity')
  })

  it('非有限精度参数返回原值', () => {
    const v = new ForeNumber('3.14159')
    expect(v.rounded(Infinity).toString()).toBe('3.14159')
    expect(v.rounded(NaN).toString()).toBe('3.14159')
  })
})
