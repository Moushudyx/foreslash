---
prev: false
next:
  text: 'isEmpty 判断为空'
  link: './isEmpty'
---

# deepClone

## deepClone 深拷贝 {#deepClone}

`deepClone` 可以复制你能在 JS 中用到的绝大多数内容, 且支持定制

- 如果您只想复制一些简单的内容, 推荐使用 `fastClone`
- 支持处理包括**循环引用**、数组、正则、`DataView`、`TypedArray` 等复杂数据类型
- 可以配置是否拷贝对象的原型、属性 descriptor、以 `Symbol` 为键的属性
  - 默认**不拷贝**对象的原型、**不拷贝**属性 descriptor、**拷贝**以 `Symbol` 为键的属性
- 无法拷贝的内容将视为原生数据类型, 直接复制(如函数、`Promise`、`WeakMap`、`WeakSet`)
  - 您可以自定义拷贝方法, 以满足特殊的业务需求
- 层级过深(500 层以上)时可能导致栈溢出

```js
const obj = { map: new Map() }
obj.map.set(obj, 'val')
// 用 deepClone 复制带有 Map 和循环引用的对象
const clone = deepClone(obj)
clone === obj // false
clone.map === obj.map // false
clone.map.get(clone) === 'val' // true
```

### 高级用法

以下例子展示了如何自定义拷贝方法使 `deepClone` 可以支持复制 `HTMLElement`

```js
const customCloner = [
  {
    cloner: (obj) => obj.cloneNode(true), // cloner 用于自定义某种对象的克隆方法
    judger: (obj) => obj && obj instanceof Node, // judger 用于判断是否应该调用自定义 cloner
  }
]
// id 字段正常克隆, el 字段将会进入 cloner 中处理
deepClone({ id: 'app', el: document.querySelector('#app') }, { customCloner })
```

## fastClone 快速深拷贝 {#fastClone}

`fastClone` 是 `deepClone` 的简化版, 拥有更高的性能, 但是功能会少一些

- 快速是相对 `deepClone` 而言的，功能比许多互联网上常见的深拷贝代码片段更多
- 支持处理的情况：**循环引用**、数组、`Date`、正则、`Set`、`Map`、`FormData`
- 对象上以 `Symbol` 为键的属性无法拷贝
- 无法拷贝的内容将视为原生数据类型, 直接复制(如函数、`Promise`、`WeakMap`、`WeakSet`)
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
