export type KeyOf<T extends object> = object extends T ? keyof any : keyof T
export type ValueOf<T extends object> = object extends T ? unknown : T[keyof T]

export type PickPredicate<T extends object> = (value: ValueOf<T>, key: KeyOf<T>, obj: T) => any
export type OmitPredicate<T extends object> = (value: ValueOf<T>, key: KeyOf<T>, obj: T) => any

// type a = KeyOf<{ a: 1; b: 2; c: '' }>
// type b = ValueOf<{ a: 1; b: 2; c: '' }>
