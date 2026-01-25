import { chunk } from '../array'
import { decimalNotation } from './decimalNotation'
/**
 * 将一个数字转换为汉语表达, 可以配置大写或小写, 默认使用小写(除了 0 默认使用 `零`)
 * @param num 需要转换的数字
 * @param options 格式化配置\
 * `type` 类型, 默认为 `normal`
 * - `'normal'` 习惯写法, 如 `2025` 会转换为 `二千零二十五`
 * - `'lower'` 小写, 如 `2025` 会转换为 `二千〇二十五`
 * - `'upper'` 大写, 如 `2025` 会转换为 `贰仟零贰拾伍`
 * - `'custom'` 自定义, 允许传入自定义的数字和单位字符, 具体见下方 `customNumerals` 和 `customUnits`
 *
 * `numeralsType` 数字类型, 默认为 `normal`
 * - `'normal'` 使用常规的中数表示法, 以万为单位, 万万为亿、万亿为兆、万兆为京
 * - `'minio'` 古代的下数表示法, 十万为亿、十亿为兆、十兆为京
 * - `'mega'` 古代的上数表示法, 万万为亿、亿亿为兆、兆兆为京
 *
 * `customNumerals` 自定义数字字符, 类型为 `ArrayLike<string>`\
 * 分别用于表示 0-9 , 仅在 `type` 为 `'custom'` 时有效\
 * 需要传入一个长度为 10 的字符串, 如 `'零壹贰叁肆伍陆柒捌玖'`\
 * 如果传入的长度不为 10, 则会抛出一个错误
 *
 * `customUnits` 自定义单位字符, 类型为 `ArrayLike<string>`\
 * 用于表示进位, 如 `'十百千万亿兆京垓秭穰沟涧正载'`\
 * 前 3 个单位固定表示十(10)、百(100)、千(1000), 后续单位根据 `numeralsType` 进行调整, 仅在 `type` 为 `'custom'` 时有效
 *
 * `integerUnit` 自定义整数部分的单位字符, 类型为 `string`\
 * 用于表示整数部分的单位, 如 `'元'`、`'块'` 等, 默认为空字符串 `''`\
 * 该选项会在整数部分的数字后面添加指定的单位字符
 *
 * `dot` 小数点字符, 类型为 `string`\
 * 用于表示小数点的字符, 默认为 `'点'`\
 * 该选项会替换默认的小数点字符
 *
 * `fractionalUnits` 小数部分的单位字符数组, 类型为 `ArrayLike<string>`\
 * 用于表示小数部分每一位的单位, 如 `['角', '分', '厘']` 等, 默认为空数组 `[]`\
 * 该选项会在小数部分的每一位数字后面添加对应的单位字符, 如果小数部分的位数超过了该数组的长度, 则超出部分不添加单位字符
 * @returns 返回一个汉语表达的数字
 * @example
 * ```js
 * chinaNumerals(2025) // 二千零二十五
 * chinaNumerals(2025, { type: 'upper' }) // 贰仟零贰拾伍
 * chinaNumerals(1002003, { type: 'lower' }) // 一百万二千〇三
 * ```
 * @version 0.3.7
 */
export function chinaNumerals(
  num: string | number,
  options?: {
    type?: 'normal' | 'lower' | 'upper' | 'custom'
    numeralsType?: 'normal' | 'minio' | 'mega'
    customNumerals?: ArrayLike<string>
    customUnits?: ArrayLike<string>
    integerUnit?: string
    dot?: string
    fractionalUnits?: ArrayLike<string>
  }
) {
  const str = decimalNotation(num)
  if (/NaN|Inf/.test(str)) return str
  const type = (options || {}).type || 'normal'
  const numeralsType = (options || {}).numeralsType || 'normal'
  const customNumerals = (options || {}).customNumerals
  const customUnits = Array.from(
    (options || {}).customUnits || (type === 'upper' ? '拾佰仟万亿兆京垓秭穰沟涧正载' : '十百千万亿兆京垓秭穰沟涧正载')
  )
  customUnits.unshift('') // 补齐个位的空单位
  if (type === 'custom' && (!customNumerals || customNumerals.length !== 10)) {
    throw new Error('Invalid customNumerals: customNumerals must be provided and its length must be 10.')
  }
  const numberChar = Array.from(
    type === 'normal'
      ? '零一二三四五六七八九'
      : type === 'lower'
        ? '〇一二三四五六七八九'
        : type === 'upper'
          ? '零壹贰叁肆伍陆柒捌玖'
          : customNumerals!
  )
  const zeroChar = numberChar[0]
  const zeroRegex = new RegExp(`${zeroChar}+`, 'g') // 用于匹配连续的零
  const trailingZeroRegex = new RegExp(`${zeroChar}$`) // 用于匹配结尾的零
  const [integer, fractional] = str.split('.')
  let integerPart = ''
  if (numeralsType === 'minio') {
    // 下数表示法每十变更一次数位, 无法处理超出 `customUnits` 长度的数字
    // 因为下数表示法的单位变化比较特殊, 需要在每 `customUnits.length` 一组时调整单位
    // 假设传入的 `customUnits` 为 '十百千万亿兆' 数字是 1_123045_000000
    // 按 6 个一组分为 '1'、 '123045'、 '000000'
    // 分别表达为 '一'、 '一亿二万三千零四十五万'、 '零'
    // 那么它的表示方式应该是 '一兆一亿二万三千零四十五兆'
    const chunks = chunk(Array.from(integer).reverse(), customUnits.length - 1) // 补过个位的空单位所以这里减 1
    // 此时的 chunks 是反的, 对应上面的例子就是 [ ['0','0','0','0','0','0'], ['5','4','0','3','2','1'], ['1'] ]
    const parts: string[] = []
    for (let i = 0; i < chunks.length; i++) {
      const subChunk = chunks[i].reverse()
      const chars = subChunk
        .map((digit, index) => {
          const num = Number(digit)
          const unitIndex = subChunk.length - 1 - index
          if (num === 0)
            return numberChar[num] // 如果是零则不添加数位
          else return numberChar[num] + customUnits[unitIndex]
        })
        .filter((part) => part !== '')
      // console.log('subChunk', subChunk)
      // console.log('chars', chars)
      if (chars.length > 0) {
        const stringified = chars.join('').replace(zeroRegex, zeroChar).replace(trailingZeroRegex, '') // 处理连续的零和结尾的零
        const unitIndex = i * (customUnits.length - 1)
        parts.unshift(stringified + (unitIndex > 0 ? customUnits[unitIndex] : ''))
      }
    }
    // console.log('parts', parts)
    const result = parts.join('').replace(zeroRegex, zeroChar).replace(trailingZeroRegex, '')
    // 如果传入的值为 0 则直接返回 零
    integerPart = result === '' ? numberChar[0] : result
  } else {
    // 中数和上数表示法有 4 个一组(每一万变更一次数位)的共同点
    // 将数字分为 4 个一组(个十百千), 然后每 4 组使用一个大单位
    // 中数: 万(10^4), 亿(10^8), 兆(10^12), 京(10^16)
    // 上数: 万(10^4), 亿(10^8), 万亿(10^12), 兆(10^16), 万兆(10^20), 亿兆(10^24), 万亿兆(10^28), 京(10^32)
    // 先统一处理 4 个一组, 然后根据类型调整大单位
    const chunks = chunk(Array.from(integer).reverse(), 4)
    // 此时的 chunks 是反的, 比如数字 1234567890 则为 [ ['0','9','8','7'], ['6','5','4','3'], ['2','1'] ]
    const parts: string[] = []
    for (let i = 0; i < chunks.length; i++) {
      const subChunk = chunks[i].reverse()
      const chars = subChunk
        .map((digit, index) => {
          const num = Number(digit)
          const unitIndex = subChunk.length - 1 - index
          if (num === 0)
            return numberChar[num] // 如果是零则不添加数位
          else return numberChar[num] + customUnits[unitIndex]
        })
        .filter((part) => part !== '')
      if (chars.length > 0) {
        const stringified = chars.join('').replace(zeroRegex, zeroChar).replace(trailingZeroRegex, '') // 处理连续的零和结尾的零
        let unitStr = ''
        if (numeralsType === 'normal') {
          unitStr = getNormalUnits(customUnits.slice(4), i) // 前 4 个单位固定表示十百千, 所以传入时需要 slice 掉
        } else if (numeralsType === 'mega') {
          unitStr = getMegaUnits(customUnits.slice(4), i) // 前 4 个单位固定表示十百千, 所以传入时需要 slice 掉
        }
        if (stringified !== '') parts.unshift(stringified + unitStr)
      }
    }
    const result = parts.join('').replace(zeroRegex, zeroChar).replace(trailingZeroRegex, '')
    // 如果传入的值为 0 则直接返回 零
    integerPart = result === '' ? numberChar[0] : result
  }
  integerPart += options?.integerUnit ?? ''
  return fractional
    ? integerPart +
        (options?.dot ?? '点') +
        fractional
          .split('')
          .map((d, i) => numberChar[Number(d)] + (options?.fractionalUnits?.[i] ?? ''))
          .join('')
    : integerPart
}
/**
 * 中数表示法(万万为亿, 万亿为兆)下的每万数位\
 * 假设传入的 `units` 为 ['万','亿','兆','京'] 则根据 `index` 返回\
 * - 0 -> '', 这一项表示万以内的数位, 不需要单位
 * - 1 -> '万'
 * - 2 -> '亿'
 * - 3 -> '兆'
 * - 4 -> '京'
 * - 5 -> '万京'
 * - 6 -> '亿京'
 * - 7 -> '兆京'
 * - 8 -> '京京'
 * - 9 -> '万京京'
 * - 11 -> '兆京京'
 * - 12 -> '京京京'
 * @param units 自定义的大单位数组
 * @param index 当前是第几组万数位
 * @returns 返回对应的单位字符串
 */
function getNormalUnits(units: string[], index: number) {
  // units[index - 1] 刚好是对应的单位
  if (index === 0) return ''
  if (index <= units.length) return units[index - 1]
  // 超出则组合, index / units.length 得到大单位的倍数, index % units.length 得到小单位的位置
  const majorCount = Math.floor(index / units.length)
  const minorIndex = index % units.length
  return (minorIndex > 0 ? units[minorIndex - 1] : '') + units[units.length - 1].repeat(majorCount)
}
/**
 * 上数表示法(亿亿为兆, 兆兆为京)下的每万数位\
 * 假设传入的 `units` 为 ['万','亿','兆','京'] 则根据 `index` 返回\
 * - 0 -> '', 这一项表示万以内的数位, 不需要单位
 * - 1 -> '万'
 * - 2 -> '亿'
 * - 3 -> '万亿'
 * - 4 -> '兆'
 * - 5 -> '万兆'
 * - 6 -> '亿兆'
 * - 7 -> '万亿兆'
 * - 8 -> '京'
 * - 9 -> '万京'
 * - 10 -> '亿京'
 * - 11 -> '万亿京'
 * - 12 -> '兆京'
 * - 13 -> '万兆京'
 * - 14 -> '亿兆京'
 * - 15 -> '万亿兆京'
 * - 16 -> '京京'
 * - 23 -> '万亿兆京京'
 * - 24 -> '京京京'
 * @param units 自定义的大单位数组
 * @param index 当前是第几组万数位
 * @returns 返回对应的单位字符串
 */
function getMegaUnits(units: string[], index: number) {
  if (index === 0) return ''
  if (index === 1) return units[0]
  // `2 ** (units.length - 1)` 刚好是最大的不重复组合数
  const combinations = 2 ** (units.length - 1)
  // index / combinations 得到大单位的倍数, index % combinations 得到小单位的组合位置
  const majorCount = Math.floor(index / combinations)
  let minorIndex = index % combinations
  // 利用位运算得到组合 如 5 = 0b101 则对应 ['万','亿','兆','京'] 中的 '万' 和 '兆'
  let result = ''
  for (let i = 0; i < units.length; i++) {
    if ((minorIndex & (1 << i)) !== 0) result += units[i]
  }
  return result + units[units.length - 1].repeat(majorCount)
}
