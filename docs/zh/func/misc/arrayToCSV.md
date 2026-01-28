---
prev:
  text: 'csvToObjectList CSV 转对象列表'
  link: './csvToObjectList'
next:
  text: 'objectListToCSV 对象列表转 CSV'
  link: './objectListToCSV'
---

# arrayToCSV

将二维数组转换为 CSV 格式的字符串，可自定义分隔符，默认使用逗号 `,`

## 基本用法

传入二维数组，返回 CSV 字符串

```JS
arrayToCSV([
  ['姓名', '年龄'],
  ['张三', 16],
  ['李四', 25],
])
// 姓名,年龄
// 张三,16
// 李四,25
```

## 字符转义

<VersionTag version="0.3.9" />

当单元格内包含分隔符、双引号或换行符时，会自动用双引号包裹，并将内部双引号转义为两个双引号

```JS
arrayToCSV([
  ['a;b', 'c"d', 'line\nbreak'],
], ';')
// "a;b";"c""d";"line
// break"
```

## 配置项

第二个参数可传入字符串（表示分隔符），也可传入配置对象：

- `delimiter` 分隔符，默认 `,`
- `bom` 是否在开头添加 UTF-8 BOM，默认 `false`
- `newline` 换行符，支持 `\n` 与 `\r\n`，默认 `\n`
- `quoteAll` 是否为每个单元格都添加引号，默认 `false`

```JS
arrayToCSV([
  ['a', 'b'],
  ['c', 'd'],
], { bom: true, newline: '\r\n', quoteAll: true })
// \uFEFF"a","b"\r\n"c","d"
```

> 若无特殊需求，不要开启 `bom` 选项，以免导致兼容性问题
