const store = require('../store')
const {locale} = store.state().app
const {colors} = store.state().theme

locale.list.forEach(locale => {
    require(`vuetify/src/locale/${locale.code}`)
})

export default {
    customVariables: ['~/assets/variables.scss'],
    defaultAssets: false,
    treeShake: true,
    icons: {
        iconfont: 'mdi',
    },
    lang: {
        current: locale.default,
    },
    theme: {
        dark: false,
        options: {
            customProperties: true,
            cspNonce: 'dQw4w9WgXcQ',
        },
        themes: {
            light: {
                lighten: colors.light.lighten,
                primary: colors.light.primary,
            },
            dark: {
                lighten: colors.dark.lighten,
                primary: colors.dark.primary,
            },
        },
    }
}
