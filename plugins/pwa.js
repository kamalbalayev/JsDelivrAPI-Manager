const store = require('../store')
const app = store.state().app
const theme = store.state().theme

export default {
    manifest: {
        id: "/?utm_source=pwa",
        $schema: "https://json.schemastore.org/web-manifest-combined.json",
        scope: '/',
        start_url: app.baseUrl,
        display: "standalone",
        mobileAppIOS: true,
        appleStatusBarStyle: "black-translucent",

        short_name: app.meta.name[app.locale.default],
        description: app.meta.description[app.locale.default],
        categories: app.meta.categories[app.locale.default],
        lang: app.locale.default,

        // screenshots: theme.screenshots,
        // shortcuts: theme.shortcuts,
        theme_color: theme.colors.primary,
        background_color: theme.colors.background,
    },
}
