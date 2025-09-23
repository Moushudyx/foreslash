import { isPlainObject } from '../../src'

describe('isPlainObject', () => {
  it('基本功能', () => {
    expect(isPlainObject({})).toBe(true)
    expect(isPlainObject(Object.create(null))).toBe(true)
    expect(isPlainObject({ ...[1, 2, 3] })).toBe(true)
    expect(isPlainObject(Math)).toBe(true)
    expect(isPlainObject([])).toBe(false)
    expect(isPlainObject(/123/)).toBe(false)
    expect(isPlainObject(Object(123))).toBe(false)
    expect(isPlainObject(123)).toBe(false)
    expect(isPlainObject(null)).toBe(false)
  })
  it('特殊场景1 篡改 prototype', () => {
    function Malicious(this: any) {
      Object.defineProperty(this, 'aaa', { enumerable: false })
    }
    Malicious.prototype = Object.create(Object.prototype) // 将原型指向 Object.prototype
    const obj = new (Malicious as unknown as { new (): any })()
    expect(isPlainObject(obj)).toBe(false)
  })
  it('特殊场景2 篡改 constructor', () => {
    function Malicious(this: any) {
      Object.defineProperty(this, 'bbb', { enumerable: false })
    }
    Malicious.prototype = Object.create(Object.prototype) // 将原型指向 Object.prototype
    Malicious.prototype.constructor = null // 手动设置一个 constructor
    const obj = new (Malicious as unknown as { new (): any })()
    expect(isPlainObject(obj)).toBe(false)
  })
  it('特殊场景3 完全篡改 prototype', () => {
    function Malicious(this: any) {
      Object.defineProperty(this, 'ccc', { enumerable: false })
    }
    Malicious.prototype = Object.create(Object.prototype) // 将原型指向 Object.prototype
    Malicious.prototype.constructor = Object.prototype.constructor // 伪造 constructor
    const obj = new (Malicious as unknown as { new (): any })()
    expect(isPlainObject(obj)).toBe(false)
  })
})
