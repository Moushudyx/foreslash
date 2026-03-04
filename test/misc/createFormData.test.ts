import { createFormData, createFormDataBoundary } from '../../src'

describe('createFormDataBoundary', () => {
  it('生成符合格式的 boundary', () => {
    const boundary = createFormDataBoundary()

    expect(boundary).toMatch(/^----[0-9a-f]{12}ForeslashFormBoundary$/)
  })
})

describe('createFormData', () => {
  it('处理普通字段', async () => {
    const boundary = '----test-boundary'
    const buf = await createFormData({
      name: 'Alice',
      age: 18,
      active: false,
    }, boundary)

    const body = new TextDecoder().decode(buf)

    expect(body).toBe(
      `------test-boundary\r\nContent-Disposition: form-data; name="name"\r\n\r\nAlice\r\n`
      + `------test-boundary\r\nContent-Disposition: form-data; name="age"\r\n\r\n18\r\n`
      + `------test-boundary\r\nContent-Disposition: form-data; name="active"\r\n\r\nfalse\r\n`
      + `------test-boundary--\r\n`
    )
  })

  it('处理 BlobLike 字段并保留文件内容', async () => {
    const boundary = '----bloblike-boundary'
    const fileBytes = new Uint8Array([72, 101, 108, 108, 111])
    const buf = await createFormData({
      file: {
        name: 'hello.txt',
        type: 'text/plain',
        arrayBuffer: async () => fileBytes.buffer,
      },
    }, boundary)

    const body = new TextDecoder().decode(buf)

    expect(body).toContain('Content-Disposition: form-data; name="file"; filename="hello.txt"')
    expect(body).toContain('Content-Type: text/plain')
    expect(body).toContain('\r\n\r\nHello\r\n')
    expect(body.endsWith(`--${boundary}--\r\n`)).toBe(true)
  })

  it('类 Blob 对象使用默认文件名，空 type 使用默认 MIME', async () => {
    const boundary = '----default-value-boundary'
    const buf = await createFormData({
      file: {
        type: '',
        arrayBuffer: async () => new TextEncoder().encode('abc').buffer,
      },
    }, boundary)

    const body = new TextDecoder().decode(buf)

    expect(body).toContain('filename="file"')
    expect(body).toContain('Content-Type: application/octet-stream')
    expect(body).toContain('\r\n\r\nabc\r\n')
  })

  it('空对象仅生成结束边界', async () => {
    const boundary = '----empty-boundary'
    const buf = await createFormData({}, boundary)

    expect(new TextDecoder().decode(buf)).toBe(`--${boundary}--\r\n`)
  })
})
