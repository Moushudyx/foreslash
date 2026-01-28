import { csvToObjectList } from '../../src'

describe('csvToObjectList', () => {
  it('基本功能', () => {
    const csv = '姓名,年龄\n张三,16\n李四,25'
    const fields: [string, string][] = [
      ['name', '姓名'],
      ['age', '年龄'],
    ]

    expect(csvToObjectList(csv, fields)).toEqual([
      { name: '张三', age: '16' },
      { name: '李四', age: '25' },
    ])
    // 空 CSV
    expect(csvToObjectList('', fields)).toEqual([])
  })

  it('缺失字段与自定义分隔符', () => {
    const csv = '姓名;年龄;城市\n张三;16;上海\n李四;25'
    const fields: [string, string][] = [
      ['name', '姓名'],
      ['age', '年龄'],
      ['city', '城市'],
    ]

    expect(csvToObjectList(csv, fields, ';')).toEqual([
      { name: '张三', age: '16', city: '上海' },
      { name: '李四', age: '25', city: '' },
    ])
    expect(csvToObjectList(csv, fields, { delimiter: ';' })).toEqual([
      { name: '张三', age: '16', city: '上海' },
      { name: '李四', age: '25', city: '' },
    ])
  })

  it('未映射列与数字字段', () => {
    const csv = '姓名,年龄,备注\n张三,16,OK\n李四,,Good'
    const fields: [string, string][] = [
      ['name', '姓名'],
      ['age', '年龄'],
    ]

    expect(csvToObjectList(csv, fields, { includeUnknown: false })).toEqual([
      { name: '张三', age: '16' },
      { name: '李四', age: '' },
    ])
    expect(csvToObjectList(csv, fields, { includeUnknown: true })).toEqual([
      { name: '张三', age: '16', 备注: 'OK' },
      { name: '李四', age: '', 备注: 'Good' },
    ])
    expect(csvToObjectList(csv, fields, { includeUnknown: true, emptyValue: 'N/A' })).toEqual([
      { name: '张三', age: '16', 备注: 'OK' },
      { name: '李四', age: 'N/A', 备注: 'Good' },
    ])
    expect(csvToObjectList(csv, fields, { includeUnknown: true, numberFields: ['age'] })).toEqual([
      { name: '张三', age: 16, 备注: 'OK' },
      { name: '李四', age: NaN, 备注: 'Good' },
    ])
    expect(csvToObjectList(csv, fields, { includeUnknown: true, emptyNumberValue: 0, numberFields: ['age'] })).toEqual([
      { name: '张三', age: 16, 备注: 'OK' },
      { name: '李四', age: 0, 备注: 'Good' },
    ])
    expect(csvToObjectList(csv, fields, { includeUnknown: false, emptyNumberValue: 0, numberFields: ['age'] })).toEqual([
      { name: '张三', age: 16 },
      { name: '李四', age: 0 },
    ])
  })

  it('BOM 与空行处理', () => {
    const csv = '\uFEFF姓名,年龄\n\n张三,16\n\n李四,25\n'
    const fields: [string, string][] = [
      ['name', '姓名'],
      ['age', '年龄'],
    ]
    expect(csvToObjectList(csv, fields)).toEqual([
      { name: '张三', age: '16' },
      { name: '李四', age: '25' },
    ])
    expect(csvToObjectList(csv, fields, { skipEmptyLines: false })).toEqual([
      { name: '', age: '' },
      { name: '张三', age: '16' },
      { name: '', age: '' },
      { name: '李四', age: '25' },
      { name: '', age: '' },
    ])
  })
})
