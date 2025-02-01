---
prev:
  text: 'kebabCase 串行格式'
  link: './kebabCase'
next:
  text: 'titleCase 标题格式'
  link: './titleCase'
---

# snakeCase

将想要转换格式的字符串(一般是变量名或字段名)处理成蛇行格式(下划线连接)

## 基本用法

第一个参数传入字符串，第二个参数传入转换配置

- `keepLetterCase` 是否保留原来的大小写, 默认为否
- `keepNumber` 是否保留数字, 默认为是

```js
// 默认情况 不保留大小写 保留数字
snakeCase("getTestUuid1234") // "get_test_uuid_1234"
// 保留大小写 保留数字
snakeCase("getTestUuid1234", { keepLetterCase: true }) // "get_Test_UUID_1234"
// 保留大小写 不保留数字
snakeCase("getTestUuid1234", { keepLetterCase: true, keepNumber: false }) // "get_Test_UUID"
```

