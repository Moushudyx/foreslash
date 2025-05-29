import { clamp } from '../number'
import { tryit } from './tryit'
/**
 * 并发执行函数, 可以控制并发数
 * @param args 要经由 `fn` 处理的数据
 * @param fn 处理函数, 可以是异步函数
 * @param options 配置项, 目前仅支持 `limit` 限制并发数, 默认为 `5`
 * @returns 一个 `Promise`, 当所有数据都处理完成后, 会返回一个包含所有结果的数组\
 * 如果有错误, 则会抛出一个 `Error` 对象, `Error.cause` 中包含所有错误信息(如果环境支持的话)
 * @example
 * ```js
 * const fn = async (n) => { return n * 2 }
 * parallel([1, 2, 3, 4, 5], fn, { limit: 2 }) // Promise<[2, 4, 6, 8, 10]>
 * ```
 * @since 0.2.4
 */
export async function parallel<Args, Res>(
  args: Args[],
  fn: (arg: Args) => Promise<Res>,
  options?: {
    limit?: number
  }
): Promise<Res[]> {
  if (!args.length) return []
  const { limit: _limit = 5 } = options || {}
  const limit = clamp(Math.floor(_limit), 1, 100)
  let current = 0
  const results: Res[] = []
  const errors: { index: number; error: Error }[] = []
  const asyncFn = tryit(fn)
  const processor = async () => {
    while (current < args.length) {
      const index = current++
      const [err, result] = await asyncFn(args[index])
      if (err) errors.push({ index, error: err })
      else results[index] = result as Res
    }
  }
  // 创建任务队列
  const tasks: Promise<any>[] = []
  for (let i = 0; i < Math.min(args.length, limit); i++) {
    tasks.push(processor())
  }
  await Promise.all(tasks)
  // 报错情况处理
  if (errors.length) {
    // @ts-ignore
    throw new Error(`Parallel execution failed on index: ${errors.map((e) => e.index).join(', ')}`, { cause: errors })
  }
  return results
}
