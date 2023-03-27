import i18n from './plugins/i18n';
import pwa from './plugins/pwa';
import vuetify from './plugins/vuetify';

export default {

    head: {},

    server: {
        port: 9999,
        host: 'localhost',
        timing: false,
    },

    loading: {
        color: '#009f06',
        failedColor: 'red',
        height: '3px'
    },

    css: [],

    plugins: [
        {src: '@/plugins/global-functions'},
    ],

    components: {
        dirs: [
            {path: '@/components/app/', prefix: 'app'},
            {path: '@/components/apps/'},
            {path: '@/components/common/'},
            {path: '@/components/structure/'},
        ]
    },

    buildModules: [
        '@nuxtjs/vuetify',
    ],

    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/pwa',
        '@nuxtjs/universal-storage',
        '@nuxtjs/i18n',
        '@nuxtjs/dayjs',
    ],

    axios: {
        https: false,
        baseURL: 'http://localhost:9999/',
        retry: {retries: 3},
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
    },

    publicRuntimeConfig: {
        axios: {
            browserBaseURL: 'http://localhost:9999/',
        },
    },

    privateRuntimeConfig: {
        axios: {
            baseURL: 'http://localhost:9999/',
        }
    },

    router: {
        middleware: ['index'],
        scrollBehavior(to, from, savedPosition) {
            return savedPosition;
        }
    },

    serverMiddleware: [
        { path: '/api', handler: '~/api/index.js' },
    ],

    i18n,
    pwa,
    vuetify,

    dayjs: {
        locales: i18n.locales.map(locale => locale.code),
        defaultLocale: i18n.locale,
        plugins: ['relativeTime'],
    },

    build: {

        extend(config, {isDev, isClient}) {
            if (isDev) {
                config.devtool = (isDev ? 'eval-source-map' : false);
            }

            config.node= {
                fs: 'empty'
            }
        }

    }
};
