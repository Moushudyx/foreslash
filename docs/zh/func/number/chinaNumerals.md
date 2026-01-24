---
prev:
  text: 'format 格式化'
  link: './format'
next:
  text: 'romanNumerals 罗马数字'
  link: './romanNumerals'
---

# chinaNumerals

<VersionTag version="0.3.7" />

<ChinaNumerals />

将一个数字转换为汉语表达，支持小写/大写/自定义字符，以及中数、下数、上数三种表示法。

## 基本用法

第一个参数接受一个数字（或字符串），第二个参数接受格式化配置。

```js
// 默认（习惯写法，type: 'normal'，numeralsType: 'normal'）
chinaNumerals(0) // 零
chinaNumerals(2025) // 二千零二十五

// 大写/小写
chinaNumerals(2025, { type: 'upper' }) // 贰仟零贰拾伍
chinaNumerals(1002003, { type: 'lower' }) // 一百万二千〇三

// 小数与单位
chinaNumerals(12345.678, { integerUnit: '元', dot: '', fractionalUnits: ['角', '分', '厘'] })
// 一万二千三百四十五元六角七分八厘

// 下数表示法
chinaNumerals(123456789.89, { numeralsType: 'minio' })
// 一垓二京三兆四亿五万六千七百八十九点八九

// 上数表示法
chinaNumerals(1234_5678_9012_3456, { numeralsType: 'mega' })
// 一千二百三十四万亿五千六百七十八亿九千零一十二万三千四百五十六

// 特殊数值
chinaNumerals(NaN) // NaN
chinaNumerals(Infinity) // Infinity
chinaNumerals(-Infinity) // -Infinity
```

## 格式化配置

- `type`: 数字字符类型；默认 `'normal'`。
  - `'normal'`: 习惯写法（除 0 使用“零”外均用常规小写）。
  - `'lower'`: 小写（0 使用“〇”）。
  - `'upper'`: 大写（零壹贰叁…）。
  - `'custom'`: 自定义字符；需配合 `customNumerals` 与 `customUnits`。

- `numeralsType`: 数字表示法；默认 `'normal'`。
  - `'normal'`: 中数表示法（万、亿、兆、京）。
  - `'minio'`: 下数表示法（十万为亿、十亿为兆、十兆为京）。
  - `'mega'`: 上数表示法（万万为亿、亿亿为兆、兆兆为京）。

- `customNumerals`: 自定义数字字符（长度必须为 10），例如 `'零壹贰叁肆伍陆柒捌玖'`。仅当 `type: 'custom'` 生效。

- `customUnits`: 自定义单位字符，前 3 位固定表示十/百/千，其后单位随 `numeralsType` 规则组合，例如 `'拾百千万亿兆京垓秭穰沟涧正载'`。仅当 `type: 'custom'` 生效。

- `integerUnit`: 整数部分单位（例如 `'元'`、`'块'`），默认 `''`。

- `dot`: 小数点字符，默认 `'点'`。

- `fractionalUnits`: 小数位单位数组（如 `['角', '分', '厘']`），超出长度不再追加单位。

```js
// 自定义字符
chinaNumerals(2025, { type: 'custom', customNumerals: '0123456789', customUnits: '拾百千万亿兆京' })
// 2千02拾5

// 自定义单位与小数点/小数单位
chinaNumerals(1002.3, { integerUnit: '块', dot: '又', fractionalUnits: ['毛'] })
// 一千零二块又三毛

// 上数表示法示例（自定义单位）
chinaNumerals(1e32, { numeralsType: 'mega', customUnits: '十百千万亿兆京' })
// 一京
```

## 错误与边界

- 当 `type: 'custom'` 且 `customNumerals` 未提供或长度不为 10 时抛错。
- 对无法解析的输入，返回 `'NaN'`；对正负无穷大，返回 `'Infinity'` / `'-Infinity'`。
