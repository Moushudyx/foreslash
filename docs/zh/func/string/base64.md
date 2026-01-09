---
prev:
  text: 'splitWords 词分割'
  link: './splitWords'
next:
  text: 'dedent 取消缩进'
  link: './dedent'
---

# base64

<VersionTag version="0.3.6" />

提供 Base64 编码/解码以及与 Blob 和 Data URL 的互转工具

## 函数

- `encodeBase64(str: string): string`<br />
  将字符串转换为 Base64（支持中文）
- `decodeBase64(base64Str: string): string`<br />
  将 Base64 解码为字符串（支持中文）
- `blobToBase64(blob: Blob): Promise<string>`<br />
  将 `Blob` 转为 Base64 字符串（不含 `data:` 前缀）
- `base64ToBlob(base64Str: string, mimeType = 'text/plain'): Blob`<br />
  将 Base64 字符串转换为 `Blob`, 未指定 mimeType 时默认为 `text/plain`
- `dataUrlToBlob(dataUrl: string): Blob`<br />
  将 Data URL 转换为 `Blob`, 未指定 mimeType 时默认为 `text/plain`

## 示例

### 编码 / 解码

```js
encodeBase64('abc123') // 'YWJjMTIz'
encodeBase64('文字') // '5paH5a2X'

decodeBase64('YWJjMTIz') // 'abc123'
decodeBase64('5paH5a2X') // '文字'
```

### Blob 与 Base64

```js
const blob = new Blob(['Hello, world!'], { type: 'text/plain' })
await blobToBase64(blob) // 'SGVsbG8sIHdvcmxkIQ=='

const b = base64ToBlob('SGVsbG8sIHdvcmxkIQ==', 'text/plain')
// b.type -> 'text/plain'
// b.size -> 13

const db = dataUrlToBlob('data:text/plain;base64,SGVsbG8sIHdvcmxkIQ==')
```

## 注意

- `encodeBase64` / `decodeBase64` 内部使用 `TextEncoder` / `TextDecoder` 及 `btoa`/`atob`，在某些老旧环境（如 IE）可能需要 polyfill。
- `blobToBase64` 使用 `FileReader`，在极老旧浏览器中可能需要兼容处理。

