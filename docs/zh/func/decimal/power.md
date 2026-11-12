---
prev:
  text: '精度与舍入'
  link: './precision'
next:
  text: '格式转换'
  link: './conversion'
---

# 幂与根

<VersionTag version="0.4.0" />

## 幂运算

`power` (别名 `pow`) 接受 ForeNumber 支持的指数输入, 支持整数指数、可识别的有理数指数和一般实数指数

```ts
import { ForeNumber } from 'foreslash'

new ForeNumber('2').pow('10').toString() // '1024'
new ForeNumber('16').pow('3/4').toString() // '8'
new ForeNumber('-8').pow('1/3').toString() // '-2'
```

可识别的有理数指数是指可以明确表示为分数形式的指数, 例如 `'3/4'` 或 `0.75`

显式分数指数 (形如 `'3/4'`) 使用字符串形式, 分子、分母须在安全整数范围内, 分母不能为零, 且分母受实现上限约束

```ts
new ForeNumber('-4').pow('1/2').toString() // 'NaN' 负数底数的指数若不能得到实数结果, 将返回 NaN
```

`realPowerMode` 默认为 `'approx'`, 允许一般实数幂通过近似计算；设置为 `'strict'` 后, 只允许整数幂和可识别的有理数幂, 其他一般实数幂会抛出错误

```ts
const previous = ForeNumber.config()
ForeNumber.config({ realPowerMode: 'strict' })

new ForeNumber('4').pow('1.5').toString() // '8'
// new ForeNumber('2').pow('0.1234567') 会抛出错误

ForeNumber.config(previous)
```

幂运算精度受 `powerPrecision`、`precision` 和舍入配置共同影响; 整数幂结果为精确整数时, 不会因全局有效数字量化而截断

## 平方根与 n 次方根

`squareRoot`（别名 `sqrt`）计算平方根；`root(degree)` 计算指定次数的根; `degree` 必须是正的安全整数

```ts
new ForeNumber('9').sqrt().toString() // '3'
new ForeNumber('-8').root(3).toString() // '-2'
new ForeNumber('-4').sqrt().toString() // 'NaN'
```

一般实数幂和根运算的结果可能是近似值, 应用应按所需精度设置上下文
