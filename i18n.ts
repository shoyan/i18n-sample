import { I18nMessage, Paths, PathValue } from './types'

// 翻訳関数の型
export type I18nFunction = <P extends Paths>(
  key: P
) => PathValue<I18nMessage, P>

// 翻訳関数の実装
export function createI18n(message: I18nMessage): I18nFunction {
  return function <P extends Paths>(key: P & string): PathValue<I18nMessage, P> {
    const keys = (key as string).split('.')
    let value: any = message

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k as keyof typeof value]
      } else {
        throw new Error(`Translation key "${key}" not found`)
      }
    }

    if (typeof value !== 'string') {
      throw new Error(`Translation key "${key}" does not point to a string value`)
    }

    return value as PathValue<I18nMessage, P>
  }
}

