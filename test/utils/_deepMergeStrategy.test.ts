import { getBaseMargeType } from "../../src/utils/_deepMergeStrategy"

describe('getBaseMargeType', () => {
  it('基本类型', () => {
    expect(getBaseMargeType(1)).toBe('Number')
    expect(getBaseMargeType('1')).toBe('String')
    expect(getBaseMargeType(true)).toBe('Boolean')
    expect(getBaseMargeType(null)).toBe('Null')
    expect(getBaseMargeType(undefined)).toBe('Undefined')
    expect(getBaseMargeType(Symbol('1'))).toBe('Symbol')
  })
  it('特殊类型', () => {
    // Iterator 是 ECMAScript 2027 引入的一个新的内置对象, Node.js 22+ 和现代浏览器均已支持, 但在一些老环境中可能不支持, 因此在测试中需要进行兼容性处理
    if (typeof Iterator === 'undefined') {
      globalThis.Iterator = class Iterator {
        static from(object: any) {
          const iterator = object[Symbol.iterator]()
          iterator[Symbol.name] = 'Iterator'
          return iterator
        }
        [Symbol.name]() {
          return 'Iterator'
        }
      }
    }
    expect(getBaseMargeType({})).toBe('Object')
    expect(getBaseMargeType([])).toBe('Array')
    expect(getBaseMargeType(new Set())).toBe('Set')
    expect(getBaseMargeType(new Map())).toBe('Map')
    expect(getBaseMargeType(new FormData())).toBe('FormData')
    expect(getBaseMargeType(new Date())).toBe('Date')
    expect(getBaseMargeType(/1/)).toBe('RegExp')
    expect(getBaseMargeType(Promise.resolve())).toBe('Promise')
    expect(getBaseMargeType(() => {})).toBe('Function')
    expect(getBaseMargeType(async () => {})).toBe('Function')
    expect(getBaseMargeType(function* () {})).toBe('Function')
    expect(getBaseMargeType((function* () {})())).toBe('Generator')
    expect(getBaseMargeType(Iterator.from('123'))).toBe('Iterator')
    expect(getBaseMargeType(Iterator.from([1,2,3]))).toBe('Iterator')
    expect(getBaseMargeType(Iterator.from(new Set()))).toBe('Iterator')
    expect(getBaseMargeType(new ArrayBuffer(8))).toBe('ArrayBuffer')
    expect(getBaseMargeType(new Blob())).toBe('Blob')
    expect(getBaseMargeType(new File([], 'test.txt'))).toBe('File')
    expect(getBaseMargeType(new DataView(new ArrayBuffer(8)))).toBe('DataView')
  })
})
