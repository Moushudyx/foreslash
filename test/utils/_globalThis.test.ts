import { getGlobalThis } from '../../src/index'

describe('getGlobalThis', () => {
  it('返回 globalThis', () => {
    expect(getGlobalThis()).toBe(globalThis)
  })
})

describe('getGlobalThis 当 self 不存在时', () => {
  beforeEach(() => {
    jest.spyOn(global, 'self', 'get').mockImplementation(() => undefined as any)
  })
  afterEach(() => {
    jest.restoreAllMocks()
  })
  it('返回 globalThis', () => {
    expect(getGlobalThis()).toBe(globalThis)
  })
})

describe('getGlobalThis 当 self 和 window 不存在时', () => {
  beforeEach(() => {
    jest.spyOn(global, 'self', 'get').mockImplementation(() => undefined as any)
    jest.spyOn(global, 'window', 'get').mockImplementation(() => undefined as any)
  })
  afterEach(() => {
    jest.restoreAllMocks()
  })
  it('返回 globalThis', () => {
    expect(getGlobalThis()).toBe(globalThis)
  })
})
// global 和 globalThis 在 jest 环境下无法被 mock
// describe('getGlobalThis 当 self 和 window、global 不存在时', () => {
//   beforeEach(() => {
//     jest.spyOn(global, 'self', 'get').mockImplementation(() => undefined as any)
//     jest.spyOn(global, 'window', 'get').mockImplementation(() => undefined as any)
//     jest.spyOn(global, 'global', 'get').mockImplementation(() => undefined as any)
//   })
//   afterEach(() => {
//     jest.restoreAllMocks()
//   })
//   it('返回 globalThis', () => {
//     expect(getGlobalThis()).toBe(globalThis)
//   })
// })
