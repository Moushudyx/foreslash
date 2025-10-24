---
prev: false
next:
  text: '简介'
  link: './intro'
---

# Foreslash 详细文档

为何选择 Foreslash? [请看这里](./intro)

## 安装

```bash
npm install foreslash
yarn add foreslash
pnpm install foreslash
bun install foreslash
```

如果你的网络环境无法顺畅访问 npm, 可以指定镜像库安装

```bash
npm install foreslash --registry=https://registry.npmmirror.com
yarn add foreslash --registry=https://registry.npmmirror.com
```

## 使用

Foreslash 打包为 ESM、CJS、UMD 格式, 可以直接在浏览器与 Node.js 中使用

> [!NOTE] 提示
> 如果您使用 webpack、vite 等现代打包/构建工具, 那么无需担心格式问题
>
> 由于不同的环境存在客观差异(比如只有 Node.js 环境存在原生的 `Buffer` 对象), 因此不同环境下, 同一个方法的下行为不完全一致

### 在线使用

你可以在网页上引入 UMD 包来使用 Foreslash

```html
<script src="https://cdn.jsdelivr.net/npm/foreslash@latest/lib/index.umd.js"></script>
```

如果你想现在就尝试, 这个文档加载了全局变量 `foreslash` 你可以:

打开浏览器控制台, 输入如下代码

```js
with (foreslash) {
  // foreslash.range 返回一个按照一定规律生成的数组
  const _list = range(1, 5) // [1, 2, 3, 4, 5]
  const list = range(1, 5, { getter: (num) => ' '.repeat(5 - num) + '*'.repeat(num) })
  console.log(list.join('\n'))
}
//     *
//    **
//   ***
//  ****
// *****
```

### 示例

常用的方法有深拷贝 [deepClone](../func/object/deepClone)、柯里化 [curry](../func/functional/curry) 等

> [!NOTE] 注意
> 出于性能优化的考量，若无特殊说明，此库的任何方法都**不是柯里化**的
>
> 除非有特殊需求, 推荐使用性能更高、体积更小的 [fastClone](../func/object/deepClone#fastClone) 替代 [deepClone](../func/object/deepClone)

```js {6-8,11-15}
import { _, curry, randomString, fastClone } from 'foreslash'

// randomString 默认输出的字符为 大小写字母+数字
// 使用 curry 柯里化后, 可以指定第二个参数
// 最终可以组合为一个输出指定数量的随机数字的方法
const randomNumber = curry(randomString)(_, '1234567890')
randomNumber(1) // '1' | '0' | '5'
randomNumber(2) // '26' | '51' | '90'

// fastClone 可以应付大部分场景, 包括循环引用等情况
const obj = { arr: [{ a: 'a' }], map: new Map(), time: new Date(), reg: /test/ig }
obj.map.set(obj, 'val')

const clone = fastClone(obj)
clone.map.get(clone) // 'val'
```

## 常用方法

对象操作:
- 深拷贝: [deepClone](./object/deepClone)、[fastClone](./object/deepClone#fastClone)
- 深合并: [deepMerge](./object/deepMerge)

异步操作:
- 并发执行: [parallel](./async/parallel)
- 重试: [retry](./async/retry)

常用功能:
- 判断为空: [isEmpty](./object/isEmpty)

函数式编程:
- 结果缓存: [memo](./functional/memo)
- 柯里化: [curry](./functional/curry)

## 兼容性

您可以利用 core.js 补全环境 API, 使用 Babel.js 将代码转换为 ES5 等方式使此库可以在几乎所有现代设备上使用

如果出于某些原因不能使用以上手段, 您可以参考以下信息:
