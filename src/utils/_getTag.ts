const object2String = Object.prototype.toString
/**
 * 调用`Object.prototype.toString`获取对象类型名称
 * @param value 要判断的类型
 */
export function getTag(value: unknown): string {
  return object2String.call(value).slice(8, -1)
}
