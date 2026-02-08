describe('isBuffer 当 Buffer 不存在时', () => {
  it('返回 false', async () => {
    vi.resetModules()
    vi.doMock('../../src/utils/index', () => ({
      getGlobalThis: () => ({ Buffer: undefined }),
    }))
    const { isBuffer } = await import('../../src/is/isBuffer')
    // console.log(global.Buffer)
    // console.log(isBuffer.toString())
    expect(isBuffer(null)).toBe(false)
    expect(isBuffer(undefined)).toBe(false)
    expect(isBuffer(new ArrayBuffer(0))).toBe(false)
    vi.doUnmock('../../src/utils/index')
  })
})
