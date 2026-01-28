---
prev:
  text: 'csvToArray 解析 CSV'
  link: './csvToArray'
next:
  text: 'arrayToCSV 二维数组转 CSV'
  link: './arrayToCSV'
---

# csvToObjectList

<VersionTag version="0.3.9" />

将 CSV 字符串解析为对象列表，支持通过字段映射指定列名与字段名的关系

## 基本用法

当数据行缺少字段时会填充为空字符串

```JS
const csv = '姓名,年龄\n张三,16\n李四'
const fields = [['name', '姓名'], ['age', '年龄']]
csvToObjectList(csv, fields)
// [{ name: '张三', age: '16' }, { name: '李四', age: '' }]
```

## 自定义配置

可通过第三个参数指定分隔符

```JS
const csv = '姓名;年龄;城市\n张三;16;上海\n李四;25'
const fields = [['name', '姓名'], ['age', '年龄'], ['city', '城市']]
csvToObjectList(csv, fields, ';')
// [{ name: '张三', age: '16', city: '上海' }, { name: '李四', age: '25', city: '' }]
```

第三个参数也支持配置对象，基础选项同 `csvToArray`，多了以下参数：

- `includeUnknown` 是否将未映射列写入对象，默认 `false`
- `emptyValue` 空位置的默认值，默认 `''`
- `emptyNumberValue` 数字字段空位置的默认值，默认 `NaN`
- `numberFields` 指定需要转换为数字的字段名数组

```JS
const fields = [['a', 'a'], ['b', 'b']]
csvToObjectList('a;b\n\n1;2', fields, { delimiter: ';', skipEmptyLines: false })
// [{ a: '', b: '' }, { a: '1', b: '2' }]

csvToObjectList('姓名,年龄,note\n张三,16,备注\n李四', [['name', '姓名'], ['age', '年龄']], {
  includeUnknown: true, // 包含未映射列 note
  emptyValue: 'N/A',   // 空位置填充 N/A
  emptyNumberValue: 0, // 数字字段空位置填充 0
  numberFields: ['age'],
})
// [{ name: '张三', age: 16, note: '备注' }, { name: '李四', age: 0, note: 'N/A' }]
```
