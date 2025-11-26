---
prev:
  text: 'ulid 标准 ULID'
  link: './ulid'
next: false
---

# uuid

<VersionTag version="0.1.2" />

生成一个符合标准的 UUID V4 和 UUID V7 字符串

字符串格式为
- UUID V4 `xxxxxxxx-xxxx-4xxx-[y]xxx-xxxxxxxxxxxx`
- UUID V7 `tttttttt-tttt-7xxx-[y]xxx-xxxxxxxxxxxx`
  - 其中 `t` 的部分是时间戳

具体逻辑可以看 [UUID 标准](https://www.rfc-editor.org/rfc/rfc9562.html)

> [!NOTE] 注意
> `uuidV7` 方法需要 `0.3.4` 或更高版本才能使用

## 基本用法

```js
// UUID V4
uuidV4() // "ecf30e21-0f39-46ee-a1cd-417946d8a48e"
uuidV4() // "8dc973b2-f28e-4233-a3f2-aa4bda9be9f8"
// UUID V7
uuidV7() // "019aba02-45ad-7233-a17e-05f8d7ebe357"
uuidV7() // "019aba02-45ad-7233-8fa4-bae9b3a9fd12"
// 空 UUID
uuidNil // "00000000-0000-0000-0000-000000000000"
```
