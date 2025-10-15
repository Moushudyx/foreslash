---
prev:
  text: 'decimalNotation 十进制展示'
  link: './decimalNotation'
next:
  text: 'format 格式化'
  link: './format'
---

# scientificNotation

<VersionTag version="0.3.3" />

将一个数字转换为科学计数法表示的字符串, 可以根据使用场景不同更改输出形式

如果输入的是 `NaN` `Infinity` 这种无法正常表示的数字则直接返回其字符串格式

## 基本用法

第一个参数接受一个数字(或字符串), 第二个参数接受格式化配置

```js
// 默认配置
scientificNotation(1e12) // 1×10¹²
scientificNotation(-2.33e-8) // -2.33×10⁻⁸
// 无法辨认的数字, 输出值为字符串 NaN
scientificNotation(NaN) // NaN
scientificNotation('Not a Number') // NaN
// 正负无穷大, 返回其字符串格式
scientificNotation(Infinity) // Infinity
scientificNotation('-Infinity') // -Infinity
```

## 格式化配置

格式化具体配置如下, 默认配置是 `unicode` 模式、无数值修约

四种数值修约方法可以参考 [round](./round) 方法的文档

- `type` 类型, 默认为 `'unicode'`
  - `'unicode'` 指数部分使用 Unicode 表示 `1.23×10⁴⁵⁶`
  - `'exp'` 用指数表示法, 用 `e` 替换 `×10` 部分 `1.23e+456`
  - `'js'` 适合用于 JavaScript 的算式 `1.23*10**456`
  - `'code'` 适合用于其他计算机语言的算式 `1.23*10^456`
  - `'html'` 适合用于 HTML 展示的字符串 `1.23&#x00d7;10<sup>456</sup>`
    - 示例: 1.23&#x00d7;10<sup>456</sup>
  - `'json'` 一个 JSON 字符串, 可以自由处理 `{"number":1.23,"exp":456}`
- `precision` 小数精度, 默认无数值修约
- `round` 数值修约规则, 默认无数值修约
  - `'round'` 四舍五入
  - `'banker'` 四舍六入五成双, 一般用于科学计算
  - `'floor'` 向下取整
  - `'ceil'` 向上取整

```js
// 指定输出类型
scientificNotation(1.234e-6, { type: 'exp' }) // 1.234e-6
scientificNotation(1.234e6, { type: 'exp' }) // 1.234e+6
scientificNotation(6.534e-6, { type: 'code' }) // 6.534*10^-6
scientificNotation(6.534e6, { type: 'code' }) // 6.534*10^6
scientificNotation(-4.321e-8, { type: 'html' }) // -4.321&#x00d7;10<sup>-8</sup>
scientificNotation(-4.321e8, { type: 'html' }) // -4.321&#x00d7;10<sup>8</sup>
scientificNotation(-9.87e-9, { type: 'json' }) // {"number":"-9.87","exp":-9}
scientificNotation(-9.87e9, { type: 'json' }) // {"number":"-9.87","exp":9}
// 指定小数点后的位数及数值修约规则
scientificNotation(1.235e6, { type: 'exp', precision: 2 }) // 1.24e+6
scientificNotation(6.545e-6, { type: 'code', precision: 2, round: 'banker' }) // 6.54*10^-6
scientificNotation(-9.87e9, { type: 'json', precision: 1, round: 'floor' }) // {"number":"-9.9","exp":9}
```
