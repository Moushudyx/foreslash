import { constantCase } from '../../src'

describe('constantCase', () => {
  it('基本功能', () => {
    expect(constantCase('')).toBe('')
    expect(constantCase('=-=')).toBe('')
    // 默认保留数字
    expect(constantCase('getTestUuid1234')).toBe('GET_TEST_UUID_1234')
    // 不保留数字
    expect(constantCase('getTestUuid1234', { keepNumber: false })).toBe('GET_TEST_UUID')
    // 非字母数字视为分隔符
    expect(constantCase('user-name__id')).toBe('USER_NAME_ID')
  })
})
