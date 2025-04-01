import { getGlobalThis } from '../utils/index'

const global = /*#__PURE__*/ getGlobalThis()
const Buffer = global.Buffer
/**
 * 类型守卫，判断给定的值是否为`Buffer`(使用内置的 `Buffer.isBuffer` 方法)
 * - 非 Node.js 环境会使用当前环境的 `Buffer` 全局对象
 * @param value 要判断的值
 */
export const isBuffer = (Buffer && Buffer.isBuffer) || ((() => false) as unknown as (obj: any) => obj is Buffer)
