<template>
    <v-menu transition="slide-x-transition" right top tile offset-x nudge-right="24">

        <template #activator="{ on: menu }">
            <v-tooltip right>

                <template #activator="{ on: tooltip, attrs }">
                    <v-btn icon width="40" height="40" class="pa-0 mt-3" min-width="auto" v-on="{ ...tooltip, ...menu }">
                        <img :src="require(`@/static/flags/${$i18n.locale}.png`)"
                             width="24" height="24" :alt="$i18n.locale" />
                    </v-btn>
                </template>

                {{localeName($i18n.locale)}}

            </v-tooltip>
        </template>

        <v-card tile :width="180">
            <v-list dense>
                <v-list-item v-for="locale in $i18n.locales" :key="locale.code" @click="setLang(locale.code)"
                             :to="switchLocalePath(locale.code)" class="d-flex align-center">

                    <v-list-item-icon class="mr-3">
                        <img :src="require(`@/static/flags/${locale.code}.png`)"
                             width="24" height="24" :alt="locale.iso" />
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title v-text="locale.name"/>
                    </v-list-item-content>

                </v-list-item>
            </v-list>
        </v-card>

    </v-menu>
</template>

<script>
export default {
    name: "Language",

    props:{header: Boolean},

    async fetch (){
        const lang = this.$storage.getCookie('lang')
        const routeLocale = this.$route.name.split('___')[1]

        if(!!lang && lang === routeLocale){
            this.setLang(lang)
        }else{
            this.setLang(routeLocale)
        }
    },

    methods:{

        setLang(code){
            this.$i18n.locale = code;
            this.$vuetify.lang.current = code
            this.$axios.setHeader('Content-Language', code);
            this.$axios.setHeader('Accept-Language', code);
            this.$storage.setCookie('lang', code, {maxAge: 3600 * 24 * 365});
        },

        localeName(code){
            const locale = this.$i18n.locales.find(lang => lang.code === code)
            return locale?.name || this.$i18n.locale
        },

    }
}
</script>
