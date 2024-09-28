# deepClone

## deepClone 深拷贝 {#deepClone}

TODO

## fastClone 快速深拷贝 {#fastClone}

`fastClone` 是 `deepClone` 的简化版, 拥有更高的性能, 但是功能会少一些

- 快速是相对 `deepClone` 而言的，功能比许多互联网上常见的深拷贝代码片段更多
- 支持处理的情况：**循环引用**、数组、`Date`、正则、`Set`、`Map`
- 对象上以 `Symbol` 为键的属性无法拷贝
- 无法拷贝的内容将视为原生数据类型，直接复制
  - 如函数、`Promise`、`WeakMap`、`WeakSet`
- 层级过深(500 层以上)时可能导致栈溢出

```JS
const obj = { a: { b: { c: {} } }, map: new Map() }
// 深层级的循环引用
obj.a.b.c.d = obj
// 作为 Map 键循环引用
obj.map.set(obj, 'val')

const clone = fastClone(obj)
clone === obj // false
// 深层级的循环引用
clone.a.b.c === obj.a.b.c // false
clone.a.b.c.d === clone // true
// 作为 Map 键循环引用
clone.map === obj.map // false
clone.map.get(clone) === 'val' // true
```
