---
prev:
  text: 'getAcceptableExtByMIME 获取拓展名'
  link: './getAcceptableExtByMIME'
next: false
---

# getAcceptableMIMEByExt

根据文件拓展名获取所有匹配的 MIME 类型

## 基本用法

返回所有匹配文件拓展名的 MIME 类型数组，不支持的类型返回空数组

```JS
getAcceptableMIMEByExt('mp3') // ['audio/mp3', 'audio/mpeg']
getAcceptableMIMEByExt('png') // ['image/png', 'image/apng', 'image/vnd.mozilla.apng']
getAcceptableMIMEByExt('apng') // ['image/apng', 'image/vnd.mozilla.apng']

// 区分 C 与 C++ 源文件拓展名
getAcceptableMIMEByExt('c') // ['text/x-c', 'text/x-csrc']
getAcceptableMIMEByExt('C') // ['text/x-c++src']
```
