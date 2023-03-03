import { messages as portugueseMessages } from './pt'
import { messages as englishMessages } from './en'

const messages = {
    pt: {
        translations: {
            ...portugueseMessages.pt.translations
        }
    },
    en: {
        translations: {
            ...englishMessages.en.translations
        }
    }
}

export { messages }
