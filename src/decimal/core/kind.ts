import type { ForeKind } from '../types'

/**
 * 将旧版 _t 数值映射为内部 kind
 */
export function kindFromLegacyTag(tag: number): ForeKind {
  if (tag === 1) return 'normal'
  if (Number.isNaN(tag)) return 'nan'
  if (tag === Infinity) return 'inf'
  if (tag === -Infinity) return '-inf'
  return 'nan'
}

/**
 * 将内部 kind 映射为旧版 _t 数值
 */
export function legacyTagFromKind(kind: ForeKind): number {
  if (kind === 'normal') return 1
  if (kind === 'inf') return Infinity
  if (kind === '-inf') return -Infinity
  return Number.NaN
}
