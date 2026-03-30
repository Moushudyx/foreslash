import type ForeNumber from '../decimal'

/**
 * 转换为十进制字符串
 */
export function toDecimalString(this: ForeNumber): string {
  if (this._k === 'nan') return 'NaN'
  if (this._k === 'inf') return 'Infinity'
  if (this._k === '-inf') return '-Infinity'
  if (this._s === 0) return '0'
  /** 系数 coefficient */
  let coeff = this._d[0].toString()
  for (let i = 1; i < this._d.length; i++) {
    coeff += this._d[i].toString().padStart(4, '0')
  }

  if (this._e > 0) {
    coeff += '0'.repeat(this._e * 4)
  } else if (this._e < 0) {
    const point = coeff.length + this._e * 4
    if (point <= 0) {
      coeff = `0.${'0'.repeat(-point)}${coeff}`
    } else {
      coeff = `${coeff.slice(0, point)}.${coeff.slice(point)}`
    }
    coeff = coeff.replace(/\.0+$/, '').replace(/(\.\d*?)0+$/, '$1')
  }

  return this._s < 0 ? `-${coeff}` : coeff
}

/**
 * 转换为原生 number
 */
export function toNumberValue(this: ForeNumber): number {
  return Number(toDecimalString.call(this))
}
