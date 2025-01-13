import { pascalCase } from '../../src'

describe('pascalCase', () => {
  it('基本功能', () => {
    expect(pascalCase('')).toBe('')
    expect(pascalCase('=-=')).toBe('')
    // 默认情况 不保留大小写 保留数字
    expect(pascalCase('get-Test-UUID-1234')).toBe('GetTestUuid1234')
    // 保留大小写 保留数字
    expect(pascalCase('get-Test-UUID-1234', { keepLetterCase: true })).toBe('GetTestUUID1234')
    // 保留大小写 不保留数字
    expect(pascalCase('get-Test-UUID-1234', { keepLetterCase: true, keepNumber: false })).toBe('GetTestUUID')
    // 不保留大小写 不保留数字
    expect(pascalCase('get-Test-UUID-1234a', { keepLetterCase: false, keepNumber: false })).toBe('GetTestUuidA')
  })
})
