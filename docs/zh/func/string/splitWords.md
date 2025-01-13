---
prev:
  text: 'snakeCase 蛇行格式'
  link: './snakeCase'
next: false
---

# splitWords

将想要转换格式的字符串(一般是变量名或字段名)分割成字符串数组

## 基本用法

这个方法是专门为程序员设计的, 因此会将**任何非字母数字的字符**视为分割符

```js
// 分割变量名
splitWords("getTestUUID1234") // ["get", "Test", "UUID", "1234"]
// 按常见分割符分割
splitWords("user_nick-name") // ["user", "nick", "name"]
// 所有非字母数字的字符均视为分割符
splitWords("A文字B🎈C= =Test") // ["A", "B", "C", "Test"]
```
