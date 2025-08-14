import { indent } from '../../src'

describe('indent', () => {
  it('基本功能', () => {
    // 默认值测试
    expect(indent('')).toBe('')
    expect(indent(' ')).toBe('   ')
    expect(indent('a')).toBe('  a')
    expect(indent('a\nb\n  c')).toBe('  a\n  b\n    c')
    expect(indent('a\n\n  c')).toBe('  a\n\n    c')
    // 缩进效果配置 缩进数量 缩进字符串
    expect(indent('', { count: 9, indentStr: '0' })).toBe('')
    expect(indent(' ', { indentStr: '0' })).toBe('00 ')
    expect(indent(' ', { count: 3, indentStr: '0' })).toBe('000 ')
    expect(indent(' ', { count: 3 })).toBe('    ')
    expect(indent('a', { count: 4 })).toBe('    a')
    expect(indent('a', { indentStr: '0' })).toBe('00a')
    expect(indent('a\nb\n  c', { count: 1 })).toBe(' a\n b\n   c')
    expect(indent('a\nb\n  c', { count: 1, indentStr: '0' })).toBe('0a\n0b\n0  c')
    expect(indent('a\n\n  c', { count: 1 })).toBe(' a\n\n   c')
    expect(indent('a\n\n  c', { count: 1, indentStr: '0' })).toBe('0a\n\n0  c')
    // 缩进效果配置 简单写法
    expect(indent('', 9, '0')).toBe('')
    expect(indent(' ', null, '0')).toBe('00 ')
    expect(indent(' ', undefined, '0')).toBe('00 ')
    expect(indent(' ', 3)).toBe('    ')
    expect(indent(' ', 3, '0')).toBe('000 ')
    expect(indent('a\nb\n  c', 1)).toBe(' a\n b\n   c')
    expect(indent('a\nb\n  c', 1, '0')).toBe('0a\n0b\n0  c')
    expect(indent('a\n\n  c', 1)).toBe(' a\n\n   c')
    expect(indent('a\n\n  c', 1, '0')).toBe('0a\n\n0  c')
    // 缩进效果配置 是否忽略空行
    expect(indent('', { ignoreEmptyLine: false, count: 1 })).toBe(' ')
    expect(indent('', { ignoreEmptyLine: false, indentStr: '0' })).toBe('00')
    expect(indent('', { ignoreEmptyLine: false, count: 3, indentStr: '0' })).toBe('000')
    expect(indent('a\nb\n  c', { ignoreEmptyLine: false, count: 1 })).toBe(' a\n b\n   c')
    expect(indent('a\nb\n  c', { ignoreEmptyLine: false, count: 1, indentStr: '0' })).toBe('0a\n0b\n0  c')
    expect(indent('a\n\n  c', { ignoreEmptyLine: false, count: 1 })).toBe(' a\n \n   c')
    expect(indent('a\n\n  c', { ignoreEmptyLine: false, count: 1, indentStr: '0' })).toBe('0a\n0\n0  c')
  })
})
