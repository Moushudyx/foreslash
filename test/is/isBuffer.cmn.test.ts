describe('isBuffer 当 Buffer 不存在时', () => {
  let originalBuffer: BufferConstructor
  beforeEach(() => {
    originalBuffer = global.Buffer;
    global.Buffer = undefined as any;
  });
  afterEach(() => {
    global.Buffer = originalBuffer
  })
  it('返回 false', () => {
    const { isBuffer } = require('../../src/is/isBuffer')
    // console.log(global.Buffer)
    // console.log(isBuffer.toString())
    expect(isBuffer(null)).toBe(false)
    expect(isBuffer(undefined)).toBe(false)
    expect(isBuffer(new ArrayBuffer(0))).toBe(false)
  })
})
