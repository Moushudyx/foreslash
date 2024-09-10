import { getGlobalThis } from '../../src/index'

describe('getGlobalThis', () => {
  it('返回 globalThis', () => {
    expect(getGlobalThis()).toBe(globalThis)
  })
  // it('模拟浏览器', () => {
  //   const windowMock = {};
  //   // @ts-ignore
  //   globalThis.window = windowMock;
  //   expect(getGlobalThis()).toBe(windowMock)
  // })
  // it('模拟 worker', () => {
  //   const selfMock = {};
  //   // @ts-ignore
  //   globalThis.self = selfMock;
  //   expect(getGlobalThis()).toBe(selfMock)
  // })
})
