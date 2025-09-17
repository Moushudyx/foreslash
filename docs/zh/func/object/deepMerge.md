---
prev:
  text: 'deepClone 深拷贝'
  link: './deepClone'
next:
  text: 'isEmpty 判断为空'
  link: './isEmpty'
---

# deepMerge

<VersionTag version="0.3.0" />

`deepMerge` 可以合并两个对象, 返回合并后的新对象, 可以指定合并的规则实现更多复杂效果

作为基底的对象称为**目标对象**(`target`), 往之合并内容的对象称为**来源对象**(`source`)

默认的合并逻辑:
- 普通对象、`FormData` 这类对象会**递归合并**
  - `{ a: { b: 1 } }` 和 `{ a: { c: 2 } }` 会合并为 `{ a: { b: 1, c: 2 } }`
- 数组会以**拼接**的方式合并
  - `{ a: [1, 2] }` 和 `{ a: [3, 4] }` 会合并为 `{ a: [1, 2, 3, 4] }`
- `Set`、`Map` 会**直接**合并, 其中 `Map` 合并时来源对象会覆盖目标对象相同 Key 的值
  - `Set` 和 `Map` 视为**不同类型**, 会用来源对象的值**覆盖**
- `Set` 和数组会互相**合并**
  - `{ a: [1, 2] }` 和 `{ a: Set([3, 4]) }` 会合并为 `{ a: [1, 2, 3, 4] }`
  - `{ a: Set([1, 2]) }` 和 `{ a: [3, 4] }` 会合并为 `{ a: Set([1, 2, 3, 4]) }`
- 来源对象的基本类型值不会覆盖对象
- 来源对象的空值(`null`、`undefined`)不会覆盖其他类型的值
- 来源对象的非空值会覆盖目标对象的空值(目标对象不存在某个键时也视为空值)
- 其他情况: 不同类型、原始类型、其他不能合并/拼接的值会以来源对象的为准作覆盖

## 基本用法

第三个参数是配置信息, 有两个可配置项:
- `typeStrategy`: 针对不同的类型设置不同的合并规则, 详见[下一节](#配置合并规则)
- `cloneOptions`: `deepMerge` 内部使用 `deepClone` 拷贝值, 这里可以配置, 详见[deepClone](./deepClone)

```js
const formData = new FormData()
formData.append('a', '1')
formData.append('b', '2')
const obj1 = { arr: [1, 2], a: { b: { c: [1], d: '1', e: 1 } }, g: {}, h: new FormData() }
const obj2 = { arr: [3], a: { b: { c: [2], d: '2', f: 2 } }, g: formData, h: { a: 1, b: 2 } }
const mergeObj = deepMerge(obj1, obj2)
/*
mergeObj 最终结果如下:
{
  arr: [1, 2, 3], // 数组会拼接
  a: { b: { c: [1, 2], d: '2', e: 1, f: 2 } }, // 对象会递归合并
  g: { a: '1', b: '2' }, // FormData 合并到普通对象上
  h: FormData({ "a": "1", "b": "2" }) // 普通对象合并到 FormData 上
}
*/
```

## 配置合并规则

可以根据类型配置不同的策略, 策略可以是 `"keep"` `"override"` 或者一个方法
- `"keep"` 保留目标对象的值
- `"override"` 保留来源对象的值

传入方法:
  - 类型 `(param: { target: any; source: any; path: (string | symbol)[]; unhandledValue: any; map: Map<any, any> }) => any`
  - `target` 当前目标对象上这个位置的值
  - `source` 当前来源对象上这个位置的值
  - `path` 当前处理的值在对象上的位置
  - `map` 用于处理循环引用等情况的 Map 对象
  - `unhandledValue` 将这个值返回, 可以跳过处理, 交给兜底逻辑
  - 返回值: 合并后的对象

合并类型: 一个字符串 `${来源对象值类型}2${目标对象值类型}`, 常见类型见下
  - 基本类型 `"Number"` `"String"` `"Boolean"` `"Symbol"` `"BigInt"` `"Null"` `"Undefined"`
  - 常见对象 `"Object"` `"Array"` `"Set"` `"Map"` `"FormData"` `"Date"` `"RegExp"` `"Promise"`
  - 函数 `"Function"`
    - 这些均视为函数 `"AsyncFunction"` `"GeneratorFunction"`, 不能拿来用
  - 生成器函数运行后得到生成器 `"Generator"`
  - 迭代器 `"Iterator"`
    - 这些均视为迭代器, 不能拿来用
    - `"String Iterator"` `"Array Iterator"` `"RegExp String Iterator"`
    - `"Map Iterator"` `"Set Iterator"` `"Segmenter String Iterator"`
    - `"Iterator Helper"`
  - 二进制流&文件 `"ArrayBuffer"` `"Buffer"` `"DataView"` `"Blob"` `"File"`
  - 类型数组 `"TypedArray"`
    - 这些均视为类型数组, 不能拿来用
    - `"Int8Array"` `"Int16Array"` `"Int32Array"`
    - `"Uint8Array"` `"Uint8ClampedArray"` `"Uint16Array"` `"Uint32Array"`
    - `"Float32Array"` `"Float64Array"`
    - `"BigInt64Array"` `"BigUint64Array"`
  - 弱引用 `"WeakSet"` `"WeakMap"` `"WeakRef"`
  - 报错信息 `"Error"`
    - 任意类型的错误视为报错信息
  - 其他类型 `"Any"` 表示所有类型(用于兜底), 空类型 `"Empty"` 表示目标对象上没有这个键
    - `"Empty"` 不会出现在来源对象上, 因此只会有 `"Any2Empty"`, 而不会有 `"Empty2Any"`

策略优先级:
  - 精确指定优先级最高: 如 `"Object2Object"` 优先于 `"Object2Any"`
  - 来源对象精确指定优先级高: 如 `"Object2Any"` 优先于 `"Any2Object"`
  - 空类型 `"Empty"` 视为精确指定
    - 注意 `"Empty"` 和 `"Undefined"` 不一样

```js
const obj1 = { a: {}, d: { e: undefined, f: null } }
const obj2 = { a: { b: 1, c: 2 }, d: { e: 3, f: 4 } }
const mergeObj = deepMerge(obj1, obj2, {
  typeStrategy: {
    Number2Empty: 'keep', // 数字 -> 空值 时保留空值
    Number2Null: 'override', // 数字 -> null 时覆盖
    Number2Undefined: 'override', // 数字 -> undefined 时覆盖
  },
})
/*
mergeObj 最终结果如下:
{
  a: {},
  d: { e: 3, f: 4 }
}
*/
```
