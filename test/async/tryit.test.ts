import { tryit } from '../../src/index'

describe('tryit', () => {
  it('基本功能', async () => {
    const _testFn1 = (n: number) => {
      if (isNaN(n)) throw new Error('err')
      return n
    }
    const testFn1 = tryit(_testFn1)
    expect(testFn1(1)[1]).toBe(1)
    expect(testFn1(1)[0]).toBe(undefined)
    expect(testFn1(NaN)[1]).toBe(undefined)
    expect(testFn1(NaN)[0]).toBeInstanceOf(Error)
    // 异步测试
    const _testFn2 = (n: number) => {
      if (isNaN(n)) return Promise.reject('err')
      return Promise.resolve(n)
    }
    const testFn2 = tryit(_testFn2)
    expect(testFn2(1)).resolves.toEqual([undefined, 1])
    expect(testFn2(NaN)).resolves.toEqual(['err', undefined])
  })
})
