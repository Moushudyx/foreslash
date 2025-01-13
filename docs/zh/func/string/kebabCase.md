---
prev:
  text: 'pascalCase 大驼峰格式'
  link: './pascalCase'
next:
  text: 'snakeCase 蛇行格式'
  link: './snakeCase'
---

# kebabCase

将想要转换格式的字符串(一般是变量名或字段名)处理成串行格式(短横线连接)

## 基本用法

第一个参数传入字符串，第二个参数传入转换配置

- `keepLetterCase` 是否保留原来的大小写, 默认为否
- `keepNumber` 是否保留数字, 默认为是

```js
// 默认情况 不保留大小写 保留数字
kebabCase("getTestUuid1234") // "get-test-uuid-1234"
// 保留大小写 保留数字
kebabCase("getTestUuid1234", { keepLetterCase: true }) // "get-Test-UUID-1234"
// 保留大小写 不保留数字
kebabCase("getTestUuid1234", { keepLetterCase: true, keepNumber: false }) // "get-Test-UUID"
```

