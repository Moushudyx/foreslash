---
prev:
  text: 'splitWords 词分割'
  link: './splitWords'
next:
  text: 'indent 缩进'
  link: './indent'
---

# dedent

<VersionTag version="3.0.1" />

消除字符串的缩进, 一般用于大段文字的处理

## 基本用法

有两种基本用法, 虽然写法不一致, 默认参数值是一致的

- 默认缩进数量 `2`
- 默认缩进字符 `' '`(一个空格)

```js
// 默认写法
dedent('  a\n    b\n\n  c')
/* 结果:
a
  b

c
*/

// 简易写法
dedent('**a\n****b\n\n**c', 3, '*')
/* 结果:
a
*b

c
*/

// 复杂写法
dedent('**a\n****b\n\n**c', { count: 3, indentStr: '*' })
/* 结果:
a
*b

c
*/
```
