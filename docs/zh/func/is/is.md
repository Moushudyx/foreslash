# 类型守卫

类型守卫相关方法较多, 请使用 `Ctrl` + `F`(Mac 请使用 `Cmd` + `F`) 来查找此页

您也可以使用 `Ctrl` + `K`(Mac 请使用 `Cmd` + `K`) 来搜索整个文档

[[TOC]]

## isArray 数组 {#Array}

判断传入的第一个参数是否为数组 `Array`

```js
isArray([1, 2]) // true
isArray(Array(2)) // true
isArray('abc') // false
isArray({ 0: 1, length: 1 }) // false
```

## isArrayLike 类数组 {#ArrayLike}

判断传入的第一个参数是否为类数组

- 判断依据为是否有合法的 `length`
- 常见的类数组有字符串、`arguments` 对象、`document.querySelectorAll` 的返回值

```js {3,4}
isArrayLike([1, 2]) // true
isArrayLike(Array(2)) // true
isArrayLike('abc') // true
isArrayLike({ 0: 1, length: 1 }) // true
isArrayLike({ 0: 1, length: -1 }) // false
isArrayLike(document.querySelectorAll('a')) // false
```

## isArrayBuffer {#ArrayBuffer}

判断传入的第一个参数是否为 `ArrayBuffer`

```js
isArrayBuffer(new ArrayBuffer(0)) // true
isArrayBuffer([]) // false
isArrayBuffer(Buffer.from('test')) // false
```

## isBigInt 大数 {#BigInt}

判断传入的第一个参数是否为大数类型 `BigInt`

```js
isBigInt(1n) // true
isBigInt(BigInt(1)) // true
isBigInt(1) // false
```

## isBoolean 布尔型 {#Boolean}

判断传入的第一个参数是否为布尔型(`boolean`)

```js
isBoolean(true) // true
isBoolean(false) // true
isBoolean(1) // false
isBoolean(null) // false
```

## isBuffer NodeJs 的 Buffer {#Buffer}

判断传入的第一个参数是否为 NodeJs 的 `Buffer`

- 只在 NodeJs 上生效, 其他任何环境均返回 `false`

```js
isBuffer(Buffer.from('abc')) // true
isBuffer(new ArrayBuffer(0)) // false
isBuffer([]) // false
```

## isDate 日期 {#Date}

判断传入的第一个参数是否为 JS 的 `Date` 对象

```js
isDate(new Date()) // true
isDate(new Date(123456789)) // true
isDate(Date.now()) // false
isDate(Date) // false
isDate({}) // false
```

## isFunction 函数 {#Function}

判断传入的第一个参数是否为函数 `Function`

- 根据 `typeof` 判断, 因此会将箭头函数、异步函数、生成函数等也视为函数

```js
isFunction(Math.max) // true
isFunction(function a() {}) // true
isFunction(function *a() {}) // true
isFunction(() => {}) // true
isFunction({}) // false
```

## isInteger 整数 {#Integer}

判断传入的第一个参数是否为整数

- 会先判断传入的值是否为数字, 如字符串 `"123"` 之类的将返回 `false`

```js
isInteger(1) // true
isInteger(-123) // true
isInteger(1.23) // false
isInteger(NaN) // false
isInteger("123") // false
```

## isIterable 可迭代值 {#Iterable}

判断传入的第一个参数是否可迭代

- 常见的可迭代值有数组、字符串、`Set`、`Map` 等

```js
isIterable([]) // true
isIterable("1") // true
isIterable(new Map()) // true
isIterable(new Set()) // true
isIterable({}) // false
isIterable(null) // false
```

## isMap {#Map}

判断传入的第一个参数是否为 `Map`

```js
isMap(new Map()) // true
isMap(new WeakMap()) // false
isMap(new Set()) // false
isMap([]) // false
```

## isWeakMap {#WeakMap}

判断传入的第一个参数是否为 `WeakMap`

```js
isMap(new WeakMap()) // true
isMap(new Map()) // false
isMap(new Set()) // false
isMap([]) // false
```

## isNil 空值 {#Nil}

判断传入的第一个参数是否为空值

- 这里指 `null` 和 `undefined`
- 传入 `document.all` 之类将返回 `false`

```js
isNil(null) // true
isNil(undefined) // true
isNil(false) // false
isNil('') // false
// 浏览器环境:
isNil(document.all) // false
```

## isNull {#Null}

判断传入的第一个参数是否为 `null`

```js
isNull(null) // true
isNull(undefined) // false
```

## isUndefined 空值 {#Undefined}

判断传入的第一个参数是否为 `undefined`

- 传入 `document.all` 之类将返回 `false`

```js
isUndefined(undefined) // true
isUndefined(null) // false
// 浏览器环境:
isUndefined(document.all) // false
```

## isNumber 数字 {#Number}

判断传入的第一个参数是否为数字

```js
isNumber(123) // true
isNumber(NaN) // true
isNumber('123') // false
isNumber([111]) // false
```

## isObject 对象 {#Object}

判断传入的第一个参数是否为对象

- 判据为 `typeof` 结果是否为 `object`, 且不为 `null`
- 与 lodash 不同, **不会将函数视为对象**

```js
isObject({}) // true
isObject([]) // true
isObject(null) // false
isObject(function () {}) // false
```

## isPrimitive 原始类型 {#Primitive}

判断传入的第一个参数是否为原始类型

- 包括: 数字、字符串、布尔型、`symbol`、`bigint`、`undefined` 和 `null`

```js
isPrimitive(123) // true
isPrimitive(false) // true
isPrimitive('123') // true
isPrimitive({}) // false
isPrimitive([]) // false
isPrimitive(() => 1) // false
```

## isPromise {#Promise}

判断传入的第一个参数是否为 `Promise`

> [!NOTE] 注意
> 此功能并非完全可靠

```js
isPromise(new Promise((res) => {})) // true
isPromise(Promise.resolve(1)) // true
isPromise({ then: () => {} }) // false
isPromise({ catch: () => {} }) // false
```

## isPromiseLike 类 Promise 对象 {#PromiseLike}

判断传入的第一个参数是否为类 `Promise` 对象

- 判据为传入的是一个对象, 且有 `then` 方法

```js {3}
isPromise(new Promise((res) => {})) // true
isPromise(Promise.resolve(1)) // true
isPromise({ then: () => {} }) // true
isPromise({ catch: () => {} }) // false
```

## isRegExp 正则表达式 {#RegExp}

判断传入的第一个参数是否为正则表达式 `RegExp`

```js
isRegExp(/123/) // true
isRegExp(new RegExp("123")) // true
isRegExp("123") // false
isRegExp({}) // false
```

## isSet {#Set}

判断传入的第一个参数是否为 `Set`

```js
isSet(new Set()) // true
isSet(new WeakSet()) // false
isSet({}) // false
isSet([]) // false
```

## isWeakSet {#WeakSet}

判断传入的第一个参数是否为 `WeakSet`

```js
isWeakSet(new WeakSet()) // true
isWeakSet(new Set()) // false
isWeakSet({}) // false
isWeakSet([]) // false
```

## isString 字符串 {#String}

判断传入的第一个参数是否为字符串

```js
isString('123') // true
isString(`${123}`) // true
isString(['123']) // false
isString(String) // false
```

## isSymbol {#Symbol}

判断传入的第一个参数是否为 `Symbol`

```js
isSymbol(Symbol()) // true
isSymbol(Symbol('123')) // true
isSymbol(Symbol) // false
isSymbol('Symbol') // false
```

## isWrapper 包装对象 {#Wrapper}

判断传入的第一个参数是否为包装对象

- 包装对象指 `Object(123)` 这样包装为对象的初始值

```js
isWrapper(Object(123)) // true
isWrapper(Object("123")) // true
isWrapper(123) // false
isWrapper("123") // false
```

有这些不常用的变体:

- `isWrapperNumber`
- `isWrapperBoolean`
- `isWrapperString`
- `isWrapperSymbol`
- `isWrapperBigInt`

```js
isWrapperNumber(Object(123)) // true
isWrapperNumber(123) // false

isWrapperBoolean(Object(true)) // true
isWrapperBoolean(true) // false

isWrapperString(Object("123")) // true
isWrapperString("123") // false

isWrapperSymbol(Object(Symbol())) // true
isWrapperSymbol(Symbol()) // false

isWrapperBigInt(Object(1n)) // true
isWrapperBigInt(1n) // false
```
