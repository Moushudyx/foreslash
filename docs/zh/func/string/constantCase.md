---
prev:
  text: 'titleCase 标题格式'
  link: './titleCase'
next:
  text: 'splitWords 词分割'
  link: './splitWords'
---

# constantCase

<VersionTag version="0.3.8" />

将想要转换格式的字符串(一般是变量名或字段名)处理成常量格式(全大写、下划线分割)

## 基本用法

第一个参数传入字符串，第二个参数传入转换配置

- `keepNumber` 是否保留数字, 默认为是

```js
// 默认情况 保留数字
constantCase("getTestUuid1234") // "GET_TEST_UUID_1234"
// 不保留数字
constantCase("getTestUuid1234", { keepNumber: false }) // "GET_TEST_UUID"
// 非字母数字的字符均视为分隔符
constantCase("user-name__id") // "USER_NAME_ID"
```
