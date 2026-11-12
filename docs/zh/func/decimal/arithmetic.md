---
prev:
  text: '快速开始'
  link: './getting-started'
next:
  text: '精度与舍入'
  link: './precision'
---

# 算术与比较

<VersionTag version="0.4.0" />

## 算术运算

算术方法接受 ForeNumber 支持的输入类型, 并返回新的 ForeNumber 实例

每组方法均提供短别名：

| 运算 | 方法 | 别名 |
| --- | --- | --- |
| 加法 | `plus` | `add` |
| 减法 | `minus` | `sub` |
| 乘法 | `multiply` | `mul` |
| 除法 | `dividedBy` | `div` |
| 取模 | `modulo` | `mod` |

```ts
import { ForeNumber } from 'foreslash'

const value = new ForeNumber('10.5')

value.plus('2.25').toString() // '12.75'
value.multiply('3').toString() // '31.5'
value.div('4').toString() // '2.625'
value.mod('4').toString() // '2.5'
```

取模采用截断除法余数语义, 与 JavaScript `%` 一致; 除法结果的小数位数由全局配置中的 `divisionPrecision` 控制; 算术结果还会受 `precision` 有效数字精度限制, 详见[精度与舍入](./precision)

## 比较

比较方法返回布尔值：

| 比较 | 方法 | 别名 |
| --- | --- | --- |
| 相等 | `equals` | `equalTo`、`eq` |
| 大于 | `greaterThan` | `gt` |
| 小于 | `lessThan` | `lt` |
| 大于等于 | `greaterThanOrEqual` | `gte` |
| 小于等于 | `lessThanOrEqual` | `lte` |

```ts
const value = new ForeNumber('10000000000000000001')

value.gt('10000000000000000000') // true
value.eq('10000000000000000001') // true
```

`NaN` 与任何值比较（包括自身）都返回 `false`

## 一元运算与修约

`negated`（别名 `neg`）返回相反数, `absoluteValue`（别名 `abs`）返回绝对值; `rounded`（别名 `round`）按指定的小数位数修约; 省略修约模式时使用全局 `rounding` 配置

```ts
new ForeNumber('-12.5').abs().toString() // '12.5'
new ForeNumber('123.456').round(2).toString() // '123.46'
```

修约模式和负数精度的行为见[精度与舍入](./precision)
