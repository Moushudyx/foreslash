import { objectListToCSV } from '../../src'

describe('objectListToCSV', () => {
  it('基本功能', () => {
    const objList = [
      { name: '张三', age: 16, city: '上海' },
      { name: '李四', age: 25, city: '新加坡' },
    ]
    const fields: [string, string][] = [
      ['name', '姓名'],
      ['age', '年龄'],
      ['city', '城市'],
    ]

    expect(objectListToCSV(objList, fields)).toBe('姓名,年龄,城市\n张三,16,上海\n李四,25,新加坡')
  })

  it('缺失字段与自定义分隔符', () => {
    const objList = [
      { name: '王五', city: '北;京' },
      { name: '赵六', note: '包含"引号"' },
    ]
    const fields: [string, string][] = [
      ['name', '姓名'],
      ['city', '城市'],
      ['note', '备注'],
    ]

    expect(objectListToCSV(objList, fields, ';')).toBe('姓名;城市;备注\n王五;"北;京";\n赵六;;"包含""引号"""')
    expect(objectListToCSV(objList, fields, { delimiter: ';' })).toBe(
      '姓名;城市;备注\n王五;"北;京";\n赵六;;"包含""引号"""'
    )
  })

  it('选项透传 BOM/换行/引号策略', () => {
    const objList = [
      { name: 'A', note: 'x' },
      { name: 'B', note: 'y' },
    ]
    const fields: [string, string][] = [
      ['name', '姓名'],
      ['note', '备注'],
    ]

    expect(objectListToCSV(objList, fields, { bom: true, quoteAll: true, newline: '\r\n' })).toBe(
      '\uFEFF"姓名","备注"\r\n"A","x"\r\n"B","y"'
    )
  })
})
