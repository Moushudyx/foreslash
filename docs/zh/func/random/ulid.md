---
prev:
  text: 'shuffle 打乱数组'
  link: './shuffle'
next:
  text: 'uuid 标准 UUID V4'
  link: './uuid'
---

# ulid

<VersionTag version="0.1.2" />

生成一个标准的 ULID 格式字符串

字符串格式为 `TTTTTTTTTT-RRRRRRRRRRRRRRRR`

- 其中前十个字符为时间戳, 后十六个字符为随机数字
- 使用 Crockford 型的 Base32 字符串转写

随机数字部分默认是单调递增的，即同一时间戳情况下，重复调用时随机数字部分只会增加

## 基本用法

```js
ulid() // 01JCBE3KSY78D1F4Q5BKYZ24X9
ulid() // 01JCBE3KSY78D1F4Q5BKYZ24XA
// 取消单调性
ulid(false) // 01JCBE3KSY2BCEZJSMTQP5DIQE
```

## 指定时间戳

第二个参数可以指定时间戳, 可以在不同设备间同步时间戳

```js
ulid(true, 0) // 0000000000D64N3ZR75CXM1J82
ulid(true, 0) // 0000000000D64N3ZR75CXM1J83
// 取消单调性
ulid(false, 0) // 0000000000Z3VJ5THVXV4ZE6CO
```
