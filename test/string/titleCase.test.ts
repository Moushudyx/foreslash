import { titleCase } from '../../src'

describe('titleCase', () => {
  it('基本功能', () => {
    expect(titleCase('')).toBe('')
    expect(titleCase('=-=')).toBe('')
    // 默认情况 不保留大小写 保留数字
    expect(titleCase('getTestUUID1234')).toBe('Get Test Uuid 1234')
    // 保留大小写 保留数字
    expect(titleCase('getTestUUID1234', { keepLetterCase: true })).toBe('Get Test UUID 1234')
    // 保留大小写 不保留数字
    expect(titleCase('getTestUUID1234', { keepLetterCase: true, keepNumber: false })).toBe('Get Test UUID')
    // 不保留大小写 不保留数字
    expect(titleCase('getTestUUID1234a', { keepLetterCase: false, keepNumber: false })).toBe('Get Test Uuid A')
  })
})
