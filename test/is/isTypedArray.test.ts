import { isBigInt64Array, isBigUint64Array, isFloat32Array, isFloat64Array, isInt16Array, isInt32Array, isInt8Array, isTypedArray, isUint16Array, isUint32Array, isUint8Array, isUint8ClampedArray } from '../../src'

describe('isTypedArray', () => {
  it('isTypedArray', () => {
    expect(isTypedArray(new Int8Array([1, 2, 3]))).toBe(true)
    expect(isTypedArray(new Int16Array([1, 2, 3]))).toBe(true)
    expect(isTypedArray(new Int32Array([1, 2, 3]))).toBe(true)
    expect(isTypedArray(new Uint8Array([1, 2, 3]))).toBe(true)
    expect(isTypedArray(new Uint8ClampedArray([1, 2, 3]))).toBe(true)
    expect(isTypedArray(new Uint16Array([1, 2, 3]))).toBe(true)
    expect(isTypedArray(new Uint32Array([1, 2, 3]))).toBe(true)
    expect(isTypedArray(new Float32Array([1.2, 3.4]))).toBe(true)
    expect(isTypedArray(new Float64Array([1.2, 3.4]))).toBe(true)
    expect(isTypedArray(new BigInt64Array([BigInt(1), BigInt(2), BigInt(3)]))).toBe(true)
    expect(isTypedArray(new BigUint64Array([BigInt(1), BigInt(2), BigInt(3)]))).toBe(true)
    expect(isTypedArray([])).toBe(false)
    expect(isTypedArray(null)).toBe(false)
    expect(isTypedArray(new ArrayBuffer(8))).toBe(false)
  })

  it('Int8Array', () => {
    expect(isInt8Array(new Int8Array([1, 2, 3]))).toBe(true)
    expect(isInt8Array(new Uint8Array([1, 2, 3]))).toBe(false)
    expect(isInt8Array([])).toBe(false)
    expect(isInt8Array(null)).toBe(false)
    expect(isInt8Array(new ArrayBuffer(8))).toBe(false)
  })

  it('Int16Array', () => {
    expect(isInt16Array(new Int16Array([1, 2, 3]))).toBe(true)
    expect(isInt16Array(new Uint8Array([1, 2, 3]))).toBe(false)
    expect(isInt16Array([])).toBe(false)
    expect(isInt16Array(null)).toBe(false)
    expect(isInt16Array(new ArrayBuffer(8))).toBe(false)
  })

  it('Int32Array', () => {
    expect(isInt32Array(new Int32Array([1, 2, 3]))).toBe(true)
    expect(isInt32Array(new Uint8Array([1, 2, 3]))).toBe(false)
    expect(isInt32Array([])).toBe(false)
    expect(isInt32Array(null)).toBe(false)
    expect(isInt32Array(new ArrayBuffer(8))).toBe(false)
  })

  it('Uint8Array', () => {
    expect(isUint8Array(new Uint8Array([1, 2, 3]))).toBe(true)
    expect(isUint8Array(new Int8Array([1, 2, 3]))).toBe(false)
    expect(isUint8Array([])).toBe(false)
    expect(isUint8Array(null)).toBe(false)
    expect(isUint8Array(new ArrayBuffer(8))).toBe(false)
  })

  it('Uint8ClampedArray', () => {
    expect(isUint8ClampedArray(new Uint8ClampedArray([1, 2, 3]))).toBe(true)
    expect(isUint8ClampedArray(new Uint8Array([1, 2, 3]))).toBe(false)
    expect(isUint8ClampedArray([])).toBe(false)
    expect(isUint8ClampedArray(null)).toBe(false)
    expect(isUint8ClampedArray(new ArrayBuffer(8))).toBe(false)
  })

  it('Uint16Array', () => {
    expect(isUint16Array(new Uint16Array([1, 2, 3]))).toBe(true)
    expect(isUint16Array(new Uint8Array([1, 2, 3]))).toBe(false)
    expect(isUint16Array([])).toBe(false)
    expect(isUint16Array(null)).toBe(false)
    expect(isUint16Array(new ArrayBuffer(8))).toBe(false)
  })

  it('Uint32Array', () => {
    expect(isUint32Array(new Uint32Array([1, 2, 3]))).toBe(true)
    expect(isUint32Array(new Uint8Array([1, 2, 3]))).toBe(false)
    expect(isUint32Array([])).toBe(false)
    expect(isUint32Array(null)).toBe(false)
    expect(isUint32Array(new ArrayBuffer(8))).toBe(false)
  })

  it('Float32Array', () => {
    expect(isFloat32Array(new Float32Array([1.2, 3.4]))).toBe(true)
    expect(isFloat32Array(new Uint8Array([1, 2, 3]))).toBe(false)
    expect(isFloat32Array([])).toBe(false)
    expect(isFloat32Array(null)).toBe(false)
    expect(isFloat32Array(new ArrayBuffer(8))).toBe(false)
  })

  it('Float64Array', () => {
    expect(isFloat64Array(new Float64Array([1.2, 3.4]))).toBe(true)
    expect(isFloat64Array(new Uint8Array([1, 2, 3]))).toBe(false)
    expect(isFloat64Array([])).toBe(false)
    expect(isFloat64Array(null)).toBe(false)
    expect(isFloat64Array(new ArrayBuffer(8))).toBe(false)
  })

  it('BigInt64Array', () => {
    expect(isBigInt64Array(new BigInt64Array([BigInt(1), BigInt(2), BigInt(3)]))).toBe(true)
    expect(isBigInt64Array(new Uint8Array([1, 2, 3]))).toBe(false)
    expect(isBigInt64Array([])).toBe(false)
    expect(isBigInt64Array(null)).toBe(false)
    expect(isBigInt64Array(new ArrayBuffer(8))).toBe(false)
  })

  it('BigUint64Array', () => {
    expect(isBigUint64Array(new BigUint64Array([BigInt(1), BigInt(2), BigInt(3)]))).toBe(true)
    expect(isBigUint64Array(new Uint8Array([1, 2, 3]))).toBe(false)
    expect(isBigUint64Array([])).toBe(false)
    expect(isBigUint64Array(null)).toBe(false)
    expect(isBigUint64Array(new ArrayBuffer(8))).toBe(false)
  })
})
