// pipe
export type PipeFuncList1<PipeArgs extends any[], PipeResult> = [(...args: PipeArgs) => PipeResult]
export type PipeFuncList2<PipeArgs extends any[], PipeResult, Mid1 = any> = [
  (...args: PipeArgs) => Mid1,
  (arg: Mid1) => PipeResult
]
export type PipeFuncList3<PipeArgs extends any[], PipeResult, Mid1 = any, Mid2 = any> = [
  (...args: PipeArgs) => Mid1,
  (arg: Mid1) => Mid2,
  (arg: Mid2) => PipeResult
]
export type PipeFuncList4<PipeArgs extends any[], PipeResult, Mid1 = any, Mid2 = any, Mid3 = any> = [
  (...args: PipeArgs) => Mid1,
  (arg: Mid1) => Mid2,
  (arg: Mid2) => Mid3,
  (arg: Mid3) => PipeResult
]
export type PipeFuncList5<PipeArgs extends any[], PipeResult, Mid1 = any, Mid2 = any, Mid3 = any, Mid4 = any> = [
  (...args: PipeArgs) => Mid1,
  (arg: Mid1) => Mid2,
  (arg: Mid2) => Mid3,
  (arg: Mid3) => Mid4,
  (arg: Mid4) => PipeResult
]
export type PipeFuncList6<
  PipeArgs extends any[],
  PipeResult,
  Mid1 = any,
  Mid2 = any,
  Mid3 = any,
  Mid4 = any,
  Mid5 = any
> = [
  (...args: PipeArgs) => Mid1,
  (arg: Mid1) => Mid2,
  (arg: Mid2) => Mid3,
  (arg: Mid3) => Mid4,
  (arg: Mid4) => Mid5,
  (arg: Mid5) => PipeResult
]
export type PipeFuncList7<
  PipeArgs extends any[],
  PipeResult,
  Mid1 = any,
  Mid2 = any,
  Mid3 = any,
  Mid4 = any,
  Mid5 = any,
  Mid6 = any
> = [
  (...args: PipeArgs) => Mid1,
  (arg: Mid1) => Mid2,
  (arg: Mid2) => Mid3,
  (arg: Mid3) => Mid4,
  (arg: Mid4) => Mid5,
  (arg: Mid5) => Mid6,
  (arg: Mid6) => PipeResult
]
export type PipeFuncList8<
  PipeArgs extends any[],
  PipeResult,
  Mid1 = any,
  Mid2 = any,
  Mid3 = any,
  Mid4 = any,
  Mid5 = any,
  Mid6 = any,
  Mid7 = any
> = [
  (...args: PipeArgs) => Mid1,
  (arg: Mid1) => Mid2,
  (arg: Mid2) => Mid3,
  (arg: Mid3) => Mid4,
  (arg: Mid4) => Mid5,
  (arg: Mid5) => Mid6,
  (arg: Mid6) => Mid7,
  (arg: Mid7) => PipeResult
]
export type PipeFuncListMore<
  PipeArgs extends any[],
  PipeResult,
  Mid1 = any,
  Mid2 = any,
  Mid3 = any,
  Mid4 = any,
  Mid5 = any,
  Mid6 = any,
  Mid7 = any
> = [
  (...args: PipeArgs) => Mid1,
  (arg: Mid1) => Mid2,
  (arg: Mid2) => Mid3,
  (arg: Mid3) => Mid4,
  (arg: Mid4) => Mid5,
  (arg: Mid5) => Mid6,
  (arg: Mid6) => Mid7,
  ...restFunc: Array<(a: any) => any>,
  lastFunc: (a: any) => PipeResult
]
