---
prev:
  text: 'snakeCase 蛇行格式'
  link: './snakeCase'
next:
  text: 'splitWords 词分割'
  link: './splitWords'
---

# titleCase

<VersionTag version="0.2.0" />

将想要转换格式的字符串(一般是变量名或字段名)处理成标题格式(空格分割, 每个单词首字母大写)

## 基本用法

第一个参数传入字符串，第二个参数传入转换配置

- `keepLetterCase` 是否保留原来的大小写, 默认为否
- `keepNumber` 是否保留数字, 默认为是

```js
// 默认情况 不保留大小写 保留数字
titleCase("getTestUuid1234") // "Get Test Uuid 1234"
// 保留大小写 保留数字
titleCase("getTestUUID1234", { keepLetterCase: true }) // "Get Test UUID 1234"
// 保留大小写 不保留数字
titleCase("getTestUUID1234", { keepLetterCase: true, keepNumber: false }) // "Get Test UUID"
```

