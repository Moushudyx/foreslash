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

```js
isArray([1, 2]) // true
isArray(Array(2)) // true
isArray('abc') // true
isArray({ 0: 1, length: 1 }) // true
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

判断传入的第一个参数是否为布尔型 `Boolean`

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

## isFunction 函数 {#Function}

判断传入的第一个参数是否为 函数 `Function`

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

```js
isNil(null) // true
isNil(undefined) // true
isNil(false) // false
isNil('') // false
```

## isNumber {#Number}

判断传入的第一个参数是否为 TODO

```js
isNumber() // true
isNumber() // true
isNumber() // false
isNumber() // false
```

## isObject {#Object}

判断传入的第一个参数是否为 TODO

```js
isObject() // true
isObject() // true
isObject() // false
isObject() // false
```
## isPromise {#Promise}

判断传入的第一个参数是否为 TODO

```js
isPromise() // true
isPromise() // true
isPromise() // false
isPromise() // false
```

## isPromiseLike {#PromiseLike}

判断传入的第一个参数是否为 TODO

```js
isPromiseLike() // true
isPromiseLike() // true
isPromiseLike() // false
isPromiseLike() // false
```
## isSet {#Set}

判断传入的第一个参数是否为 TODO

```js
isSet() // true
isSet() // true
isSet() // false
isSet() // false
```

## isString {#String}

判断传入的第一个参数是否为 TODO

```js
isString() // true
isString() // true
isString() // false
isString() // false
```
## isSymbol {#Symbol}

判断传入的第一个参数是否为 TODO

```js
isSymbol() // true
isSymbol() // true
isSymbol() // false
isSymbol() // false
```

## isWrapper {#Wrapper}

判断传入的第一个参数是否为 TODO

```js
isWrapper() // true
isWrapper() // true
isWrapper() // false
isWrapper() // false
```
