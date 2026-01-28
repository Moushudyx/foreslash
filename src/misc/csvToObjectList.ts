import { isNil } from '../is'
import { csvToArray, type CSVParseOptions } from './csvToArray'

/**
 * CSV 对象解析选项
 */
export interface CSVObjectParseOptions extends CSVParseOptions {
  includeUnknown?: boolean
  emptyValue?: unknown
  emptyNumberValue?: number
  numberFields?: string[]
}

function normalizeOptions(options?: string | CSVObjectParseOptions): Required<CSVObjectParseOptions> {
  if (typeof options === 'string') {
    return {
      delimiter: options,
      skipEmptyLines: true,
      includeUnknown: false,
      emptyValue: '',
      emptyNumberValue: NaN,
      numberFields: [],
    }
  }

  // 默认使用逗号分隔，忽略空行，不包含未映射列，空值使用空字符串
  return {
    delimiter: options?.delimiter ?? ',',
    skipEmptyLines: options?.skipEmptyLines ?? true,
    includeUnknown: options?.includeUnknown ?? false,
    emptyValue: options?.emptyValue ?? '',
    emptyNumberValue: options?.emptyNumberValue ?? NaN,
    numberFields: options?.numberFields ?? [],
  }
}

/**
 * 将 CSV 字符串解析为对象列表
 * @param csv CSV 字符串
 * @param fields 字段映射数组, 每一项为 `[对象字段名, CSV 列名]`
 * @param options 配置项, 可设置分隔符、空行处理、空值默认值、数字字段等
 * @returns 对象列表
 * @example
 * ```js
 * const csv = '姓名,年龄\n张三,16\n李四,25'
 * const fields = [['name', '姓名'], ['age', '年龄']]
 * csvToObjectList(csv, fields)
 * // 返回:
 * // [{ name: '张三', age: '16' }, { name: '李四', age: '25' }]
 * ```
 * @version 0.3.9
 */
export function csvToObjectList(
  csv: string,
  fields: [string, string][],
  options?: string | (CSVObjectParseOptions & { emptyValue?: string; numberFields?: undefined })
): Record<string, string>[]
export function csvToObjectList(
  csv: string,
  fields: [string, string][],
  options?: string | (CSVObjectParseOptions & { numberFields?: undefined })
): Record<string, string | unknown>[]
export function csvToObjectList(
  csv: string,
  fields: [string, string][],
  options: string | (CSVObjectParseOptions & { emptyValue?: string; numberFields: string[] })
): Record<string, string | number>[]
export function csvToObjectList(
  csv: string,
  fields: [string, string][],
  options: string | (CSVObjectParseOptions & { numberFields: string[] })
): Record<string, string | number | unknown>[]
export function csvToObjectList(
  csv: string,
  fields: [string, string][],
  options?: string | CSVObjectParseOptions
): Record<string, string | number | unknown>[] {
  const normalized = normalizeOptions(options)
  const rows = csvToArray(csv, normalized)
  if (!rows.length) return []

  const [headers, ...data] = rows
  const fieldMap = new Map<string, string>(fields.map(([key, value]) => [value, key]))
  const numberFields = new Set(normalized.numberFields)
  const { includeUnknown, emptyValue, emptyNumberValue } = normalized

  /** 列下标到字段名的映射 */
  const fieldKeys = headers.map(header => fieldMap.get(header) ?? (includeUnknown ? header : undefined))

  return data.map((row) => {
    const record: Record<string, string | number | unknown> = {}
    // if (row.length === 0 || (row.length === 1 && row[0] === '')) return record // 空行处理
    for (let i = 0; i < headers.length; i++) {
      // const header = headers[i]
      // const fieldKey = fieldMap.get(header) ?? (includeUnknown ? header : undefined)
      const fieldKey = fieldKeys[i]
      if (!fieldKey) continue

      const isNumberField = numberFields.has(fieldKey)
      const raw = row[i]
      let value: string | number | unknown =
        isNil(raw) || raw === '' ? (isNumberField ? emptyNumberValue : emptyValue) : raw

      if (isNumberField && typeof value === 'string' && value.trim() !== '') {
        // const num = Number(value)
        // if (!Number.isNaN(num)) value = num
        value = Number(value)
      }

      record[fieldKey] = value
    }
    return record
  })
}
