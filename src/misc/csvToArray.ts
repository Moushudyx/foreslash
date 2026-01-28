/**
 * CSV 解析选项
 */
export interface CSVParseOptions {
  delimiter?: string
  skipEmptyLines?: boolean
}

function normalizeOptions(options?: string | CSVParseOptions): Required<CSVParseOptions> {
  if (typeof options === 'string') {
    return { delimiter: options, skipEmptyLines: true }
  }

  // 默认使用逗号分隔，并忽略空行
  return {
    delimiter: options?.delimiter ?? ',',
    skipEmptyLines: options?.skipEmptyLines ?? true,
  }
}

/**
 * 将 CSV 字符串解析为二维数组
 * @param csv CSV 字符串
 * @param options 配置项, 可设置分隔符与是否跳过空行
 * @returns 二维数组
 * @example
 * ```js
 * csvToArray('姓名,年龄\n张三,16\n李四,25')
 * // 返回:
 * // [['姓名', '年龄'], ['张三', '16'], ['李四', '25']]
 * ```
 * @version 0.3.9
 */
export function csvToArray(csv: string, options?: string | CSVParseOptions): string[][] {
  if (!csv) return []

  const { delimiter, skipEmptyLines } = normalizeOptions(options)
  const text = csv.charCodeAt(0) === 0xfeff ? csv.slice(1) : csv // 移除 BOM

  const rows: string[][] = []
  let row: string[] = []
  let field = ''
  let inQuotes = false

  for (let i = 0; i < text.length; i++) {
    const char = text[i]

    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          field += '"'
          i++
        } else {
          inQuotes = false
        }
      } else {
        field += char
      }
      continue
    }

    if (char === '"') {
      inQuotes = true
      continue
    }

    if (char === delimiter) {
      row.push(field)
      field = ''
      continue
    }

    if (char === '\r') {
      if (text[i + 1] === '\n') i++
      row.push(field)
      field = ''
      if (!(skipEmptyLines && row.length === 1 && row[0] === '')) {
        rows.push(row)
      }
      row = []
      continue
    }

    if (char === '\n') {
      row.push(field)
      field = ''
      if (!(skipEmptyLines && row.length === 1 && row[0] === '')) {
        rows.push(row)
      }
      row = []
      continue
    }

    field += char
  }

  row.push(field)
  if (!(skipEmptyLines && row.length === 1 && row[0] === '')) {
    rows.push(row)
  }

  return rows
}
