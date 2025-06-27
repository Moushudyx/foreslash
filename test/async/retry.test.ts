import { retry, sleep } from '../../src'

describe('retry', () => {
  beforeEach(() => {
    jest.useFakeTimers() // 启用假定时器
  })
  afterEach(() => {
    jest.useRealTimers() // 恢复真实定时器
  })

  it('基本使用', async () => {
    // 同步测试部分保持不变（无定时器操作）
    const fn = jest.fn(() => 1)
    await expect(retry(fn)).resolves.toBe(1)
    await expect(retry(fn)).resolves.toBe(1)
    expect(fn).toHaveBeenCalledTimes(2)

    const fnErr = jest.fn(() => {
      throw new Error('1')
    })
    const e1 = retry(fnErr)
    await expect(e1).rejects.toThrow('1')
    expect(fnErr).toHaveBeenCalledTimes(3)

    const fnErr2 = jest.fn(() => {
      throw new Error('2')
    })
    const e2 = retry(fnErr2, { times: 10 })
    await expect(e2).rejects.toThrow('2')
    expect(fnErr2).toHaveBeenCalledTimes(10)
  })

  it('间隔时间', async () => {
    const clearQueue = async () => {
      jest.advanceTimersByTime(0)
      await Promise.resolve()
      jest.advanceTimersByTime(0)
      await Promise.resolve()
    }
    const fnErr = jest.fn(async () => {
      await sleep(50) // 被模拟的 sleep
      throw new Error('3')
    })

    const e3 = retry(fnErr, { gap: 100 })
    // 启动异步操作
    const promise = e3

    // 第一次执行
    await clearQueue() // 清空微任务队列
    expect(fnErr).toHaveBeenCalledTimes(1)
    jest.advanceTimersByTime(50) // 首次执行完毕
    await clearQueue() // 清空微任务队列
    expect(fnErr).toHaveBeenCalledTimes(1)

    // 推进到第二次执行时间点 (50 + 50 = 100ms)
    jest.advanceTimersByTime(50) // 触发第二次执行
    await clearQueue()
    expect(fnErr).toHaveBeenCalledTimes(2)
    jest.advanceTimersByTime(50) // 第二次执行完毕
    await clearQueue()
    expect(fnErr).toHaveBeenCalledTimes(2)

    // 推进到第三次执行时间点 (150 + 50 = 200ms)
    jest.advanceTimersByTime(50) // 触发第三次执行
    await clearQueue()
    expect(fnErr).toHaveBeenCalledTimes(3)
    jest.advanceTimersByTime(50) // 第三次执行完毕
    await clearQueue()
    expect(fnErr).toHaveBeenCalledTimes(3)

    await clearQueue()
    await expect(promise).rejects.toThrow('3') // 验证最终结果
  })

  it('延迟时间', async () => {
    const clearQueue = async () => {
      jest.advanceTimersByTime(0)
      await Promise.resolve()
      jest.advanceTimersByTime(0)
      await Promise.resolve()
    }
    const fnErr = jest.fn(async () => {
      await sleep(50)
      throw new Error('3')
    })

    const promise = retry(fnErr, { delay: 100 })

    // 第一次调用
    await clearQueue() // 清空微任务队列
    expect(fnErr).toHaveBeenCalledTimes(1)
    jest.advanceTimersByTime(50) // 完成第一次执行 (50ms)
    await clearQueue() // 清空微任务队列
    expect(fnErr).toHaveBeenCalledTimes(1)

    // 等待延迟时间 (100ms) - 此时应触发第二次调用
    jest.advanceTimersByTime(100)
    await clearQueue()
    expect(fnErr).toHaveBeenCalledTimes(2)
    jest.advanceTimersByTime(50) // 完成第二次执行 (50ms)
    await clearQueue()
    expect(fnErr).toHaveBeenCalledTimes(2)

    // 再次等待延迟 (100ms) - 触发第三次调用
    jest.advanceTimersByTime(100)
    await clearQueue()
    expect(fnErr).toHaveBeenCalledTimes(3)
    jest.advanceTimersByTime(50) // 完成第三次执行 (50ms)
    await clearQueue()
    expect(fnErr).toHaveBeenCalledTimes(3)

    await expect(promise).rejects.toThrow('3')
  })

  it('提前退出', async () => {
    const exitCallback = jest.fn()
    const fnErr = jest.fn(async (cb: (err: Error) => void) => {
      await sleep(50)
      cb(new Error('1'))
    })

    const promise = retry(fnErr)
    // 启动执行
    jest.advanceTimersByTime(50) // 完成 sleep
    await Promise.resolve() // 处理回调

    // 验证提前退出
    await expect(promise).rejects.toThrow('1')
    expect(fnErr).toHaveBeenCalledTimes(1)
    expect(exitCallback).not.toHaveBeenCalled() // 根据实际实现调整
  })
})
