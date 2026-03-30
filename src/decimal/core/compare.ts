import type ForeNumber from '../decimal'

/**
 * 比较两个 ForeNumber 的数值大小
 */
export function compare(thisValue: ForeNumber, otherValue: ForeNumber): -1 | 0 | 1 {
  if (thisValue._k !== 'normal' || otherValue._k !== 'normal') {
    return compareSpecial(thisValue._k, otherValue._k)
  }
  if (thisValue._s !== otherValue._s) return thisValue._s > otherValue._s ? 1 : -1
  if (thisValue._s === 0) return 0

  const absCompare = compareAbs(thisValue._e, thisValue._d, otherValue._e, otherValue._d)
  if (absCompare === 0) return 0
  return thisValue._s > 0 ? absCompare : (absCompare * -1) as -1 | 1
}

/** 比较特殊值（NaN、Infinity 等）顺序 */
function compareSpecial(a: ForeNumber['_k'], b: ForeNumber['_k']): -1 | 0 | 1 {
  const rank: Record<ForeNumber['_k'], number> = {
    '-inf': -2,
    normal: 0,
    inf: 2,
    nan: 3
  }
  if (a === 'nan' && b === 'nan') return 0
  if (a === 'nan') return 1
  if (b === 'nan') return -1
  if (rank[a] === rank[b]) return 0
  return rank[a] > rank[b] ? 1 : -1
}

/** 比较绝对值大小 */
function compareAbs(e1: number, d1: number[], e2: number, d2: number[]): -1 | 0 | 1 {
  const mag1 = e1 + d1.length
  const mag2 = e2 + d2.length
  if (mag1 !== mag2) return mag1 > mag2 ? 1 : -1

  const minE = Math.min(e1, e2)
  const p1 = d1.concat(new Array(e1 - minE).fill(0))
  const p2 = d2.concat(new Array(e2 - minE).fill(0))
  const len = Math.max(p1.length, p2.length)

  for (let i = 0; i < len; i++) {
    const a = p1[i] ?? 0
    const b = p2[i] ?? 0
    if (a === b) continue
    return a > b ? 1 : -1
  }
  return 0
}
