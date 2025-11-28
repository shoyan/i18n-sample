import { createI18n } from './i18n'
import { jaMessage } from './ja'
import { enMessage } from './en'

// 日本語の翻訳関数を作成
const tJa = createI18n(jaMessage)

// 英語の翻訳関数を作成
const tEn = createI18n(enMessage)

// 使用例
console.log('=== 日本語 ===')
console.log(tJa('term.next')) // '次へ'
console.log(tJa('pages.home.title')) // 'ホーム'
console.log(tJa('pages.about.title')) // '紹介'
console.log(tJa('pages.contact.title')) // 'お問い合わせ'
console.log(tJa('pages.terms.title')) // '利用規約'

console.log('\n=== 英語 ===')
console.log(tEn('term.next')) // 'Next'
console.log(tEn('pages.home.title')) // 'Home'
console.log(tEn('pages.about.title')) // 'About'
console.log(tEn('pages.contact.title')) // 'Contact'
console.log(tEn('pages.terms.title')) // 'Terms'