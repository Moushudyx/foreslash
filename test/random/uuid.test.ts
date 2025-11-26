import { uuidV4, uuidNil, uuidV7 } from '../../src/index'

describe('uuid', () => {
  it('基本测试', () => {
    // UUID V4
    const testUuidV4 = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/
    const uuid1 = uuidV4()
    const uuid2 = uuidV4()
    expect(uuid1).toMatch(testUuidV4)
    expect(uuid2).toMatch(testUuidV4)
    expect(uuid1).not.toBe(uuid2)
    const uuid3 = uuidV4()
    const uuid4 = uuidV4()
    expect(uuid3).toMatch(testUuidV4)
    expect(uuid4).toMatch(testUuidV4)
    expect(uuid3).not.toBe(uuid4)
    // UUID V7
    const testUuidV7 = /^[a-f0-9]{8}-[a-f0-9]{4}-7[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/
    const uuid5 = uuidV7()
    const uuid6 = uuidV7()
    expect(uuid5).toMatch(testUuidV7)
    expect(uuid6).toMatch(testUuidV7)
    expect(uuid5).not.toBe(uuid6)
    const uuid7 = uuidV7()
    const uuid8 = uuidV7()
    expect(uuid7).toMatch(testUuidV7)
    expect(uuid8).toMatch(testUuidV7)
    expect(uuid7).not.toBe(uuid8)
    // 空 UUID
    expect(uuidNil).toBe('00000000-0000-0000-0000-000000000000')
  })
})
