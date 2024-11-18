export type VarCase = {
  code: string
  /** 是否为全大写 */
  upperCase: boolean
  /** 是否为数字串 */
  number: boolean
}

const getDefaultVarCase: () => VarCase = () => ({ code: '', upperCase: false, number: false })
const isUpperCase = /*#__PURE__*/ RegExp.prototype.test.bind(/[A-Z]/)
const isLowerCase = /*#__PURE__*/ RegExp.prototype.test.bind(/[a-z]/)
const isNumberCase = /*#__PURE__*/ RegExp.prototype.test.bind(/[0-9]/)
const isSymbolCase = /*#__PURE__*/ RegExp.prototype.test.bind(/[^a-z0-9A-Z]/)
/** 使用后可以用`caseConvert`组合为适合的格式 */
export function _splitVar(c: string) {
  const res = [] as VarCase[]
  // 拆分逻辑：
  // a 基本拆分：
  //     1 空字符串 - 前后拆分
  //     2 特殊字符 - 前后拆分
  //     3 数字     - 连续数字归为一个，前后拆分
  // b 驼峰拆分：
  //     1 连续大写 - 归为一个
  //     2 连续小写 - 与这一串的前一个大写（若有）归为一串
  let temp: VarCase = getDefaultVarCase()
  let i: number
  for (i = 0; i < c.length; i++) {
    const char = c[i]
    if (isSymbolCase(char)) {
      // a-1 a-2
      if (temp.code) {
        // 前后拆分
        res.push(temp)
        temp = getDefaultVarCase()
      }
    } else if (isNumberCase(char)) {
      // a-3
      if (!temp.code) temp.number = true
      if (temp.number) {
        // 连续数字归为一个
        temp.code += char
      } else {
        // 前后拆分
        res.push(temp)
        temp = { code: char, number: true, upperCase: false }
      }
    } else if (isLowerCase(char)) {
      // b-2
      if (!temp.code) {
        // 归为一串
        temp.code += char
      } else if (temp.upperCase) {
        // 与这一串的前一个大写（若有）归为一串
        if (temp.code.length === 1) {
          temp.upperCase = false
          temp.code += char
        } else {
          const lastUpperCase = temp.code[temp.code.length - 1]
          temp.code = temp.code.slice(0, -1)
          res.push(temp)
          temp = { code: lastUpperCase + char, upperCase: false, number: false }
        }
      } else if (temp.number) {
        res.push(temp)
        temp = { code: char, upperCase: false, number: false }
      } else {
        // 归为一串
        temp.code += char
      }
    } else if (isUpperCase(char)) {
      // b-1
      //归为一个
      if (!temp.code) temp.upperCase = true
      if (temp.upperCase) {
        // 归为一串
        temp.code += char
      } else {
        // 前后拆分
        res.push(temp)
        temp = { code: char, upperCase: true, number: false }
      }
    }
  }
  res.push(temp)
  return res
}
