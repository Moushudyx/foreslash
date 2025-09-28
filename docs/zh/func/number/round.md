---
prev:
  text: 'lerp 线性插值'
  link: './lerp'
next: false
---

# round

<VersionTag version="0.3.2" />

根据指定的精度修约一个数值, 输出字符串, 类似 [format](./format) 方法

- 提供四舍五入、四舍六入五成双、向下取整、向上取整共计 4 种修约方式
- 与 JavaScript 的 `toFixed` 方法不同, `round` 方法**不会出现浮点误差**

```js
(10.995).toFixed(2) // '10.99' 浮点误差
round(10.995, 2) // '11.00'
```

## 基本用法

第一个参数接受一个数字(或字符串), 第二个参数接受修约精度, 第三个参数指定修约规则(默认使用四舍五入)

- 修约精度不能小于 0

```js
// 默认使用四舍五入
round(1.95, 1) // '2.0'
round('1.985', 2) // '1.99'
// 无法辨认的数字, 输出值为字符串 NaN
format(NaN) // NaN
format('Not a Number') // NaN
// 正负无穷大, 返回其字符串格式
format(Infinity) // Infinity
format('-Infinity') // -Infinity
```

## 数值修约规则

数值修约规则共有如下四个取值, 默认配置是四舍五入

- `'round'` 四舍五入
- `'banker'` 四舍六入五成双, 一般用于科学计算
- `'floor'` 向下取整
- `'ceil'` 向上取整

```js
// 四舍五入
round(1.95, 1, 'round') // '2.0'
round('1.95', 1, 'round') // '2.0'
// 四舍六入五成双
round('1.85', 1, 'banker') // '1.8'
round('1.95', 1, 'banker') // '2.0'
// 向下取整
round('1.95', 1, 'floor') // '1.9'
round(-1.95, 1, 'floor') // '-2.0'
// 向上取整
round('1.95', 1, 'ceil') // '2.0'
round(-1.95, 1, 'ceil') // '-1.9'
```

## 内部方法

内部使用的 4 个数值修约方法也导出了, 你可以使用这几个方法实现自己的数值修约函数

```typescript
// 四舍五入
function roundBase(integer: string, fractional: string, precision: number): [integer: string, fractional: string]
// 四舍六入五成双
function roundBank(integer: string, fractional: string, precision: number): [integer: string, fractional: string]
// 向下取整
function roundFloor(integer: string, fractional: string, precision: number, isNegative: boolean): [integer: string, fractional: string]
// 向上取整
function roundCeil(integer: string, fractional: string, precision: number, isNegative: boolean): [integer: string, fractional: string]
```

```js
// 四舍五入
roundBase('1', '34', 1, false) // ['1', '3']
roundBase('1', '35', 1, false) // ['1', '4']
roundBase('1', '36', 1, false) // ['1', '4']

// 四舍六入, 如果后一位是 5(000...) 则看前一位, 凑偶数
roundBank('1', '34', 1, false) // ['1', '3']
roundBank('1', '35', 1, false) // ['1', '4'] 五成双
roundBank('1', '36', 1, false) // ['1', '4']
roundBank('1', '44', 1, false) // ['1', '4']
roundBank('1', '45', 1, false) // ['1', '4'] 五成双
roundBank('1', '450001', 1, false) // ['1', '5'] 后一位比 5(000...) 多所以仍然进位
roundBank('1', '46', 1, false) // ['1', '5']

// 向下取整
roundFloor('1', '34', 1, false) // ['1', '3']
roundFloor('1', '35', 1, false) // ['1', '3']
// 向下取整与符号有关 向更小的数字进位
roundFloor('1', '34', 1, true) // ['1', '4']
roundFloor('1', '35', 1, true) // ['1', '4']

// 向上取整
roundCeil('1', '34', 1, false) // ['1', '4']
roundCeil('1', '35', 1, false) // ['1', '4']
// 向上取整与符号有关 向更大的数字进位
roundCeil('1', '34', 1, true) // ['1', '3']
roundCeil('1', '35', 1, true) // ['1', '3']
```
