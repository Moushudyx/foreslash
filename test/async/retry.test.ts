import { retry, sleep } from '../../src'

describe('retry', () => {
  beforeEach(() => {
    vi.useFakeTimers() // 启用假定时器
  })
  afterEach(() => {
    vi.useRealTimers() // 恢复真实定时器
  })

  it('基本使用', async () => {
    // 同步测试部分保持不变（无定时器操作）
    const fn = vi.fn(() => 1)
    await expect(retry(fn)).resolves.toBe(1)
    await expect(retry(fn)).resolves.toBe(1)
    expect(fn).toHaveBeenCalledTimes(2)

    const fnErr = vi.fn(() => {
      throw new Error('1')
    })
    const e1 = retry(fnErr)
    await expect(e1).rejects.toThrow('1')
    expect(fnErr).toHaveBeenCalledTimes(3)

    const fnErr2 = vi.fn(() => {
      throw new Error('2')
    })
    const e2 = retry(fnErr2, { times: 10 })
    await expect(e2).rejects.toThrow('2')
    expect(fnErr2).toHaveBeenCalledTimes(10)
  })

  it('间隔时间', async () => {
    const clearQueue = async () => {
      await vi.advanceTimersByTimeAsync(0)
      await Promise.resolve()
      await vi.advanceTimersByTimeAsync(0)
      await Promise.resolve()
    }
    const fnErr = vi.fn(async () => {
      await sleep(50) // 被模拟的 sleep
      throw new Error('3')
    })

    const promise = retry(fnErr, { gap: 100 })
    const promiseAssertion = expect(promise).rejects.toThrow('3')

    // 第一次执行
    await clearQueue() // 清空微任务队列
    expect(fnErr).toHaveBeenCalledTimes(1)
    await vi.advanceTimersByTimeAsync(50) // 首次执行完毕
    await clearQueue() // 清空微任务队列
    expect(fnErr).toHaveBeenCalledTimes(1)

    // 推进到第二次执行时间点 (50 + 50 = 100ms)
    await vi.advanceTimersByTimeAsync(50) // 触发第二次执行
    await clearQueue()
    expect(fnErr).toHaveBeenCalledTimes(2)
    await vi.advanceTimersByTimeAsync(50) // 第二次执行完毕
    await clearQueue()
    expect(fnErr).toHaveBeenCalledTimes(2)

    // 推进到第三次执行时间点 (150 + 50 = 200ms)
    await vi.advanceTimersByTimeAsync(50) // 触发第三次执行
    await clearQueue()
    expect(fnErr).toHaveBeenCalledTimes(3)
    await vi.advanceTimersByTimeAsync(50) // 第三次执行完毕
    await clearQueue()
    expect(fnErr).toHaveBeenCalledTimes(3)

    await vi.runAllTimersAsync()
    await promiseAssertion // 验证最终结果
  })

  it('延迟时间', async () => {
    const clearQueue = async () => {
      await vi.advanceTimersByTimeAsync(0)
      await Promise.resolve()
      await vi.advanceTimersByTimeAsync(0)
      await Promise.resolve()
    }
    const fnErr = vi.fn(async () => {
      await sleep(50)
      throw new Error('3')
    })

    const promise = retry(fnErr, { delay: 100 })
    const promiseAssertion = expect(promise).rejects.toThrow('3')

    // 第一次调用
    await clearQueue() // 清空微任务队列
    expect(fnErr).toHaveBeenCalledTimes(1)
    await vi.advanceTimersByTimeAsync(50) // 完成第一次执行 (50ms)
    await clearQueue() // 清空微任务队列
    expect(fnErr).toHaveBeenCalledTimes(1)

    // 等待延迟时间 (100ms) - 此时应触发第二次调用
    await vi.advanceTimersByTimeAsync(100)
    await clearQueue()
    expect(fnErr).toHaveBeenCalledTimes(2)
    await vi.advanceTimersByTimeAsync(50) // 完成第二次执行 (50ms)
    await clearQueue()
    expect(fnErr).toHaveBeenCalledTimes(2)

    // 再次等待延迟 (100ms) - 触发第三次调用
    await vi.advanceTimersByTimeAsync(100)
    await clearQueue()
    expect(fnErr).toHaveBeenCalledTimes(3)
    await vi.advanceTimersByTimeAsync(50) // 完成第三次执行 (50ms)
    await clearQueue()
    expect(fnErr).toHaveBeenCalledTimes(3)

    await vi.runAllTimersAsync()
    await promiseAssertion
  })

  it('提前退出', async () => {
    const exitCallback = vi.fn()
    const fnErr = vi.fn(async (cb: (err: Error) => void) => {
      await sleep(50)
      cb(new Error('1'))
    })

    const promise = retry(fnErr)
    const promiseAssertion = expect(promise).rejects.toThrow('1')
    // 启动执行
    await vi.advanceTimersByTimeAsync(50) // 完成 sleep
    await Promise.resolve() // 处理回调

    // 验证提前退出
    await vi.runAllTimersAsync()
    await promiseAssertion
    expect(fnErr).toHaveBeenCalledTimes(1)
    expect(exitCallback).not.toHaveBeenCalled() // 根据实际实现调整
  })
})
