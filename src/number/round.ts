import { decimalNotation } from './decimalNotation'
import { isEven } from './isOdd'
/**
 * 数值修约, 可以使用 4 种修约方法, 默认使用四舍五入
 * - 四舍五入: 修约位置的后一位如果是 5 则进位, 否则不进位
 * - 四舍六入五成双: 修约位置的后一位如果是 5 且前一位是偶数则进位, 否则不进位
 * - 向下取整
 * - 向上取整
 * @param num 需要修约的数字
 * @param precision 精度, 小数点后几位
 * @param type 修约方法, 默认使用四舍五入
 * @example
 * ```js
 * // 四舍五入
 * round(1.95, 1) // '2.0'
 * round('1.95', 1) // '2.0'
 * // 四舍六入五成双
 * round('1.85', 1, 'banker') // '1.8'
 * round('1.95', 1, 'banker') // '2.0'
 * // 向下取整
 * round('1.95', 1, 'floor') // '1.9'
 * round(-1.95, 1, 'floor') // '-2.0'
 * // 向上取整
 * round('1.95', 1, 'ceil') // '2.0'
 * round(-1.95, 1, 'ceil') // '-1.9'
 * ```
 * @version 0.3.2
 */
export function round(num: string | number, precision: number, type?: 'round' | 'banker' | 'floor' | 'ceil') {
  const str = decimalNotation(num)
  if (/NaN|Inf/.test(str)) return str
  let [_integer, _fractional] = str.split('.')
  let sign = ''
  if (/^-/.test(_integer)) {
    _integer = _integer.substring(1)
    sign = '-'
  }
  _fractional = _fractional ?? ''
  const roundMap = { round: roundBase, banker: roundBank, floor: roundFloor, ceil: roundCeil }
  const [integer, fractional] = (roundMap[type || 'round'] || roundBase)(_integer, _fractional, precision, !!sign)
  if (precision > 0) return sign + integer + '.' + fractional
  else return sign + integer
}
/**
 * 四舍五入, 由于 JS 的 toFixed 有浮点误差所以不能使用
 * @example
 * ```js
 * // 四舍五入
 * roundBase('1', '34', 1, false) // ['1', '3']
 * roundBase('1', '35', 1, false) // ['1', '4']
 * roundBase('1', '36', 1, false) // ['1', '4']
 * // 与符号无关
 * roundBase('1', '34', 1, true) // ['1', '3']
 * roundBase('1', '35', 1, true) // ['1', '4']
 * roundBase('1', '36', 1, true) // ['1', '4']
 * ```
 * @version 0.3.2
 */
export function roundBase(
  integer: string,
  fractional: string,
  precision: number
  // isNegative: boolean
): [integer: string, fractional: string] {
  if (fractional.length > precision) {
    const splitF = fractional.substring(0, precision)
    if (Number(fractional[precision]) > 4) return increase(integer, splitF)
    return [integer, splitF]
  }
  if (fractional.length < precision) {
    fractional += '0'.repeat(precision - fractional.length)
  }
  return [integer, fractional]
}
/**
 * 四舍六入五成双
 * @example
 * ```js
 * // 四舍六入, 如果后一位是 5(000...) 则看前一位, 凑偶数
 * roundBank('1', '34', 1, false) // ['1', '3']
 * roundBank('1', '35', 1, false) // ['1', '4'] 五成双
 * roundBank('1', '36', 1, false) // ['1', '4']
 * roundBank('1', '44', 1, false) // ['1', '4']
 * roundBank('1', '45', 1, false) // ['1', '4'] 五成双
 * roundBank('1', '450001', 1, false) // ['1', '5'] 后一位比 5(000...) 多所以仍然进位
 * roundBank('1', '46', 1, false) // ['1', '5']
 * // 向整数进位也是如此
 * roundBank('1', '4', 0, false) // ['1', '']
 * roundBank('1', '5', 0, false) // ['2', ''] 五成双
 * roundBank('1', '6', 0, false) // ['2', '']
 * roundBank('2', '4', 0, false) // ['2', '']
 * roundBank('2', '5', 0, false) // ['2', ''] 五成双
 * roundBank('2', '6', 0, false) // ['3', '']
 * // 与符号无关
 * roundBank('1', '34', 1, true) // ['1', '3']
 * roundBank('1', '35', 1, true) // ['1', '4'] 五成双
 * roundBank('1', '36', 1, true) // ['1', '4']
 * roundBank('1', '44', 1, true) // ['1', '4']
 * roundBank('1', '45', 1, true) // ['1', '4'] 五成双
 * roundBank('1', '450001', 1, true) // ['1', '5']
 * roundBank('1', '46', 1, true) // ['1', '5']
 * ```
 * @version 0.3.2
 */
export function roundBank(
  integer: string,
  fractional: string,
  precision: number
  // isNegative: boolean
): [integer: string, fractional: string] {
  if (fractional.length > precision) {
    const splitF = fractional.substring(0, precision)
    const rightNumber = Number(fractional[precision])
    if (rightNumber < 5) return [integer, splitF] // 四舍
    if (rightNumber > 5) return increase(integer, splitF) // 六入
    // 特殊场景, 后一位确实是 5 但是再后面的数字不是 0
    const rightNumbers = fractional.substring(precision)
    console.log('rightNumbers:', rightNumbers);
    if (!/^50*$/.test(rightNumbers)) return increase(integer, splitF) // 1.450001 的场景
    // 五成双
    const leftNumber = Number(precision ? fractional[precision - 1] : integer[integer.length - 1])
    console.log('leftNumber:', leftNumber);
    console.log('isEven(leftNumber):', isEven(leftNumber));
    if (isEven(leftNumber)) return [integer, splitF] // 五成双 前一位是偶数则不作处理
    else return increase(integer, splitF)
  }
  if (fractional.length < precision) {
    fractional += '0'.repeat(precision - fractional.length)
  }
  return [integer, fractional]
}
/** 向下取整
 * @example
 * ```js
 * // 忽略后面的数字向下取整
 * roundFloor('1', '34', 1, false) // ['1', '3']
 * roundFloor('1', '36', 1, false) // ['1', '3']
 * roundFloor('1', '39', 1, false) // ['1', '3']
 * // 与符号有关 向更小的数字进位
 * roundFloor('1', '34', 1, true) // ['1', '4']
 * roundFloor('1', '35', 1, true) // ['1', '4']
 * roundFloor('1', '36', 1, true) // ['1', '4']
 * ```
 * @version 0.3.2
 */
export function roundFloor(
  integer: string,
  fractional: string,
  precision: number,
  isNegative: boolean
): [integer: string, fractional: string] {
  if (fractional.length > precision) {
    const splitF = fractional.substring(0, precision)
    if (isNegative) return increase(integer, splitF)
    return [integer, splitF]
  }
  if (fractional.length < precision) {
    fractional += '0'.repeat(precision - fractional.length)
  }
  return [integer, fractional]
}
/** 向上取整
 * @example
 * ```js
 * // 忽略后面的数字向上取整
 * roundCeil('1', '34', 1, false) // ['1', '4']
 * roundCeil('1', '35', 1, false) // ['1', '4']
 * roundCeil('1', '36', 1, false) // ['1', '4']
 * // 与符号有关 向更大的数字进位
 * roundCeil('1', '34', 1, true) // ['1', '3']
 * roundCeil('1', '35', 1, true) // ['1', '3']
 * roundCeil('1', '36', 1, true) // ['1', '3']
 * ```
 * @version 0.3.2
 */
export function roundCeil(
  integer: string,
  fractional: string,
  precision: number,
  isNegative: boolean
): [integer: string, fractional: string] {
  if (fractional.length > precision) {
    const splitF = fractional.substring(0, precision)
    if (!isNegative) return increase(integer, splitF)
    return [integer, splitF]
  }
  if (fractional.length < precision) {
    fractional += '0'.repeat(precision - fractional.length)
  }
  return [integer, fractional]
}

function increase(integer: string, fractional: string): [integer: string, fractional: string] {
  if (fractional) {
    const _fractional = _increase(fractional)
    if (_fractional.length > fractional.length) {
      return [_increase(integer), _fractional.substring(1)]
    }
    return [integer, _fractional]
  }
  return [_increase(integer), '']
}
function _increase(num: string): string {
  // '789' -> [ 9, 8, 7 ]
  const numList = num.split('').map(Number).reverse()
  // [ 9, 8, 7 ] -> [ 10, 8, 7, 0 ]
  numList[0] += 1
  numList.push(0)
  // [ 10, 8, 7, 0 ] -> [ 0, 9, 7, 0 ]
  for (let i = 0; i < numList.length; i++) {
    if (numList[i] > 9) {
      numList[i] -= 10
      numList[i + 1] += 1
    } else break
  }
  // [ 0, 9, 7, 0 ] -> [ 0, 9, 7 ]
  if (numList[numList.length - 1] === 0) numList.pop()
  // [ 0, 9, 7 ] -> '790'
  return numList.reverse().map(String).join('')
}
// function decrease(integer: string, fractional: string): [integer: string, fractional: string] {
//   if (fractional) {
//     const _fractional = _decrease(fractional)
//     if (_fractional.length > fractional.length) {
//       return [_decrease(integer), _fractional.substring(1)]
//     }
//     return [integer, _fractional]
//   }
//   return [_decrease(integer), '']
// }
// function _decrease(num: string): string {
//   // '210' -> [ 0, 1, 2 ]
//   const numList = num.split('').map(Number).reverse()
//   // [ 0, 1, 2 ] -> [ -1, 1, 2, 0 ]
//   numList[0] += 1
//   numList.push(0)
//   // [ -1, 1, 2, 0 ] -> [ 9, 0, 2, 0 ]
//   for (let i = 0; i < numList.length; i++) {
//     if (numList[i] < 0) {
//       numList[i] += 10
//       numList[i + 1] -= 1
//     } else break
//   }
//   // [ 9, 0, 2, 0 ] -> [ 9, 0, 2 ]
//   if (numList[numList.length - 1] === 0) numList.pop()
//   else numList[numList.length - 1] = 9 // [ ..., -1 ] -> [ ..., 9 ]
//   // [ 9, 0, 2 ] -> '209'
//   return numList.reverse().map(String).join('')
// }
