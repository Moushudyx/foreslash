---
prev:
  text: 'randomInt 随机数字'
  link: './randomInt'
next:
  text: 'shuffle 打乱数组'
  link: './shuffle'
---

# randomString

生成指定长度的随机字符串

## 基本用法

第一个参数指定字符串长度, 第二个参数指定字符集

- 第二个参数非必填, 默认为所有大小写字母和数字
- 第二个参数不会做去重处理, 因此可以通过调节重复字符数量来粗略调节权重
  - 如果需要细致调节权重, 请使用 [randomChoice](./randomChoice)

```js
randomString(16) // "jl1hUb9lyGo3yAib"
randomString(8, '136') // "13366161"
```

## randomHexString

生成指定长度的随机十六进制字符串（**小写**）

只接受指定字符串长度一个参数

- 性能比 `randomString` 要高不少

```js
randomHexString(16) // "3b78ae1b7433a461"
```
