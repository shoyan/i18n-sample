# 翻訳の型チェックサンプル

このディレクトリには、TypeScriptの型システムを活用した翻訳メッセージの型チェックの実装例が含まれています。

## ファイル構成

- `types.ts`: 型定義（`I18nMessage`型、`Paths`型、`PathValue`型など）
- `i18n.ts`: 翻訳関数の実装（`createI18n`関数）
- `ja.ts`: 日本語メッセージ（ベースとなる型定義の元）
- `en.ts`: 英語メッセージ
- `example.ts`: 翻訳関数の使用例

## セットアップ

```bash
npm install
```

## 使い方

### TypeScriptの型チェックを実行

```bash
npm run type-check
```

または

```bash
npx tsc --noEmit
```

### 翻訳関数の使用例

翻訳関数を使うことで、型安全に翻訳メッセージを取得できます。

```typescript
import { createI18n } from './i18n'
import { enMessage } from './en'

// 翻訳関数を作成
const t = createI18n(enMessage)

// 型安全に翻訳キーを指定
console.log(t('term.next')) // 'Next'
console.log(t('term.back')) // 'Back'
console.log(t('term.cancel')) // 'Cancel'
console.log(t('term.submit')) // 'Submit'
console.log(t('pages.home.title')) // 'Home'
console.log(t('pages.about.title')) // 'About'
console.log(t('pages.contact.title')) // 'Contact'
console.log(t('pages.terms.title')) // 'Terms'

// ❌ 存在しないキーはコンパイルエラー
// console.log(t('term.invalidKey')) // エラー
// console.log(t('invalid.path')) // エラー
```

### サンプルコードの実行

```bash
npm run example
```

または

```bash
npx ts-node example.ts
```

実行結果：

```
=== 日本語 ===
次へ
ホーム
紹介
お問い合わせ
利用規約

=== 英語 ===
Next
Home
About
Contact
Terms
```

### 型チェックの動作確認

#### 正しい例

`en.ts` は正しく型チェックが通ります。

```typescript
export const enMessage: I18nMessage = {
  term: {
    next: 'Next',
    back: 'Back',
    cancel: 'Cancel',
    submit: 'Submit',
  },
  pages: {
    home: {
      title: 'Home',
    },
    about: {
      title: 'About',
    },
    contact: {
      title: 'Contact',
    },
    terms: {
      title: 'Terms',
    },
  },
}
```

#### エラーが発生する例

`en.ts` の `term` セクションから `next` を削除すると、コンパイルエラーが発生します：

```typescript
// ❌ エラー: 'next' プロパティが必須だが欠落している
export const enMessage: I18nMessage = {
  term: {
    back: 'Back',
    cancel: 'Cancel',
    submit: 'Submit',
    // next を削除するとエラー
  },
  pages: {
    home: {
      title: 'Home',
    },
    about: {
      title: 'About',
    },
    contact: {
      title: 'Contact',
    },
    terms: {
      title: 'Terms',
    },
  },
}
```

存在しないキーを追加しようとすると、エラーが発生します：

```typescript
// ❌ エラー: 'unknownKey' は存在しないキー
export const enMessage: I18nMessage = {
  term: {
    next: 'Next',
    back: 'Back',
    cancel: 'Cancel',
    submit: 'Submit',
    unknownKey: 'Value',  // エラー
  },
  pages: {
    home: {
      title: 'Home',
    },
    about: {
      title: 'About',
    },
    contact: {
      title: 'Contact',
    },
    terms: {
      title: 'Terms',
    },
  },
}
```

翻訳関数で存在しないキーを指定すると、コンパイルエラーが発生します：

```typescript
const t = createI18n(enMessage)

// ❌ エラー: 存在しないキー
// t('term.invalidKey') // コンパイルエラー
// t('invalid.path')    // コンパイルエラー
```

## 翻訳関数の型チェック

翻訳関数 `createI18n` を使用することで、翻訳キーを型安全に指定できます。

### 型安全なキー指定

```typescript
import { createI18n } from './i18n'
import { jaMessage } from './ja'
import { enMessage } from './en'

// 日本語の翻訳関数を作成
const tJa = createI18n(jaMessage)

// 英語の翻訳関数を作成
const tEn = createI18n(enMessage)

// ✅ 正しいキーは型チェックが通る
tJa('term.next')   // '次へ'
tJa('pages.home.title') // 'ホーム'
tEn('term.next')   // 'Next'
tEn('pages.home.title') // 'Home'

// ❌ 存在しないキーはコンパイルエラー
// tJa('term.invalidKey') // エラー
// tEn('invalid.path')    // エラー
```

## 型チェックの仕組み

1. **ベースとなる型の定義**: `ja.ts` の構造から `JaMessage` 型を自動生成（`typeof`演算子を使用）
2. **再帰的な型変換**: `GenericType` によりネストされた構造を型付け
3. **各言語ファイルでの型チェック**: `I18nMessage` 型を指定して型チェック
4. **翻訳関数の型安全**: `Paths` 型と `PathValue` 型により、翻訳キーを型安全に指定

### 型定義の詳細

- `JaMessage`: `ja.ts` から自動生成される型
- `I18nMessage`: すべての言語ファイルで使用する型（`GenericType<JaMessage>`）
- `Paths`: 利用可能な翻訳キーのパスを文字列リテラル型として生成
- `PathValue`: キーパスから対応する文字列型を取得
