import { arrayToCSV, type CSVStringifyOptions } from './arrayToCSV'

/**
 * 根据对象列表生成 CSV 字符串
 * @param objList 对象列表
 * @param fields 字段映射数组, 每一项为 `[对象字段名, CSV 列名]`
 * @param options 配置项, 可设置分隔符、BOM、换行符、引号策略
 * @returns CSV 格式的字符串
 * @example
 * ```js
 * const objList = [
 *  { name: '张三', age: 16, city: '上海' },
 *  { name: '李四', age: 25, city: '新加坡' }
 * ]
 * const fields = [
 * ['name', '姓名'],
 * ['age', '年龄'],
 * ['city', '城市']
 * ]
 * objectListToCSV(objList, fields)
 * // 返回:
 * // 姓名,年龄,城市
 * // 张三,16,上海
 * // 李四,25,新加坡
 * ```
 * @version 0.3.9
 */
export function objectListToCSV(
  objList: Record<string, any>[],
  fields: [string, string][],
  options?: string | CSVStringifyOptions
): string {
  const data: any[][] = []
  data.push(fields.map((f) => f[1])) // 添加表头
  for (const obj of objList) {
    const row: any[] = []
    for (const field of fields) {
      row.push(obj[field[0]] ?? '') // 如果字段不存在则使用空字符串
    }
    data.push(row)
  }
  return arrayToCSV(data, options)
}
