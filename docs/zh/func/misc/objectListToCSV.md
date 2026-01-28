---
prev:
  text: 'arrayToCSV 二维数组转 CSV'
  link: './arrayToCSV'
next:
  text: 'acceptableFileName 检查拓展名'
  link: './acceptableFileName'
---

# objectListToCSV

<VersionTag version="0.3.9" />

根据对象列表和字段映射生成 CSV 字符串，底层使用 `arrayToCSV` 处理转义

## 基本用法

第二个参数为字段映射数组，每一项是 `[对象字段名, CSV 列名]`

当对象缺少对应字段时会填充为空字符串

```JS
const objList = [
  { name: '张三', age: 16, city: '上海' },
  { name: '李四', age: 25, city: '新加坡' },
]
const fields = [
  ['name', '姓名'],
  ['age', '年龄'],
  ['city', '城市'],
]

objectListToCSV(objList, fields)
// 姓名,年龄,城市
// 张三,16,上海
// 李四,25,新加坡
```

## 自定义分隔符

可以通过第三个参数自定义分隔符

```JS
const fields = [
  ['name', '姓名'],
  ['city', '城市'],
  ['note', '备注'],
]

objectListToCSV([
  { name: '王五', city: '北;京' },
  { name: '赵六', note: '包含"引号"' },
], fields, ';')
// 姓名;城市;备注
// 王五;"北;京";
// 赵六;;"包含""引号"""
```

## 配置项

第三个参数可传分隔符字符串（表示分隔符），也可传配置对象，选项同 `arrayToCSV`：

- `delimiter` 分隔符，默认 `,`
- `bom` 是否在开头添加 UTF-8 BOM
- `newline` 换行符 `\n` 或 `\r\n`
- `quoteAll` 是否为每个单元格都添加引号

```JS
objectListToCSV([
  { name: 'A', note: 'x' },
  { name: 'B', note: 'y' },
], [
  ['name', '姓名'],
  ['note', '备注'],
], { bom: true, quoteAll: true })
// \uFEFF"姓名","备注"
// "A","x"
// "B","y"
```
