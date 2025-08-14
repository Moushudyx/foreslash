import { dedent } from '../../src'

describe('dedent', () => {
  it('基本功能', () => {
    // 默认值测试
    expect(dedent('')).toBe('')
    expect(dedent(' ')).toBe('')
    expect(dedent(' a')).toBe('a')
    expect(dedent('  a')).toBe('a')
    expect(dedent('a\nb\n  c')).toBe('a\nb\nc')
    expect(dedent('a\n\nb  c')).toBe('a\n\nb  c')
    // 缩进效果配置 缩进数量 缩进字符串
    expect(dedent('00000000', { count: 9, indentStr: '0' })).toBe('')
    expect(dedent('0 0', { indentStr: '0' })).toBe(' 0')
    expect(dedent('0 \n00 \n000 \n0000 \n 0', { count: 3, indentStr: '0' })).toBe(' \n \n \n0 \n 0')
    expect(dedent(' a\n  b\n   c', { count: 1 })).toBe('a\n b\n  c')
    expect(dedent('*a\n*b\n  *c', { count: 1, indentStr: '*' })).toBe('a\nb\n  *c')
    // 缩进效果配置 简单写法
    expect(dedent('00000000', 9, '0')).toBe('')
    expect(dedent('0 0', undefined, '0')).toBe(' 0')
    expect(dedent('0 0', null, '0')).toBe(' 0')
    expect(dedent('0 \n00 \n000 \n0000 \n 0', 3, '0')).toBe(' \n \n \n0 \n 0')
    expect(dedent(' a\n  b\n   c', 1)).toBe('a\n b\n  c')
    expect(dedent('*a\n*b\n  *c', 1, '*')).toBe('a\nb\n  *c')
  })
})
