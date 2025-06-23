---
prev:
  text: 'capitalize 首字母大写'
  link: './capitalize'
next:
  text: 'pascalCase 大驼峰格式'
  link: './pascalCase'
---

# camelCase

将想要转换格式的字符串(一般是变量名或字段名)处理成小驼峰格式

## 基本用法

第一个参数传入字符串，第二个参数传入转换配置

- `keepLetterCase` 是否保留原来的大小写, 默认为否
- `keepNumber` 是否保留数字, 默认为是

```js
// 默认情况 不保留大小写 保留数字
camelCase("get-Test-UUID-1234") // "getTestUuid1234"
// 保留大小写 保留数字
camelCase("get-Test-UUID-1234", { keepLetterCase: true }) // "getTestUUID1234"
// 保留大小写 不保留数字
camelCase("get-Test-UUID-1234", { keepLetterCase: true, keepNumber: false }) // "getTestUUID"
```
