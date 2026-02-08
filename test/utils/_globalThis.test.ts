import { getGlobalThis } from '../../src/index'

describe('getGlobalThis', () => {
  it('返回 globalThis', () => {
    expect(getGlobalThis()).toBe(globalThis)
  })
})

describe('getGlobalThis 当 self 不存在时', () => {
  beforeEach(() => {
    vi.spyOn(global, 'self', 'get').mockImplementation(() => undefined as any)
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })
  it('返回 globalThis', () => {
    expect(getGlobalThis()).toBe(globalThis)
  })
})

describe('getGlobalThis 当访问 self 报错时', () => {
  beforeEach(() => {
    vi.spyOn(global, 'self', 'get').mockImplementation(() => { throw new Error('访问 self 报错') })
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })
  it('返回 globalThis', () => {
    expect(getGlobalThis()).toBe(globalThis)
  })
})

describe('getGlobalThis 当 self 和 window 不存在时', () => {
  beforeEach(() => {
    vi.spyOn(global, 'self', 'get').mockImplementation(() => undefined as any)
    vi.spyOn(global, 'window', 'get').mockImplementation(() => undefined as any)
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })
  it('返回 globalThis', () => {
    expect(getGlobalThis()).toBe(globalThis)
  })
})

describe('getGlobalThis 当访问 self 和 window 报错时', () => {
  beforeEach(() => {
    vi.spyOn(global, 'self', 'get').mockImplementation(() => { throw new Error('访问 self 报错') })
    vi.spyOn(global, 'window', 'get').mockImplementation(() => { throw new Error('访问 window 报错') })
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })
  it('返回 globalThis', () => {
    expect(getGlobalThis()).toBe(globalThis)
  })
})
// global 和 globalThis 在 vitest 环境下无法被 mock
// describe('getGlobalThis 当 self 和 window、global 不存在时', () => {
//   beforeEach(() => {
//     vi.spyOn(global, 'self', 'get').mockImplementation(() => undefined as any)
//     vi.spyOn(global, 'window', 'get').mockImplementation(() => undefined as any)
//     vi.spyOn(global, 'global', 'get').mockImplementation(() => undefined as any)
//   })
//   afterEach(() => {
//     vi.restoreAllMocks()
//   })
//   it('返回 globalThis', () => {
//     expect(getGlobalThis()).toBe(globalThis)
//   })
// })
