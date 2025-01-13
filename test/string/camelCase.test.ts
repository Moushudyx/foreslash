import { camelCase } from '../../src'

describe('caseCamel', () => {
  it('基本功能', () => {
    expect(camelCase('')).toBe('')
    expect(camelCase('=-=')).toBe('')
    // 默认情况 不保留大小写 保留数字
    expect(camelCase('get-Test-UUID-1234')).toBe('getTestUuid1234')
    // 保留大小写 保留数字
    expect(camelCase('get-Test-UUID-1234', { keepLetterCase: true })).toBe('getTestUUID1234')
    // 保留大小写 不保留数字
    expect(camelCase('get-Test-UUID-1234', { keepLetterCase: true, keepNumber: false })).toBe('getTestUUID')
    // 不保留大小写 不保留数字
    expect(camelCase('get-Test-UUID-1234a', { keepLetterCase: false, keepNumber: false })).toBe('getTestUuidA')
  })
})
