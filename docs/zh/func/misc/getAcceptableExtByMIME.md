---
prev:
  text: 'acceptableFileType 检查 MIME 类型'
  link: './acceptableFileType'
next:
  text: 'getAcceptableMIMEByExt 获取 MIME 类型'
  link: './getAcceptableMIMEByExt'
---

# getAcceptableExtByMIME

根据 MIME 类型获取所有匹配的文件拓展名

## 基本用法

返回所有匹配的文件拓展名数组，拓展名**不带点号**，不支持的类型返回空数组

MIME 的子类型可以为 `*`

```JS
getAcceptableExtByMIME('image/jpeg') // ['jpg', 'jpeg', 'jpe']
getAcceptableExtByMIME('audio/ogg') // ['ogg', 'oga', 'spx', 'opus']
getAcceptableExtByMIME('video/*') // ['avi', 'avf', ... , 'mks' , 'wmv']

// 区分 C 与 C++ 源文件拓展名
getAcceptableExtByMIME('text/x-c++src') // ['cpp', 'cxx', 'cc', 'C', 'c++']
getAcceptableExtByMIME('text/x-c') // ['c', 'cc', 'cxx', 'cpp', 'h', 'hh', 'dic']
```
