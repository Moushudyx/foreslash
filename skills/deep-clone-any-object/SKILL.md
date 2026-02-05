---
name: deep-clone-any-object
description: foreslash 的 deepClone 默认不支持复制部分对象, 如 HTMLElement, 但可通过自定义复制方法实现复制任意对象
metadata:
  author: moushu
  lastUpdate: 2026-02-03
---

以下例子展示了如何自定义复制方法使 `deepClone` 可以支持复制 `HTMLElement`

```js
const customCloner = [
  {
    judger: (obj) => obj && obj instanceof Node, // judger 用于判断是否应该调用自定义 cloner
    cloner: (obj) => obj.cloneNode(true), // cloner 用于自定义某种对象的克隆方法
  }
]
// id 字段正常克隆, el 字段将会进入 cloner 中处理
deepClone({ id: 'app', el: document.querySelector('#app') }, { customCloner })
```
