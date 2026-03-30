import { FORE_BASE, FORE_BASE_DIGITS } from './constants'

/** 移除前导零 limb，保留单个零 */
export function normalizeDigits(digits: number[]): number[] {
  let index = 0
  while (index < digits.length - 1 && digits[index] === 0) index += 1
  const normalized = digits.slice(index)
  return normalized.length ? normalized : [0]
}

/** 判断 limb 数组是否表示零 */
export function isZeroDigits(digits: number[]): boolean {
  return normalizeDigits(digits).every((digit) => digit === 0)
}

/** 比较两个非负整数 limb 数组 */
export function compareDigits(left: number[], right: number[]): -1 | 0 | 1 {
  const a = normalizeDigits(left)
  const b = normalizeDigits(right)
  if (a.length !== b.length) return a.length > b.length ? 1 : -1

  for (let index = 0; index < a.length; index += 1) {
    if (a[index] === b[index]) continue
    return a[index] > b[index] ? 1 : -1
  }
  return 0
}

/** 计算非负整数加法 */
export function addDigits(left: number[], right: number[]): number[] {
  const result: number[] = []
  let carry = 0
  let leftIndex = left.length - 1
  let rightIndex = right.length - 1

  while (leftIndex >= 0 || rightIndex >= 0 || carry > 0) {
    const sum = (left[leftIndex] ?? 0) + (right[rightIndex] ?? 0) + carry
    result.unshift(sum % FORE_BASE)
    carry = Math.floor(sum / FORE_BASE)
    leftIndex -= 1
    rightIndex -= 1
  }

  return normalizeDigits(result)
}

/** 计算非负整数减法，要求 left >= right */
export function subtractDigits(left: number[], right: number[]): number[] {
  const result = left.slice()
  let borrow = 0

  for (let leftIndex = left.length - 1, rightIndex = right.length - 1; leftIndex >= 0; leftIndex -= 1, rightIndex -= 1) {
    let current = result[leftIndex] - (right[rightIndex] ?? 0) - borrow
    if (current < 0) {
      current += FORE_BASE
      borrow = 1
    } else borrow = 0
    result[leftIndex] = current
  }

  return normalizeDigits(result)
}

/** 将非负整数乘以一个小整数 */
export function multiplyDigitsBySmallInt(digits: number[], multiplier: number): number[] {
  const normalized = normalizeDigits(digits)
  if (!multiplier || isZeroDigits(normalized)) return [0]

  const result = new Array(normalized.length)
  let carry = 0

  for (let index = normalized.length - 1; index >= 0; index -= 1) {
    const product = normalized[index] * multiplier + carry
    result[index] = product % FORE_BASE
    carry = Math.floor(product / FORE_BASE)
  }

  while (carry > 0) {
    result.unshift(carry % FORE_BASE)
    carry = Math.floor(carry / FORE_BASE)
  }

  return normalizeDigits(result)
}

/** 将非负整数乘以 10 的幂 */
export function multiplyDigitsByPowerOfTen(digits: number[], power: number): number[] {
  const normalized = normalizeDigits(digits)
  if (power <= 0 || isZeroDigits(normalized)) return normalized

  const limbShift = Math.floor(power / FORE_BASE_DIGITS)
  const decimalShift = power % FORE_BASE_DIGITS
  const decimalMultiplier = decimalShift ? 10 ** decimalShift : 1

  const shifted = multiplyDigitsBySmallInt(normalized, decimalMultiplier)
  if (!limbShift) return shifted
  return normalizeDigits(shifted.concat(new Array(limbShift).fill(0)))
}

/** 计算非负整数乘法 */
export function multiplyDigits(left: number[], right: number[]): number[] {
  const a = normalizeDigits(left)
  const b = normalizeDigits(right)
  if (isZeroDigits(a) || isZeroDigits(b)) return [0]

  const result = new Array(a.length + b.length).fill(0)
  for (let leftIndex = a.length - 1; leftIndex >= 0; leftIndex -= 1) {
    let carry = 0
    for (let rightIndex = b.length - 1; rightIndex >= 0; rightIndex -= 1) {
      const position = leftIndex + rightIndex + 1
      const product = a[leftIndex] * b[rightIndex] + result[position] + carry
      result[position] = product % FORE_BASE
      carry = Math.floor(product / FORE_BASE)
    }
    result[leftIndex] += carry
  }

  for (let index = result.length - 1; index > 0; index -= 1) {
    if (result[index] < FORE_BASE) continue
    const carry = Math.floor(result[index] / FORE_BASE)
    result[index] %= FORE_BASE
    result[index - 1] += carry
  }

  return normalizeDigits(result)
}

/** 对非负整数自增 1 */
export function incrementDigits(digits: number[]): number[] {
  return addDigits(normalizeDigits(digits), [1])
}

/**
 * 计算整数除法
 *
 * 返回的 quotient 与 remainder 都是非负整数的 limb 数组
 */
export function divideDigits(dividend: number[], divisor: number[]): { quotient: number[]; remainder: number[] } {
  const a = normalizeDigits(dividend)
  const b = normalizeDigits(divisor)
  if (isZeroDigits(b)) throw new Error('[ForeNumber] 除数不能为 0')
  if (compareDigits(a, b) < 0) {
    return { quotient: [0], remainder: a }
  }

  const quotient: number[] = []
  let remainder = [0]

  for (const digit of a) {
    remainder = normalizeDigits(remainder.concat(digit))
    let low = 0
    let high = FORE_BASE - 1
    let currentDigit = 0

    while (low <= high) {
      const middle = Math.floor((low + high) / 2)
      const product = multiplyDigitsBySmallInt(b, middle)
      const compared = compareDigits(product, remainder)
      if (compared <= 0) {
        currentDigit = middle
        low = middle + 1
      } else high = middle - 1
    }

    quotient.push(currentDigit)
    if (currentDigit > 0) {
      remainder = subtractDigits(remainder, multiplyDigitsBySmallInt(b, currentDigit))
    }
  }

  return {
    quotient: normalizeDigits(quotient),
    remainder: normalizeDigits(remainder)
  }
}
