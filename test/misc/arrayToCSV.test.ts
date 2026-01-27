import { arrayToCSV } from '../../src'

describe('arrayToCSV', () => {
  it('基本功能', () => {
    const data = [
      ['姓名', '年龄'],
      ['张三', 16],
      ['李四', 25],
    ]

    expect(arrayToCSV(data)).toBe('姓名,年龄\n张三,16\n李四,25')
  })

  it('分隔符与转义', () => {
    const data = [[
      'a;b',
      'c"d',
      'line\nbreak',
    ]]

    expect(arrayToCSV(data, ';')).toBe('"a;b";"c""d";"line\nbreak"')
  })

  it('BOM 与换行符选项', () => {
    const data = [['a', 'b']]

    expect(arrayToCSV(data, { bom: true })).toBe('\uFEFFa,b')
    expect(arrayToCSV(data, { newline: '\r\n' })).toBe('a,b') // 单行不受换行符影响
    expect(arrayToCSV([['a'], ['b']], { newline: '\r\n' })).toBe('a\r\nb')
  })

  it('强制加引号', () => {
    const data = [[1, '02', 'foo']]

    expect(arrayToCSV(data, { quoteAll: true })).toBe('"1","02","foo"')
  })
})
