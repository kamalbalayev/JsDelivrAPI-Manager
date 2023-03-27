const store = require('../store')
const allPages = require('../structure/pages')
const {locale, baseUrl} = store.state().app

const pages = {}

allPages.forEach(page => {
    const i18n = page.config.route.i18n
    if(i18n){pages[i18n.path] = i18n.slug}
})

const i18n = {
    defaultLocale: locale.default,
    locale: locale.default,
    locales: locale.list,
    lazy: true,
    langDir: 'lang/',
    vuex: {
        syncLocale: true,
    },
    seo: true,
    baseUrl,
    detectBrowserLanguage: false,
    intervalPlural: true,
    parsePages: false,
    pages
}

export default i18n
