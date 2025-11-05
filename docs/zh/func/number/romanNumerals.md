---
prev:
  text: 'format 格式化'
  link: './format'
next:
  text: 'lerp 线性插值'
  link: './lerp'
---

# romanNumerals

<VersionTag version="0.3.3" />

<RomanNumerals />

将一个整数处理为罗马数字的格式

## 基本用法

第一个参数接受一个数字(或字符串), 第二个参数接受格式化配置

```js
// 默认配置
romanNumerals(1) // I
romanNumerals(4) // IV
romanNumerals(2025) // MMXXV
romanNumerals(2025, { thousand: 'strict' }) // I̅I̅XXV 严格的千分位展示
// 无法辨认的数字, 输出值为字符串 NaN
format(NaN) // NaN
format('Not a Number') // NaN
// 正负无穷大, 返回其字符串格式
format(Infinity) // Infinity
format('-Infinity') // -Infinity
// 输入 0 的时候默认输出 0 (字符串)
romanNumerals(0) // 0
// 输入负数的时候默认输出 0 (字符串)
romanNumerals(-1) // I
romanNumerals(-9) // IX
```

## 格式化配置

格式化具体配置如下, 默认配置是 `unicode` 模式、习惯用法

`type` 类型, 默认为 `unicode`, 以数字 `4090` 为例
  - `'unicode'` 使用 Unicode 表示 `'I̅V̅XC'`
  - `'js'` 适合用于 JavaScript 代码字符串 `'I\\u0305V\\u0305XC'`
  - `'html'` 适合用于 HTML 展示的字符串 `'I&#x0305;V&#x0305;XC'`
  - `'json'` 一个 JSON 字符串, 具体数值是下标^1000 `["XC", "IV"]`

`thousand` 千分位类型, 默认为 `normal`
  - `'normal'` 习惯用法, 超过 3999 的部分才使用上划线区分
  - `'strict'` 严格区分千分位

```js
// 习惯用法, 超过 3999 的部分才使用上划线区分
romanNumerals(2025) // MMXXV
romanNumerals(4001) // I̅V̅I
// 严格区分千分位
romanNumerals(2025, { thousand: 'strict' }) // I̅I̅XXV
romanNumerals(4001, { thousand: 'strict' }) // I̅V̅I
```
