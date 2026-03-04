import { randomHexString } from '../random'
import { isObject } from '../is'

export type BlobLike = {
  type: string
  name?: string
  arrayBuffer(): Promise<ArrayBuffer>
}
/**
 * 搭配 `createFormData` 使用
 * @returns 字符串, 形如 `----301aa4fe399bForeslashFormBoundary`
 */
export function createFormDataBoundary() {
  return `----${randomHexString(12)}ForeslashFormBoundary`
}
// https://xhr.spec.whatwg.org/#interface-formdata
/**
 * 特殊环境下使用, 将对象处理为类 `FormData` 的 `ArrayBuffer`\
 * 部分环境下(如微信小程序)不存在 `FormData` 对象, 也可能不存在 `Blob` 对象\
 * 此时如果想要以 FormData 的模式访问, 可以用此方法
 *
 * > 注意: 需要环境支持 `TextEncoder` `Uint8Array` 和 `ArrayBuffer` 才能使用此方法
 *
 * > 不需要环境支持 `Blob` 对象, 只要提供一个类似 `Blob` 的对象即可(见示例部分)
 *
 * @param data 需要处理为 `FormData` 的对象
 * @param boundary `FormData` 的边界字符串, 建议由 `createFormDataBoundary()` 生成
 * @returns `ArrayBuffer`, 可以由 POST 请求发送, 需要设置 `Content-Type` 为 `multipart/form-data; boundary={boundary}`
 * @example
 * ```js
 * // 假设你在使用 axios
 * const reqInstance = axios.create({ headers: { Authorization: `Bearer abcdefg` } })
 * // 生成 boundary
 * const boundary = createFormDataBoundary()
 * // 生成 FormData 数据, 假设你有一份 ArrayBuffer 数据可以这么写
 * const formDataBuffer = await createFormData({
 *   // 如果你的环境支持 Blob 则可以直接写 { file: yourBlob }
 *   // name 字段可选, 默认为 'file', type 字段可选, 默认为 'application/octet-stream'
 *   file: { arrayBuffer: () => yourArrayBuffer, type: 'application/octet-stream', name: 'file.bin' }
 * }, boundary)
 * // 发送 POST 请求
 * reqInstance.post('https://your.api.host/upload', formDataBuffer, {
 *   headers: { 'Content-Type': `multipart/form-data; boundary=${boundary}` }
 * })
 * // 返回的 `ArrayBuffer` 同样可直接用于 wx.request / Taro.request 的 data 字段
 * ```
 * @version 0.4.0
 */
export async function createFormData(
  data: Record<string, string | number | boolean | BlobLike | Blob>,
  boundary: string
): Promise<ArrayBuffer> {
  const chunks: Uint8Array[] = []

  for (const [key, value] of Object.entries(data)) {
    const header = `--${boundary}\r\nContent-Disposition: form-data; name="${key}"`
    if (isObject(value) && 'arrayBuffer' in value && typeof value.arrayBuffer === 'function') {
      // Blob 对象或类似 Blob 的对象
      const blob = value as BlobLike
      const filename = blob.name || 'file'
      const contentType = blob.type || 'application/octet-stream'
      chunks.push(new TextEncoder().encode(`${header}; filename="${filename}"\r\nContent-Type: ${contentType}\r\n\r\n`))
      const arrayBuffer = await blob.arrayBuffer()
      chunks.push(new Uint8Array(arrayBuffer))
      chunks.push(new TextEncoder().encode('\r\n'))
    } else {
      // 普通字段
      chunks.push(new TextEncoder().encode(`${header}\r\n\r\n${value}\r\n`))
    }
  }

  chunks.push(new TextEncoder().encode(`--${boundary}--\r\n`))

  const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0)
  const result = new Uint8Array(totalLength)
  let offset = 0
  for (const chunk of chunks) {
    result.set(chunk, offset)
    offset += chunk.length
  }
  return result.buffer
}
