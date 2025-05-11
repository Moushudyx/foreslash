import { retry, sleep } from '../../src'

describe('retry', () => {
  // beforeEach(() => {
  //   jest.useFakeTimers()
  // })
  // afterEach(() => {
  //   jest.useRealTimers()
  // })
  it('基本使用', async () => {
    // 正常返回值
    const fn = jest.fn(() => 1)
    expect(retry(fn)).resolves.toBe(1)
    expect(retry(fn)).resolves.toBe(1)
    expect(fn).toHaveBeenCalledTimes(2)
    // 试错
    const fnErr = jest.fn(() => {
      throw new Error('1')
    })
    const e1 = retry(fnErr)
    expect(e1).rejects.toThrow(new Error('1'))
    try {
      await e1
    } catch (e) {}
    expect(fnErr).toHaveBeenCalledTimes(3)
    // 次数测试
    const fnErr2 = jest.fn(() => {
      throw new Error('2')
    })
    const e2 = retry(fnErr2, { times: 10 })
    expect(e2).rejects.toThrow(new Error('2'))
    try {
      await e2
    } catch (e) {}
    expect(fnErr2).toHaveBeenCalledTimes(10)
  })
  it('间隔时间', async () => {
    const fnErr = jest.fn(async () => {
      await sleep(50)
      throw new Error('3')
    })
    const e3 = retry(fnErr, { gap: 100 })
    expect(e3).rejects.toThrow(new Error('3'))
    await sleep(55)
    await sleep(50)
    expect(fnErr).toHaveBeenCalledTimes(2)
    await sleep(55)
    await sleep(50)
    expect(fnErr).toHaveBeenCalledTimes(3)
    // 函数控制
    const fnErr2 = jest.fn(async () => {
      await sleep(50)
      throw new Error('3')
    })
    const e2 = retry(fnErr2, { gap: (retryCounts) => retryCounts * 100 })
    expect(e2).rejects.toThrow(new Error('3'))
    await sleep(105)
    expect(fnErr2).toHaveBeenCalledTimes(2)
    await sleep(100)
    expect(fnErr2).toHaveBeenCalledTimes(2) // 间隔时间不足, 不会重试
    await sleep(105)
    expect(fnErr2).toHaveBeenCalledTimes(3)
  })
  it('延迟时间', async () => {
    const fnErr = jest.fn(async () => {
      await sleep(50)
      throw new Error('3')
    })
    const e3 = retry(fnErr, { delay: 100 })
    expect(e3).rejects.toThrow(new Error('3'))
    expect(fnErr).toHaveBeenCalledTimes(1)
    await sleep(50) // 第一次运行结束, 不会立即重试
    await sleep(50) // 延迟时间不足, 不会重试
    expect(fnErr).toHaveBeenCalledTimes(1)
    await sleep(50) // 第二次运行开始
    expect(fnErr).toHaveBeenCalledTimes(2)
    await sleep(50) // 第二次运行运行结束, 不会立即重试
    expect(fnErr).toHaveBeenCalledTimes(2)
    await sleep(50) // 延迟时间不足, 不会重试
    expect(fnErr).toHaveBeenCalledTimes(2)
    await sleep(50) // 第三次运行开始
    expect(fnErr).toHaveBeenCalledTimes(3)
  })
  it('提前退出', async () => {
    const fnErr = jest.fn(async (exitCallback) => {
      await sleep(50)
      exitCallback(new Error('1'))
    })
    const e3 = retry(fnErr)
    expect(e3).rejects.toThrow(new Error('1'))
    try {
      await e3
    } catch (e) {}
    expect(fnErr).toHaveBeenCalledTimes(1)
  })
})
