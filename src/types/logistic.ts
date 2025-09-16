export type Not<T> = T extends false | 0 | '' | null | undefined ? true : false
