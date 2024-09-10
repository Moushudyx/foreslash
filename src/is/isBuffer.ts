import { getGlobalThis } from '../utils/index'

const global = /*#__PURE__*/ getGlobalThis()
const Buffer = /*#__PURE__*/ global.Buffer
/**
 * 类型守卫，判断给定的值是否为`Buffer`(node 专用，使用内置的 `Buffer.isBuffer` 方法)
 * @param value 要判断的值
 */
export const isBuffer =
  /*#__PURE__*/ (Buffer && Buffer.isBuffer) || ((() => false) as unknown as (obj: any) => obj is Buffer)
