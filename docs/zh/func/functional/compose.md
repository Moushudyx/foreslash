# compose

将多个函数组合成一个函数，从**右到左**执行并返回结果

与 [pipe](/zh/func/functional/pipe) 类似，但是执行顺序相反

## 基本用法

`compose` 将多个函数组合成一个函数，从右到左依次执行

```js {1}
const composedFn = compose(fn1, fn2, fn3)
composedFn(...args) // 等价于 fn1(fn2(fn3(...args)))
```

## 示例

```js:line-numbers {28}
// 在这个示例中我们模拟了一个处理复杂数据的场景

import { compose } from 'foreslash'

// 假设我们现在有这样的数据，要处理它：
// 1. 最终目标是将数据格式化为字符串
// 2. 数据取自原始数据的 content1, content2
// 3. 所以要先提取原始数据的 content1 和 content2 组合为一个新的数组
const mockData = { content1: [ { id: 1, data: '1' } ], content2: [ { id: 2, data: '2' } ] }

// 以下是模拟三个步骤的方法, 这里是模拟场景, 所以代码简单一点

// 最后一步 格式化数据
const formatData = (data) => data.join(',')
// 中间过程 提取数据
const getDataFromContent = (content) => content.map(({ data }) => data)
// 第一步 处理数据
const mergeDataContent = ({ content1, content2 }) => ({ content: [ ...content1, ...content2 ] })

// 很容易看出, 我们应该这样调用上述方法
// formatData(getDataFromContent(mergeDataContent(mockData)))
// 但这样的代码很麻烦，我们可以使用 compose 来简化

// 组装 formatData, getDataFromContent 和 mergeDataContent
// 1. 最终目标是用 formatData 处理数据
// 2. 数据由 getDataFromContent 取自原始数据的组合
// 3. 原始数据的组合有 mergeDataContent 提供
const handleMockData = compose(formatData, getDataFromContent, mergeDataContent)

handleMockData(mockData) // '1,2'
```
