---
prev: false
next:
  text: 'acceptableFileType 检查 MIME 类型'
  link: './acceptableFileType'
---

# acceptableFileName

根据文件名称判断是否匹配支持的文件类型，判断逻辑类似于浏览器的 `input` 标签的 `accept` 属性

## 基本用法

接受两个参数，第一个参数是文件名，第二个参数是 `accept` 格式的字符串，返回一个布尔值

```JS
// MIME 类型 */* 匹配所有文件拓展名
acceptableFileName('test.png', '*/*') // true
acceptableFileName('test.txt', '*/*') // true

// MIME 的子类型设为 * 匹配所有此类型的文件拓展名
acceptableFileName('test.png', 'image/*') // true
acceptableFileName('test.txt', 'text/*') // true

// 除了 MIME 也可以直接匹配拓展名
acceptableFileName('test.png', '.png') // true
acceptableFileName('test.txt', '.txt') // true

// 匹配多个类型
acceptableFileName('test.png', 'text/plain, image/jpeg, .apng') // false
acceptableFileName('test.txt', 'image/png, image/jpeg, .cpp') // false

// 区分 C 与 C++ 源文件拓展名
acceptableFileName('cpp.C', 'text/x-c++src') // true
acceptableFileName('c__.c', 'text/x-c') // true
```
