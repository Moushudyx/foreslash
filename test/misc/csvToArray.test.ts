import { csvToArray } from '../../src'

describe('csvToArray', () => {
  it('基本功能', () => {
    const csv = '姓名,年龄\n张三,16\n李四,25'

    expect(csvToArray(csv)).toEqual([
      ['姓名', '年龄'],
      ['张三', '16'],
      ['李四', '25'],
    ])
  })

  it('引号与转义', () => {
    const csv = 'a,"b,c","d""e","line\nbreak"\n1,2,3,4'

    expect(csvToArray(csv)).toEqual([
      ['a', 'b,c', 'd"e', 'line\nbreak'],
      ['1', '2', '3', '4'],
    ])
  })

  it('分隔符与 BOM/空行', () => {
    const csv = '\uFEFFa;b\r\n\r\nc;d'

    expect(csvToArray(csv, ';')).toEqual([
      ['a', 'b'],
      ['c', 'd'],
    ])
  })

  it('保留空行', () => {
    const csv = 'a,b\n\n1,2'

    expect(csvToArray(csv, { skipEmptyLines: false })).toEqual([
      ['a', 'b'],
      [''],
      ['1', '2'],
    ])
  })
})
