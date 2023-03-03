import i18n from 'i18next'

import { messages } from './languages/'

const language = localStorage.getItem('I18N_LANGUAGE')
if (!language) {
    localStorage.setItem('I18N_LANGUAGE', 'en')
}

i18n.init({
    compatibilityJSON: 'v3',
    debug: false,
    defaultNS: 'translations',
    fallbackLng: 'pt',
    ns: ['translations'],
    react: {},
    resources: messages
})

export default i18n
