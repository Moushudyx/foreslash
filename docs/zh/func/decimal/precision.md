---
prev:
  text: '算术与比较'
  link: './arithmetic'
next:
  text: '幂与根'
  link: './power'
---

# 精度与舍入

<VersionTag version="0.4.0" />

ForeNumber 使用全局上下文控制运算精度; `ForeNumber.config()` 不带参数时读取当前配置；传入部分字段时更新配置并返回更新后的上下文

```ts
import { ForeNumber } from 'foreslash'

const previous = ForeNumber.config()
ForeNumber.config({
  precision: 30,
  divisionPrecision: 20,
  rounding: 'banker',
})

new ForeNumber('1').div('3').toString()
// '0.33333333333333333333'

ForeNumber.config(previous)
```

## 舍入

上下文是类级全局设置, 不是每个实例各自独立的配置; 若仅需对单个值修约, 使用 `rounded(precision, mode)` 方法, 别名 `round`

### 配置项

| 字段 | 默认值 | 作用 |
| --- | --- | --- |
| `precision` | `50` | 加减乘除等算术结果的有效数字精度 |
| `divisionPrecision` | `50` | 除法结果保留的小数位数 |
| `powerPrecision` | `50` | 幂与根运算的精度上限 |
| `rounding` | `'round'` | 运算默认舍入模式；修约方法也会使用此默认值 |
| `realPowerMode` | `'approx'` | 一般实数幂的处理模式, 见[幂与根](./power) |
| `maxExponent` | `1000000` | 预留字段, 当前未接入指数边界检查 |
| `minExponent` | `-1000000` | 预留字段, 当前未接入指数边界检查 |

### 舍入模式

`rounding` 以及 `rounded` 的第二个参数可使用以下模式：

- `'round'`：四舍五入
- `'banker'`：四舍六入五成双, 一般用于科学实验数据处理
- `'floor'`：向下取整, 负数时远离零
- `'ceil'`：向上取整, 负数时向零

```ts
new ForeNumber('2.5').round(0, 'banker').toString() // '2'
new ForeNumber('-2.1').round(0, 'floor').toString() // '-3'
```

修约精度表示保留的小数位数；可以传负数来修约到十位、百位等整数位

```ts
new ForeNumber('12345').round(-2).toString() // '12300'
```
