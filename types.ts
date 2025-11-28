import { jaMessage } from './ja'

export type JaMessage = typeof jaMessage

// 再帰的な型変換
type GenericType<T extends object> = {
  [K in keyof T]: T[K] extends object ? GenericType<T[K]> : string
}

export type I18nMessage = GenericType<JaMessage>

// ネストされたオブジェクトのキーパスを文字列リテラル型として生成
type PathsInternal<T> = T extends string
  ? never
  : T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? T[K] extends string
            ? K
            : `${K}.${PathsInternal<T[K]>}`
          : K
        : never
    }[keyof T]
  : never

export type Paths = PathsInternal<JaMessage>

// キーパスから値を取得する型
export type PathValue<T, P extends string> = P extends `${infer Key}.${infer Rest}`
  ? Key extends keyof T
    ? T[Key] extends object
      ? PathValue<T[Key], Rest>
      : never
    : never
  : P extends keyof T
  ? T[P] extends string
    ? T[P]
    : never
  : never

