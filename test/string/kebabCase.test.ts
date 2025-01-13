import { kebabCase } from '../../src'

describe('kebabCase', () => {
  it('基本功能', () => {
    expect(kebabCase('')).toBe('')
    expect(kebabCase('=-=')).toBe('')
    // 默认情况 不保留大小写 保留数字
    expect(kebabCase('getTestUUID1234')).toBe('get-test-uuid-1234')
    // 保留大小写 保留数字
    expect(kebabCase('getTestUUID1234', { keepLetterCase: true })).toBe('get-Test-UUID-1234')
    // 保留大小写 不保留数字
    expect(kebabCase('getTestUUID1234', { keepLetterCase: true, keepNumber: false })).toBe('get-Test-UUID')
    // 不保留大小写 不保留数字
    expect(kebabCase('getTestUUID1234a', { keepLetterCase: false, keepNumber: false })).toBe('get-test-uuid-a')
  })
})
