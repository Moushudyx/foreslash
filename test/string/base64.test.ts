import {
  encodeBase64,
  decodeBase64,
  blobToBase64,
  base64ToBlob,
  dataUrlToBlob,
} from '../../src'

/**
 * base64 模块单元测试
 * - 覆盖 `encodeBase64` / `decodeBase64` 的 ASCII 与多字节字符情况
 * - 覆盖 `blobToBase64` / `base64ToBlob` / `dataUrlToBlob` 的 Blob 与 Data URL 场景
 */
describe('base64', () => {
  it('encodeBase64', () => {
    // ASCII 测试
    expect(encodeBase64('abc123')).toBe('YWJjMTIz')
    // 中文（多字节）测试
    expect(encodeBase64('文字')).toBe('5paH5a2X')
  })

  it('decodeBase64', () => {
    // ASCII 解码
    expect(decodeBase64('YWJjMTIz')).toBe('abc123')
    // 中文解码
    expect(decodeBase64('5paH5a2X')).toBe('文字')
  })

  it('blobToBase64', async () => {
    // 使用简单文本 Blob, 确保转换结果为预期的 Base64 字符串（不含 data: 前缀）
    const blob = new Blob(['Hello, world!'], { type: 'text/plain' })
    const base64 = await blobToBase64(blob)
    expect(base64).toBe('SGVsbG8sIHdvcmxkIQ==')
  })

  it('base64ToBlob', () => {
    // 由上面的 Base64 字符串生成 Blob, 并校验类型与字节长度
    const base64 = 'SGVsbG8sIHdvcmxkIQ=='
    const blob = base64ToBlob(base64, 'text/plain')
    expect(blob instanceof Blob).toBe(true)
    expect(blob.type).toBe('text/plain')
    expect(blob.size).toBe(13)
  })

  it('dataUrlToBlob', () => {
    const dataUrl = 'data:text/plain;base64,SGVsbG8sIHdvcmxkIQ=='
    const blob = dataUrlToBlob(dataUrl)
    expect(blob instanceof Blob).toBe(true)
    expect(blob.type).toBe('text/plain')
    expect(blob.size).toBe(13)
  })
  it('dataUrlToBlob 特殊场景', () => {
    const dataUrl = 'data:;charset=utf-8;base64,SGVsbG8sIHdvcmxkIQ=='
    const blob = dataUrlToBlob(dataUrl)
    expect(blob instanceof Blob).toBe(true)
    expect(blob.type).toBe('text/plain')
    expect(blob.size).toBe(13)
    const dataUrl2 = 'data;charset=utf-8;base64,SGVsbG8sIHdvcmxkIQ=='
    const blob2 = dataUrlToBlob(dataUrl2)
    expect(blob2 instanceof Blob).toBe(true)
    expect(blob2.type).toBe('text/plain')
    expect(blob2.size).toBe(13)
  })
})
