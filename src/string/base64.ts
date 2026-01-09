/**
 * 将一个字符串转换为 Base64 编码的字符串, 支持中文等
 * - 内部使用到了 `btoa` 方法, 可能会有报错
 * - 如果想在 Internet Explorer 上使用, 请 polyFill `TextEncoder` 对象
 * @param str 需要转换的字符串
 * @returns 输入字符串转换为 Base64 编码后的字符串
 * @example
 * ```js
 * encodeBase64('abc123') // YWJjMTIz
 * encodeBase64('文字') // 5paH5a2X
 * ```
 * @version 0.3.6
 */
export function encodeBase64(str: string) {
  const utf8Bytes = new TextEncoder().encode(str)
  let binary = ''
  utf8Bytes.forEach((byte) => {
    binary += String.fromCharCode(byte)
  })
  return btoa(binary)
}

/**
 * 将一个 Base64 编码的字符串转换为普通字符串, 支持中文等
 * - 内部使用到了 `atob` 方法, 可能会有报错
 * - 如果想在 Internet Explorer 上使用, 请 polyFill `TextDecoder` 对象
 * @param base64Str 需要转换的 Base64 编码字符串
 * @returns 输入 Base64 编码字符串转换后的普通字符串
 * @example
 * ```js
 * decodeBase64('YWJjMTIz') // abc123
 * decodeBase64('5paH5a2X') // 文字
 * ```
 * @version 0.3.6
 */
export function decodeBase64(base64Str: string) {
  const binary = atob(base64Str)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return new TextDecoder().decode(bytes)
}
/**
 * 将 Blob 对象转换为 Base64 编码的字符串
 * - 如果想在 Internet Explorer 9 及更早的 IE 上使用, 请 polyFill `FileReader` 对象
 * @param blob 需要转换的 Blob 对象
 * @returns 输入 Blob 对象转换为 Base64 编码后的字符串
 * @example
 * ```js
 * const blob = new Blob(['Hello, world!'], { type: 'text/plain' })
 * blobToBase64(blob).then(base64 => {
 *   console.log(base64) // SGVsbG8sIHdvcmxkIQ==
 * })
 * ```
 * @version 0.3.6
 */
export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const dataUrl = reader.result as string
      const base64 = dataUrl.split(',')[1]
      resolve(base64)
    }
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}
/**
 * 将 Base64 编码的字符串转换为 Blob 对象
 * @param base64Str 需要转换的 Base64 编码字符串
 * @param mimeType 转换后 Blob 对象的 MIME 类型, 默认为 'text/plain'
 * @returns 输入 Base64 编码字符串转换后的 Blob 对象
 * @example
 * ```js
 * const base64 = 'SGVsbG8sIHdvcmxkIQ=='
 * const blob = base64ToBlob(base64, 'text/plain')
 * console.log(blob) // Blob { size: 13, type: "text/plain" }
 * ```
 * @version 0.3.6
 */
export function base64ToBlob(base64Str: string, mimeType = 'text/plain'): Blob {
  const byteCharacters = atob(base64Str)
  const byteArray = new Uint8Array(byteCharacters.length)
  for (let i = 0; i < byteCharacters.length; i++) {
    byteArray[i] = byteCharacters.charCodeAt(i)
  }
  return new Blob([byteArray], { type: mimeType })
}
/**
 * 将 Data URL 转换为 Blob 对象
 * @param dataUrl 需要转换的 Data URL 字符串
 * @returns 输入 Data URL 转换后的 Blob 对象
 * @example
 * ```js
 * const dataUrl = 'data:text/plain;base64,SGVsbG8sIHdvcmxkIQ=='
 * const blob = dataUrlToBlob(dataUrl)
 * console.log(blob) // Blob { size: 13, type: "text/plain" }
 * ```
 * @version 0.3.6
 */
export function dataUrlToBlob(dataUrl: string): Blob {
  const [header, base64Str] = dataUrl.split(',')
  const mimeMatch = header.match(/data:([^;]*)(?:;charset:.*?)?(?:;base64)?/)
  const mimeType = mimeMatch ? mimeMatch[1] || 'text/plain' : 'text/plain'
  return base64ToBlob(base64Str, mimeType)
}
