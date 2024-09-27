// compose
export type ComposeFuncList1<CompArgs extends any[], CompResult> = [(...args: CompArgs) => CompResult]
export type ComposeFuncList2<CompArgs extends any[], CompResult, Mid1 = any> = [
  (arg: Mid1) => CompResult,
  (...args: CompArgs) => Mid1
]
export type ComposeFuncList3<CompArgs extends any[], CompResult, Mid1 = any, Mid2 = any> = [
  (arg: Mid2) => CompResult,
  (arg: Mid1) => Mid2,
  (...args: CompArgs) => Mid1
]
export type ComposeFuncList4<CompArgs extends any[], CompResult, Mid1 = any, Mid2 = any, Mid3 = any> = [
  (arg: Mid3) => CompResult,
  (arg: Mid2) => Mid3,
  (arg: Mid1) => Mid2,
  (...args: CompArgs) => Mid1
]
export type ComposeFuncList5<CompArgs extends any[], CompResult, Mid1 = any, Mid2 = any, Mid3 = any, Mid4 = any> = [
  (arg: Mid4) => CompResult,
  (arg: Mid3) => Mid4,
  (arg: Mid2) => Mid3,
  (arg: Mid1) => Mid2,
  (...args: CompArgs) => Mid1
]
export type ComposeFuncList6<
  CompArgs extends any[],
  CompResult,
  Mid1 = any,
  Mid2 = any,
  Mid3 = any,
  Mid4 = any,
  Mid5 = any
> = [
  (arg: Mid5) => CompResult,
  (arg: Mid4) => Mid5,
  (arg: Mid3) => Mid4,
  (arg: Mid2) => Mid3,
  (arg: Mid1) => Mid2,
  (...args: CompArgs) => Mid1
]
export type ComposeFuncList7<
  CompArgs extends any[],
  CompResult,
  Mid1 = any,
  Mid2 = any,
  Mid3 = any,
  Mid4 = any,
  Mid5 = any,
  Mid6 = any
> = [
  (arg: Mid6) => CompResult,
  (arg: Mid5) => Mid6,
  (arg: Mid4) => Mid5,
  (arg: Mid3) => Mid4,
  (arg: Mid2) => Mid3,
  (arg: Mid1) => Mid2,
  (...args: CompArgs) => Mid1
]
export type ComposeFuncList8<
  CompArgs extends any[],
  CompResult,
  Mid1 = any,
  Mid2 = any,
  Mid3 = any,
  Mid4 = any,
  Mid5 = any,
  Mid6 = any,
  Mid7 = any
> = [
  (arg: Mid7) => CompResult,
  (arg: Mid6) => Mid7,
  (arg: Mid5) => Mid6,
  (arg: Mid4) => Mid5,
  (arg: Mid3) => Mid4,
  (arg: Mid2) => Mid3,
  (arg: Mid1) => Mid2,
  (...args: CompArgs) => Mid1
]
export type ComposeFuncListMore<
  CompArgs extends any[],
  CompResult,
  Mid1 = any,
  Mid2 = any,
  Mid3 = any,
  Mid4 = any,
  Mid5 = any,
  Mid6 = any,
  Mid7 = any
> = [
  lastFunc: (a: any) => CompResult,
  ...restFunc: Array<(a: any) => any>,
  (arg: Mid6) => Mid7,
  (arg: Mid5) => Mid6,
  (arg: Mid4) => Mid5,
  (arg: Mid3) => Mid4,
  (arg: Mid2) => Mid3,
  (arg: Mid1) => Mid2,
  (...args: CompArgs) => Mid1
]
