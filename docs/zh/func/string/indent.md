---
prev:
  text: 'dedent 取消缩进'
  link: './dedent'
next: false
---

# indent

<VersionTag version="0.3.1" />

给字符串添加缩进, 一般用于大段文字的处理

## 基本用法

有两种基本用法, 虽然写法不一致, 默认参数值是一致的

- 默认缩进数量 `2`
- 默认缩进字符 `' '`(一个空格)
- 默认忽略空行

```js
// 默认写法
indent('a\n  b\n\nc')
/* 结果:
  a
    b

  c
*/

// 简易写法
indent('a\n  b\n\nc', 3, '*')
/* 结果:
***a
***  b

***c
*/

// 复杂写法
indent('a\n  b\n\nc', { count: 3, indentStr: '*' })
/* 结果:
***a
***  b

***c
*/

// 复杂写法 不忽略空行
indent('a\n  b\n\nc', { count: 3, indentStr: '*', ignoreEmptyLine: false })
/* 结果:
***a
***  b
***
***c
*/
```
