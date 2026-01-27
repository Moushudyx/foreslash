/** CSV 字符串选项 */
export interface CSVStringifyOptions {
  delimiter?: string
  bom?: boolean
  newline?: '\n' | '\r\n'
  quoteAll?: boolean
}

function normalizeOptions(options?: string | CSVStringifyOptions): Required<CSVStringifyOptions> {
  if (typeof options === 'string') {
    return { delimiter: options, bom: false, newline: '\n', quoteAll: false }
  }

  // 默认使用逗号分隔、不添加 BOM、Unix 换行、仅在必要时加引号
  return {
    delimiter: options?.delimiter ?? ',',
    bom: options?.bom ?? false,
    newline: options?.newline ?? '\n',
    quoteAll: options?.quoteAll ?? false,
  }
}
/**
 * 将二维数组转换为 CSV 格式的字符串
 * @param data 二维数组
 * @param options 配置项, 可设置分隔符、BOM、换行符、引号策略\
 * 直接传入字符串时表示分隔符\
 * `delimiter` 分隔符, 默认为 `,`\
 * `bom` 是否在开头添加 BOM, 默认为 `false`\
 * `newline` 换行符, 可选值为 `\n` 或 `\r\n`, 默认为 `\n`\
 * `quoteAll` 是否对所有字段加引号, 默认为 `false`, 仅在必要时加引号
 * @returns CSV 格式的字符串
 * @example
 * ```js
 * arrayToCSV([['姓名', '年龄'], ['张三', 16], ['李四', 25]])
 * // 返回:
 * // 姓名,年龄
 * // 张三,16
 * // 李四,25
 * ```
 * @version 0.3.9
 */
export function arrayToCSV(data: any[][], options?: string | CSVStringifyOptions): string {
  const { delimiter, bom, newline, quoteAll } = normalizeOptions(options)

  const content = data
    .map((row) =>
      row
        .map((item) => {
          const str = String(item)

          if (quoteAll) {
            return `"${str.replace(/"/g, '""')}"`
          }

          if (typeof item === 'string' && (item.includes(delimiter) || item.includes('"') || item.includes('\n'))) {
            return `"${str.replace(/"/g, '""')}"`
          }

          return str
        })
        .join(delimiter)
    )
    .join(newline)

  return bom ? `\uFEFF${content}` : content
}
