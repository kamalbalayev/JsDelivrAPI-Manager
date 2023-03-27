export default (ctx) => {

    const locale = ctx.$i18n.locale
    const app = ctx.$store.state.app
    const name = app.meta.name[locale]
    const title = app.meta.title[locale]
    const description = app.meta.description[locale]

    const theme = ctx.$store.state.theme
    const i18nHead = ctx.$nuxtI18nHead({ addSeoAttributes: true })

    return {
        htmlAttrs: {
            // lang: locale
            ...i18nHead.htmlAttrs,
            id: 'html'
        },
        bodyAttrs: {
            id: 'body'
        },
        titleTemplate: '%s • ' + title,
        title: name,
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: description},

            {name: 'language', content: locale},
            {name: 'content-language', content: locale},
            {name: 'format-detection', content: 'telephone=no'},
            {name: 'theme-color', content: theme.colors.primary},

            {
                name: 'copyright',
                content: name + ' 2023 - ' + new Date().getFullYear() + ' © ' + ctx.$t('All right reserved')
            },
            ...i18nHead.meta
        ],
        link: [
            {rel: 'icon', type: 'image/png', href: theme.icon},
            {rel: 'dns-prefetch', href: app.baseUrl},
            {rel: 'dns-prefetch', href: '//fonts.googleapis.com'},
            {rel: 'dns-prefetch', href: '//fonts.gstatic.com'},
            {rel: 'dns-prefetch', href: '//www.googletagmanager.com'},
            {rel: 'dns-prefetch', href: '//stats.g.doubleclick.net'},
            {rel: 'dns-prefetch', href: '//cdn.jsdelivr.net'},
            ...i18nHead.link
        ]
    }
}

