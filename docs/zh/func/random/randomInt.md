---
prev:
  text: 'randomChoice 随机抽选'
  link: './randomChoice'
next:
  text: 'randomString 随机字符串'
  link: './randomString'
---

# randomInt

生成指定范围内的随机整数

## 基本用法

传入上下界, 返回一个在 `[min, max]` 范围内的随机整数

- 如果要不包含上界, 请使用 `randomIntFloor`

```js
randomInt(1, 10) // 1 2 ... 9 10
randomInt(25, 50) // 25 26 ... 49 50
```

## randomIntFloor

传入上下界, 返回一个在 `[min, max)` 范围内的随机整数

- 不含上界, 适用于随机抽选数组下标的场景 `randomIntFloor(0, arr.length)`

```js
randomIntFloor(1, 10) // 1 2 ... 8 9
randomIntFloor(25, 50) // 25 26 ... 48 49
```
