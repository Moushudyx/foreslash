---
prev:
  text: '概览'
  link: './index'
next:
  text: '算术与比较'
  link: './arithmetic'
---

# 快速开始

<VersionTag version="0.4.0" />

## 创建实例

从 Foreslash 导入 `ForeNumber`, 构造函数接受 `number`、`string`、`bigint` 或另一个 ForeNumber 实例

```ts
import { ForeNumber } from 'foreslash'

const amount = new ForeNumber('12345678901234567890.1234')
const integer = new ForeNumber(123n)
const copy = new ForeNumber(amount)
```

需要精确保留输入时, 优先使用字符串或 `bigint`

若传入的 `number` 字面量超出了 JavaScript 能精确表示的范围(双精度浮点数), ForeNumber 无法恢复在构造前丢失的精度

## 运算与检查

运算会返回新的 ForeNumber 实例, 不会修改原实例, 因此可以链式调用

```ts
const result = new ForeNumber('12.5')
  .plus('0.5')
  .multiply('2')
  .dividedBy('3')

result.toString()
```

实例提供 `isNaN`、`isFinite` 和 `isInteger` 属性; 对应的静态方法 `ForeNumber.isNaN(value)`、`ForeNumber.isFinite(value)` 和 `ForeNumber.isInteger(value)` 可直接检查输入

```ts
ForeNumber.isInteger('12345678901234567890') // true
new ForeNumber('NaN').isNaN // true
new ForeNumber('Infinity').isFinite // false
```

`ForeNumber.pi` 和 `ForeNumber.e` 分别提供圆周率和自然对数底数的 ForeNumber 实例

下一步可查看[算术与比较](./arithmetic)以及[精度与舍入](./precision)
