---
prev:
  text: 'clamp 限制范围'
  link: './clamp'
next:
  text: 'scientificNotation 科学计数法'
  link: './scientificNotation'
---

# decimalNotation

<VersionTag version="0.3.2" />

将一个数字转换为正常的十进制计数法表示的字符串

如果输入的是 `NaN` `Infinity` 这种无法正常表示的数字则直接返回其字符串格式

## 基本用法

仅接受一个参数, 即要转换的数字, 可以输入字符串

```js
decimalNotation(1e12) // 1000000000000
decimalNotation('-2.33e8') // -233000000
decimalNotation(1.234e-6) // 0.000001234
decimalNotation(-4.321e-8) // -0.00000004321
decimalNotation('-1123e-12') // -0.000000001123
// 无法辨认的数字, 输出值为字符串 NaN
decimalNotation(NaN) // NaN
decimalNotation('Not a Number') // NaN
// 正负无穷大, 返回其字符串格式
decimalNotation(Infinity) // Infinity
decimalNotation('-Infinity') // -Infinity
```
