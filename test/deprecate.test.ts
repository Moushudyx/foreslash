import { deprecate } from '../src'

describe('deprecate', () => {
  let warnSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
  })

  afterEach(() => {
    warnSpy.mockRestore()
  })

  it('基本使用：首次调用仅告警一次，返回值透传', () => {
    const fn = (a: number, b: number) => a + b
    const wrapped = deprecate(fn as any, '不建议使用该方法')

    const r1 = wrapped(1, 2)
    const r2 = wrapped(3, 4)
    const r3 = wrapped(5, 6)

    expect(r1).toBe(3)
    expect(r2).toBe(7)
    expect(r3).toBe(11)

    expect(warnSpy).toHaveBeenCalledTimes(1)
    // 无 code 时仅携带消息文本
    expect(warnSpy.mock.calls[0].length).toBe(1)
    expect(warnSpy.mock.calls[0][0]).toBe('不建议使用该方法')
  })

  it('携带 code：首次调用警告前缀为 [code] 与消息', () => {
    const fn = () => 'ok'
    const wrapped = deprecate(fn as any, '请使用新方法', 'Foreslash')

    const r = wrapped()
    expect(r).toBe('ok')

    expect(warnSpy).toHaveBeenCalledTimes(1)
    // 有 code 时以两个参数输出
    expect(warnSpy.mock.calls[0][0]).toBe('[Foreslash]')
    expect(warnSpy.mock.calls[0][1]).toBe('请使用新方法')
  })

  it('保持 this 与参数透传', () => {
    const obj = {
      base: 10,
      sum(this: any, x: number, y: number) {
        return this.base + x + y
      },
    }
    const wrapped = deprecate(obj.sum as any, 'deprecated')

    const res = wrapped.call({ base: 5 }, 2, 3)
    expect(res).toBe(10)

    // 仅第一次触发告警
    expect(warnSpy).toHaveBeenCalledTimes(1)
  })
})
