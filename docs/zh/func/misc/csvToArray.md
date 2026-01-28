---
prev: false
next:
  text: 'csvToObjectList CSV 转对象列表'
  link: './csvToObjectList'
---

# csvToArray

<VersionTag version="0.3.9" />

将 CSV 字符串解析为二维数组

## 基本用法

```JS
csvToArray('姓名,年龄\n张三,16\n李四,25')
// [['姓名', '年龄'], ['张三', '16'], ['李四', '25']]
```

## 引号与换行

支持双引号包裹字段，内部双引号用两个双引号转义；引号内允许换行

```JS
const csv = 'a,"b,c","d""e","line\nbreak"\n1,2,3,4'
csvToArray(csv)
// [['a','b,c','d"e','line\nbreak'], ['1','2','3','4']]
```

> 若 CSV 字符串以 UTF-8 BOM 开头，会自动忽略 BOM

## 配置项

第二个参数可传入字符串（表示分隔符），也可传入配置对象：

- `delimiter` 分隔符，默认 `,`
- `skipEmptyLines` 是否跳过空行，默认 `true`

```JS
csvToArray('a;b\n\nb;c', { delimiter: ';', skipEmptyLines: false })
// [['a','b'], [''], ['b','c']]
```
