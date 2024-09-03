import type { A } from 'ts-toolbelt'
// 定义一个占位符，兼容 Ramda
/** 兼容 Ramda */
export type Placeholder = A.x & { '@@functional/placeholder': true }
/** 函数柯里化占位符，兼容 Ramda */
export const _ = /*#__PURE__*/ Object.freeze({ '@@functional/placeholder': true }) as Placeholder
/**
 * 判断给定的参数是否为占位符，兼容 Ramda
 * @param arg 需要判定的参数
 * @returns 是否为占位符
 */
export function isPlaceholder(arg: any): arg is Placeholder {
  return typeof arg === 'object' && Boolean(arg) && arg['@@functional/placeholder'] === true
}
