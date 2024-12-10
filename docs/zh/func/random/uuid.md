---
prev:
  text: 'ulid 标准 ULID'
  link: './ulid'
next: false
---

# ulid

生成一个标准的 UUID V4 格式字符串

字符串格式为 `xxxxxxxx-xxxx-4xxx-[y]xxx-xxxxxxxxxxxx`

具体逻辑可以看 [UUID 标准](https://www.ietf.org/rfc/rfc4122.txt)

## 基本用法

```js
uuidV4() // "ecf30e21-0f39-46ee-a1cd-417946d8a48e"
uuidV4() // "8dc973b2-f28e-4233-a3f2-aa4bda9be9f8"
// 空 UUID
uuidNil // "00000000-0000-0000-0000-000000000000"
```
