import { parallel, sleep } from '../../src'

describe('defer', () => {
  it('基本功能', async () => {
    const fn = jest.fn(async (n: number) => {
      return n * 2
    })
    const res0 = parallel([], fn)
    expect(res0).resolves.toEqual([])
    await res0
    expect(fn).toHaveBeenCalledTimes(0)
    const res1 = parallel([1, 2, 3, 4, 5], fn, { limit: 2 })
    expect(res1).resolves.toEqual([2, 4, 6, 8, 10])
    await res1
    expect(fn).toHaveBeenCalledTimes(5)
  })
  it('队列处理', async () => {
    // 模拟异步任务
    // 5 个任务分别耗时 800 500 400 300 200
    // 理论上两个并行流程需要:
    // 800 -> 300 (1.1 秒)
    // 500 -> 400 -> 200 (1.2 秒)
    // 总计 1.2 秒
    const fn = jest.fn(async (n: number) => {
      runOrder.push(n)
      await sleep([0, 800, 500, 400, 300, 250][n])
      return n * 2
    })
    let runOrder: number[] = []
    const res1 = parallel([1, 2, 3, 4, 5], fn, { limit: 2 })
    expect(res1).resolves.toEqual([2, 4, 6, 8, 10])
    await sleep(300)
    // 800
    // 500
    expect(fn).toHaveBeenCalledTimes(2)
    await sleep(225)
    // 800
    // 500 -> 400
    expect(fn).toHaveBeenCalledTimes(3)
    await sleep(300)
    // 800 -> 300
    // 500 -> 400
    expect(fn).toHaveBeenCalledTimes(4)
    await sleep(300)
    expect(fn).toHaveBeenCalledTimes(5)
    expect(runOrder).toEqual([1, 2, 3, 4, 5])
  })
  it('错误处理', async () => {
    const fn = jest.fn(async (n: number) => {
      throw new Error(`${n}`)
    })
    const res0 = parallel([], fn)
    expect(res0).resolves.toEqual([])
    await res0
    expect(fn).toHaveBeenCalledTimes(0)
    const res1 = parallel([1, 2, 3, 4, 5], fn)
    expect(res1).rejects.toThrow(new Error(`Parallel execution failed on index: 0, 1, 2, 3, 4`))
    try {
      await res1
    } catch (e) {}
    expect(fn).toHaveBeenCalledTimes(5)
  })
})
