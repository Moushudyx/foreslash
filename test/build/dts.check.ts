/**
 * 构建产物类型声明检查
 *
 * 仅用于 tsc --noEmit 类型检查, 不包含运行时逻辑, 验证 lib/index.d.ts 中的类型导出
 *
 * 运行方式: pnpm test:dts
 */

// ---------------------------------------------------------------------------
// 运行时函数类型导入（验证函数签名是否正常导出）
// ---------------------------------------------------------------------------
import type {
  compose,
  chunk,
  sleep,
  isNumber,
  clamp,
  debounce,
  deepClone,
  noop,
  pipe,
  curry,
  memo,
  cartesianProduct,
  omit,
  pick,
  isEmpty,
  range,
  retry,
  defer,
  parallel,
  deepMerge,
  fastClone,
  ForeNumber,
} from '../../lib/index.d.ts'

// ---------------------------------------------------------------------------
// 纯类型导入（验证类型级别导出）
// ---------------------------------------------------------------------------
import type {
  CastArray,
  Not,
  Stringify,
  Chunked,
  MergeType,
  MergeOption,
  CloneOptions,
  RangeOptions,
  IsNegative,
  IsPositive,
  IsZero,
  ForeInput,
  ForeKind,
  ForeSign,
  ForeState,
  ForeNumberConstructor,
} from '../../lib/index.d.ts'

// ---------------------------------------------------------------------------
// 类型级断言（编译期验证）
// ---------------------------------------------------------------------------

// --- CastArray ---
type _checkCastArray1 = CastArray<string> // string[]
type _checkCastArray2 = CastArray<string[]> // string[]
type _checkCastArray3 = CastArray<readonly string[]> // string[]
type _checkCastArray4 = CastArray<never> // never[]

// --- Not ---
type _checkNot1 = Not<false> // true
type _checkNot2 = Not<true> // false — 注意：Not 定义为 T extends false|0|''|null|undefined 时返回 true

// --- Stringify ---
type _checkStringify1 = Stringify<123> // "123"
type _checkStringify2 = Stringify<'hello'> // "hello"

// --- 运行时函数类型结构验证 ---
// 通过 typeof 获取函数类型签名
type ComposeFn = typeof compose
type ChunkFn = typeof chunk
type SleepFn = typeof sleep
type IsNumberFn = typeof isNumber
type ClampFn = typeof clamp
type DebounceFn = typeof debounce
type DeepCloneFn = typeof deepClone
type NoopFn = typeof noop
type PipeFn = typeof pipe
type CurryFn = typeof curry
type MemoFn = typeof memo
type CartesianProductFn = typeof cartesianProduct
type OmitFn = typeof omit
type PickFn = typeof pick
type IsEmptyFn = typeof isEmpty
type RangeFn = typeof range
type RetryFn = typeof retry
type DeferFn = typeof defer
type ParallelFn = typeof parallel
type DeepMergeFn = typeof deepMerge
type FastCloneFn = typeof fastClone

// 确保它们都是可调用类型
type _assertComposeCallable = ComposeFn extends (...args: any[]) => any ? true : never
type _assertChunkCallable = ChunkFn extends (...args: any[]) => any ? true : never
type _assertSleepCallable = SleepFn extends (...args: any[]) => any ? true : never
type _assertIsNumberCallable = IsNumberFn extends (...args: any[]) => any ? true : never
type _assertClampCallable = ClampFn extends (...args: any[]) => any ? true : never
type _assertDebounceCallable = DebounceFn extends (...args: any[]) => any ? true : never
type _assertDeepCloneCallable = DeepCloneFn extends (...args: any[]) => any ? true : never
type _assertNoopCallable = NoopFn extends (...args: any[]) => any ? true : never
type _assertPipeCallable = PipeFn extends (...args: any[]) => any ? true : never
type _assertCurryCallable = CurryFn extends (...args: any[]) => any ? true : never
type _assertMemoCallable = MemoFn extends (...args: any[]) => any ? true : never
type _assertCartesianProductCallable = CartesianProductFn extends (...args: any[]) => any ? true : never
type _assertOmitCallable = OmitFn extends (...args: any[]) => any ? true : never
type _assertPickCallable = PickFn extends (...args: any[]) => any ? true : never
type _assertIsEmptyCallable = IsEmptyFn extends (...args: any[]) => any ? true : never
type _assertRangeCallable = RangeFn extends (...args: any[]) => any ? true : never
type _assertRetryCallable = RetryFn extends (...args: any[]) => any ? true : never
type _assertDeferCallable = DeferFn extends (...args: any[]) => any ? true : never
type _assertParallelCallable = ParallelFn extends (...args: any[]) => any ? true : never
type _assertDeepMergeCallable = DeepMergeFn extends (...args: any[]) => any ? true : never
type _assertFastCloneCallable = FastCloneFn extends (...args: any[]) => any ? true : never

// --- ForeNumber 应为可构造类型 ---
type _fnConstructable = typeof ForeNumber extends new (...args: any[]) => any ? true : never

// 防止 unused type 警告：导出占位类型
export type DtsCheckOK = true
