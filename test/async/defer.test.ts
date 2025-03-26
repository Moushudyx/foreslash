import { defer, sleep } from '../../src/index'

describe('defer', () => {
  it('基本功能', async () => {
    const res: number[] = []
    // 基本用法
    await defer((cleanUp) => {
      cleanUp(() => res.push(2))
      cleanUp(() => res.push(3))
      res.push(1)
    }) // 依次输出 1 2 3
    expect(res).toEqual([1, 2, 3])
    // 动态取消计划好的延迟操作
    await defer((cleanUp, cancelCleanUp) => {
      const cleanUpId = cleanUp(() => res.push(123))
      cleanUp(() => res.push(5))
      cleanUp(() => res.push(6))
      res.push(4)
      cancelCleanUp(cleanUpId)
    }) // 依次输出 4 5 6
    expect(res).toEqual([1, 2, 3, 4, 5, 6])
    await defer((cleanUp, cancelCleanUp) => {
      const sideEffect1 = () => res.push(1)
      const sideEffect2 = () => res.push(2)
      const sideEffect3 = () => res.push(9)
      cleanUp(sideEffect1)
      const cleanUpId1 = cleanUp(sideEffect2)
      const cleanUpId2 = cleanUp(() => res.push(1))
      cleanUp(sideEffect3)
      const cleanUpId3 = cleanUp(() => res.push(1))
      const cleanUpId4 = cleanUp(() => res.push(1))
      res.push(7)
      res.push(8)
      cancelCleanUp(sideEffect1)
      cancelCleanUp(cleanUpId1)
      cancelCleanUp(cleanUpId2)
      cancelCleanUp(cleanUpId3)
      cancelCleanUp(cleanUpId4)
    }) // 依次输出 7 8 9
    expect(res).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
  })
  it('处理报错信息', async () => {
    const res: number[] = []

    const errDefer1 = defer(
      (cleanUp) => {
        cleanUp(() => res.push(2))
        cleanUp(() => res.push(3))
        cleanUp(() => {
          throw new Error('1')
        })
        res.push(1)
        cleanUp(() => res.push(4))
      },
      { rethrow: true }
    ) // 依次输出 1 2 3
    expect(errDefer1).rejects.toEqual(new Error('1'))
    await sleep(1);
    expect(res).toEqual([1, 2, 3])

    const errDefer2 = defer(
      (cleanUp) => {
        cleanUp(() => res.push(5))
        cleanUp(() => res.push(6))
        res.push(4)
        throw new Error('2')
      },
      { rethrow: true }
    )
    expect(errDefer2).rejects.toEqual(new Error('2'))
    await sleep(1);
    expect(res).toEqual([1, 2, 3, 4, 5, 6])
  })
})
