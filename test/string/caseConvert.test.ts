import { caseConvert, caseCamel, casePascal, caseKebab, caseSnake } from '../../src'

describe('caseConvert', () => {
  it('基本功能', () => {
    expect(caseConvert('')).toBe('')
    expect(caseConvert('=-=')).toBe('')
    expect(caseConvert('A文字B🎈C=-=Test')).toBe('ABCTest')
    expect(caseConvert('getTestUUID1234', '-')).toBe('get-Test-UUID-1234')
    expect(caseConvert('user_nick_name', ' ', ({ code }) => code.toUpperCase())).toBe('USER NICK NAME')
    expect(caseConvert('getUUIDVersion4ForTest1', '-')).toBe('get-UUID-Version-4-For-Test-1')
    expect(caseConvert('getUUIDVersionV4forTest2', '_', ({ code }) => code.toLowerCase())).toBe('get_uuid_version_v_4_for_test_2')
  })
})

describe('caseCamel', () => {
  it('基本功能', () => {
    expect(caseCamel('')).toBe('')
    expect(caseCamel('=-=')).toBe('')
    // 默认情况 不保留大小写 保留数字
    expect(caseCamel('get-Test-UUID-1234')).toBe('getTestUuid1234')
    // 保留大小写 保留数字
    expect(caseCamel('get-Test-UUID-1234', true)).toBe('getTestUUID1234')
    // 保留大小写 不保留数字
    expect(caseCamel('get-Test-UUID-1234', true, false)).toBe('getTestUUID')
    // 不保留大小写 不保留数字
    expect(caseCamel('get-Test-UUID-1234a', false, false)).toBe('getTestUuidA')
  })
})

describe('casePascal', () => {
  it('基本功能', () => {
    expect(casePascal('')).toBe('')
    expect(casePascal('=-=')).toBe('')
    // 默认情况 不保留大小写 保留数字
    expect(casePascal('get-Test-UUID-1234')).toBe('GetTestUuid1234')
    // 保留大小写 保留数字
    expect(casePascal('get-Test-UUID-1234', true)).toBe('GetTestUUID1234')
    // 保留大小写 不保留数字
    expect(casePascal('get-Test-UUID-1234', true, false)).toBe('GetTestUUID')
    // 不保留大小写 不保留数字
    expect(casePascal('get-Test-UUID-1234a', false, false)).toBe('GetTestUuidA')
  })
})

describe('caseKebab', () => {
  it('基本功能', () => {
    expect(caseKebab('')).toBe('')
    expect(caseKebab('=-=')).toBe('')
    // 默认情况 不保留大小写 保留数字
    expect(caseKebab('getTestUUID1234')).toBe('get-test-uuid-1234')
    // 保留大小写 保留数字
    expect(caseKebab('getTestUUID1234', true)).toBe('get-Test-UUID-1234')
    // 保留大小写 不保留数字
    expect(caseKebab('getTestUUID1234', true, false)).toBe('get-Test-UUID')
    // 不保留大小写 不保留数字
    expect(caseKebab('getTestUUID1234a', false, false)).toBe('get-test-uuid-a')
  })
})

describe('caseSnake', () => {
  it('基本功能', () => {
    expect(caseSnake('')).toBe('')
    expect(caseSnake('=-=')).toBe('')
    // 默认情况 不保留大小写 保留数字
    expect(caseSnake('getTestUUID1234')).toBe('get_test_uuid_1234')
    // 保留大小写 保留数字
    expect(caseSnake('getTestUUID1234', true)).toBe('get_Test_UUID_1234')
    // 保留大小写 不保留数字
    expect(caseSnake('getTestUUID1234', true, false)).toBe('get_Test_UUID')
    // 不保留大小写 不保留数字
    expect(caseSnake('getTestUUID1234a', false, false)).toBe('get_test_uuid_a')
  })
})
