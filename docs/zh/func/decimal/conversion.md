---
prev:
  text: '幂与根'
  link: './power'
next: false
---

# 格式转换

<VersionTag version="0.4.0" />

## 十进制字符串与原生 number

`toString()` 和 `toJSON()` 返回十进制字符串

ForeNumber 可以保留原生 `number` 难以精确表示的十进制输入; 使用 `toNumber()` 会转换回 JavaScript `number`, 可能丢失精度或溢出

```ts
import { ForeNumber } from 'foreslash'

const value = new ForeNumber('90071992547409931234.5')

value.toString() // '90071992547409931234.5'
value.toNumber() // 转为原生 number, 可能不再精确
JSON.stringify(value) // '"90071992547409931234.5"'
```

## 科学计数法

`toExponential(precision?, round?)`（别名 `toExp`）返回科学计数法字符串; 参数分别用于设置精度和舍入模式

```ts
new ForeNumber('12345.6789').toExponential(2) // '1.23e+4'
```

## 二进制、八进制与十六进制

| 方法 | 别名 | 目标进制 |
| --- | --- | --- |
| `toBinary(precision?)` | `toBin` | 二进制 |
| `toOctal(precision?)` | `toOct` | 八进制 |
| `toHexadecimal(precision?)` | `toHex` | 十六进制 |

`precision` 指最多转换的小数位数, 默认 `32`; 小数部分超出时截断, 不进行舍入

结果不包含 `0b`、`0o` 或 `0x` 前缀, 十六进制字母为小写, 末尾多余的零会移除; 整数部分不受该参数限制

```ts
new ForeNumber('10.5').toBinary() // '1010.1'
new ForeNumber('10').toHex() // 'a'
new ForeNumber('0.1').toBinary(8) // 截断为最多 8 位二进制小数
```

这些转换直接基于 ForeNumber 的数值表示进行, 为保证精度, 不会一次性转换成原生 `number` 来处理

`precision` 必须是非负整数
