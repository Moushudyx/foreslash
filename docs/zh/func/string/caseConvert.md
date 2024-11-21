---
prev: false
next:
  text: 'splitWords 词分割'
  link: './splitWords'
---

# caseConvert

将想要转换格式的字符串(一般是变量名或字段名)处理成需要的格式

## 基本用法

这个方法是专门为程序员设计的, 因此会将**任何非字母数字的字符**视为分割符

```js
// 如果没有指定返回值的分割符, 则默认不分割
caseConvert("A文字B🎈C=-=Test") // "ABCTest"

// 使用短划线分割
caseConvert("getTestUUID1234", "-") // "get-Test-UUID-1234"

// 可以指定每个子字符串的处理方式
caseConvert("user_nick_name", " ", ({ code }) => code.toUpperCase()) // "USER NICK NAME"
```

## caseCamel

封装好的转换方法, 转换为小驼峰格式

- 第二个参数指示是否保留原来的大小写, 默认不保留
- 第三个参数指示是否保留数字, 默认保留

```js
// 默认情况 不保留大小写 保留数字
caseCamel("get-Test-UUID-1234") // "getTestUuid1234"
// 保留大小写 保留数字
caseCamel("get-Test-UUID-1234", true) // "getTestUUID1234"
// 保留大小写 不保留数字
caseCamel("get-Test-UUID-1234", true, false) // "getTestUUID"
```

## casePascal

封装好的转换方法, 转换为大驼峰格式, 参数同上

```js
// 默认情况 不保留大小写 保留数字
casePascal("get-Test-UUID-1234") // "GetTestUuid1234"
// 保留大小写 保留数字
casePascal("get-Test-UUID-1234", true) // "GetTestUUID1234"
// 保留大小写 不保留数字
casePascal("get-Test-UUID-1234", true, false) // "GetTestUUID"
```

## caseKebab

封装好的转换方法, 转换为串行格式(短横线连接), 参数同上

```js
// 默认情况 不保留大小写 保留数字
caseKebab("getTestUuid1234") // "get-test-uuid-1234"
// 保留大小写 保留数字
caseKebab("getTestUuid1234", true) // "get-Test-UUID-1234"
// 保留大小写 不保留数字
caseKebab("getTestUuid1234", true, false) // "get-Test-UUID"
```


## caseSnake

封装好的转换方法, 转换为蛇行格式(下划线连接), 参数同上

```js
// 默认情况 不保留大小写 保留数字
caseSnake("getTestUuid1234") // "get_test_uuid_1234"
// 保留大小写 保留数字
caseSnake("getTestUuid1234", true) // "get_Test_UUID_1234"
// 保留大小写 不保留数字
caseSnake("getTestUuid1234", true, false) // "get_Test_UUID"
```

