import { isFunction, isPromise, noop, sleep, withResolvers } from '../../src/index'

describe('withResolvers', () => {
  it('基本功能', async () => {
    const Res = withResolvers<number>()
    let promiseRes: number = 0
    expect(isPromise(Res.promise)).toBe(true)
    expect(isFunction(Res.resolve)).toBe(true)
    expect(isFunction(Res.reject)).toBe(true)
    Res.promise.then((num) => (promiseRes = num))
    Res.resolve(1)
    await sleep(1)
    expect(promiseRes).toBe(1)
  })
  it('PromiseLike 测试', async () => {
    let res = 0
    let rej = 1
    class NotPromise {
      constructor(executor: any) {
        // “resolve”和“reject”函数和原生的 promise 的行为完全不同
        // 但 Promise.withResolvers() 只是返回它们，就像是原生的 promise 一样
        executor(
          (value: number) => {
            res = value
          },
          (value: number) => {
            rej = value
          }
        )
      }
      then = noop as any
    }
    const Res = withResolvers<number>(NotPromise)
    expect(isPromise(Res.promise)).toBe(false)
    expect(isFunction(Res.resolve)).toBe(true)
    expect(isFunction(Res.reject)).toBe(true)
    Res.resolve(1)
    Res.reject(2)
    await sleep(1)
    expect(res).toBe(1)
    expect(rej).toBe(2)
  })
})
