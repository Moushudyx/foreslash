/**
 * 将值转换为一个数组
 * @param value 需要处理的值
 * @returns 一个数组, 如果输入值是数组, 则输出的数组是其**浅拷贝**; 如果输入不是数组，则将输入包进一个新数组里
 * @example
 * ```js
 * // 如果输入不是数组，则将输入包进一个新数组里
 * castArray(1) // [1]
 * castArray('1') // ['1']
 * castArray(null) // [null]
 *
 * // 如果输入值是数组, 则输出的数组是其浅拷贝
 * castArray([1, 2, 3, 4, 5]) // [1, 2, 3, 4, 5]
 * ```
 * @version 0.3.3
 */
export function castArray<T>(value: T): CastArray<T> {
  return Array.isArray(value) ? (value.slice() as CastArray<T>) : ([value] as CastArray<T>)
}
/**
 * 将任意输入处理为数组:
 * 1. `never` 类型判断, 确保 `castArray<never>` 返回 `never[]` 而不是 `unknown[]`
 * 2. `unknown` 类型判断, `unknown` 是顶级类型, 需要特殊处理
 * 3. `readonly any[]` 类型判断, 输出的类型需要去除 `readonly`
 * 4. 非数组类型判断, 处理联合类型
 *
 * 数组类型判据:
 * - 如果 `Exclude<T, readonly any[]> extends never` 意味着 `T` 的类型与 `any[]` 兼容, 此时应该走逻辑 3
 *
 * @example
 * ```ts
 * type T = CastArray<string> // string[]
 * type T = CastArray<string[]> // string[]
 * type T = CastArray<readonly string[]> // string[]
 * // 特殊类型
 * type T = CastArray<any> // any[]
 * type T = CastArray<unknown> // unknown[]
 * type T = CastArray<never> // never[]
 * // 联合类型
 * type T = CastArray<string | number> // (string | number)[]
 * type T = CastArray<string[] | number> // string[] | number[]
 * type T = CastArray<string | number | never> // (string | number)[]
 * type T = CastArray<string | number[] | never[]> // never[] | number[] | string[]
 * type T = CastArray<string | number | never[]> // never[] | (string | number)[]
 * ```
 */
export type CastArray<T> =
  // 1. never 类型判断, 确保 castArray<never> 返回 never[] 而不是 unknown[]
  [T] extends [never]
    ? never[]
    : // 2. unknown 类型判断, unknown 是顶级类型, 需要特殊处理
    [unknown] extends [T]
    ? unknown[]
    : // 3. readonly 类型判断, 输出的类型需要去除 readonly
      | (T extends readonly (infer U)[] ? U[] : never)
        // 4. 非数组类型判断, 处理联合类型
        // 如果 Exclude<T, readonly any[]> extends never 意味着 T 的类型与 any[] 兼容, 此时应该走逻辑 3
        | (Exclude<T, readonly any[]> extends never ? never : Exclude<T, readonly any[]>[])

// type s1 = CastArray<string>
// type s2 = CastArray<string[]>
// type s3 = CastArray<readonly string[]>

// type n1 = CastArray<number>
// type n2 = CastArray<number[]>
// type n3 = CastArray<readonly number[]>

// type u1 = CastArray<any>
// type u2 = CastArray<unknown>
// type u3 = CastArray<never>

// type sn1 = CastArray<string | number>
// type sn2 = CastArray<string[] | number>
// type sn3 = CastArray<string | number[]>
// type sn4 = CastArray<string | number | never>
// type sn5 = CastArray<string | number[] | never[]>
// type sn6 = CastArray<string | number | never[]>
