import { snakeCase } from '../../src'

describe('snakeCase', () => {
  it('基本功能', () => {
    expect(snakeCase('')).toBe('')
    expect(snakeCase('=-=')).toBe('')
    // 默认情况 不保留大小写 保留数字
    expect(snakeCase('getTestUUID1234')).toBe('get_test_uuid_1234')
    // 保留大小写 保留数字
    expect(snakeCase('getTestUUID1234', { keepLetterCase: true })).toBe('get_Test_UUID_1234')
    // 保留大小写 不保留数字
    expect(snakeCase('getTestUUID1234', { keepLetterCase: true, keepNumber: false })).toBe('get_Test_UUID')
    // 不保留大小写 不保留数字
    expect(snakeCase('getTestUUID1234a', { keepLetterCase: false, keepNumber: false })).toBe('get_test_uuid_a')
  })
})
