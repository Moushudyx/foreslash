---
prev:
  text: 'acceptableFileName 检查拓展名'
  link: './acceptableFileName'
next:
  text: 'getAcceptableExtByMIME 获取拓展名'
  link: './getAcceptableExtByMIME'
---

# acceptableFileType

根据文件的 MIME 类型判断是否匹配支持的文件类型，判断逻辑类似于浏览器的 `input` 标签的 `accept` 属性

## 基本用法

接受两个参数，第一个参数是 MIME 类型，第二个参数是 `accept` 格式的字符串，返回一个布尔值

```JS
// MIME 类型 */* 匹配所有文件类型
acceptableFileName('image/jpeg', '*/*') // true
acceptableFileName('text/plain', '*/*') // true

// MIME 的子类型设为 * 匹配所有此类型的文件拓展名
acceptableFileType('image/jpeg', 'image/*') // true
acceptableFileName('text/plain', 'text/*') // true

// 除了 MIME 也可以直接匹配拓展名
acceptableFileType('image/jpeg', '.jpg, .png') // true
acceptableFileName('text/plain', '.txt, .json') // true

// 匹配多个类型
acceptableFileType('image/jpeg', '.png, .bmp, video/*') // false
acceptableFileType('text/plain', '.png, .bmp, video/*') // false

// 区分 C 与 C++ 源文件拓展名
acceptableFileName('text/x-c++src', '.C') // true
acceptableFileName('text/x-c', '.c') // true
```
